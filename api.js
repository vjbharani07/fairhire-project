/**
 * FairHire Unified REST API Client
 * Connects frontend to local backend server (http://localhost:5000)
 * Features dual-mode auto-detection and graceful fallback.
 */

class FairHireAPIClient {
  constructor() {
    this.baseUrl = 'http://localhost:5000/api';
    this.isOnline = false;
    this.lastChecked = null;
    this.listeners = [];
  }

  onStatusChange(callback) {
    this.listeners.push(callback);
  }

  notifyStatusChange() {
    this.listeners.forEach(cb => cb(this.isOnline));
    this.renderConnectionBadges();
  }

  async checkHealth() {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 1800);
      const res = await fetch(`${this.baseUrl}/health`, {
        method: 'GET',
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      if (res.ok) {
        const data = await res.json();
        this.isOnline = true;
        this.lastChecked = new Date();
        this.notifyStatusChange();
        return { isOnline: true, data };
      }
    } catch (err) {
      // Backend not running; graceful fallback
    }

    this.isOnline = false;
    this.notifyStatusChange();
    return { isOnline: false };
  }

  async syncInitialData() {
    const health = await this.checkHealth();
    if (!health.isOnline) return;

    try {
      // Fetch applications from backend
      const res = await fetch(`${this.baseUrl}/applications`);
      if (res.ok) {
        const backendApps = await res.json();
        if (Array.isArray(backendApps) && backendApps.length > 0) {
          window.appStore.update(s => {
            s.applications = backendApps;
            s.hrMetrics.totalApplicants = backendApps.length;
            s.hrMetrics.pending = backendApps.filter(a => a.status === 'APPLIED' || a.status === 'UNDER_REVIEW' || a.status === 'INTERVIEW_REQUESTED').length;
            s.hrMetrics.accepted = backendApps.filter(a => a.status === 'SELECTED' || a.status === 'Accepted').length;
            s.hrMetrics.rejected = backendApps.filter(a => a.status === 'REJECTED' || a.status === 'Rejected').length;
          });
          if (window.app) {
            window.app.render();
          }
        }
      }
    } catch (e) {
      console.warn('Initial backend sync failed, staying in local mode:', e);
    }
  }

  async submitApplication(appPayload) {
    if (!this.isOnline) {
      return { isRemote: false, message: 'Saved to local session' };
    }

    try {
      const res = await fetch(`${this.baseUrl}/applications`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(appPayload)
      });
      const data = await res.json();
      return { isRemote: true, success: res.ok, data };
    } catch (err) {
      console.warn('Remote submit failed, falling back to local:', err);
      return { isRemote: false, success: false, error: err.message };
    }
  }

  async updateApplicationStatus(appId, status, hrFeedback, interviewRequest = null) {
    if (!this.isOnline) {
      return { isRemote: false };
    }

    try {
      const payload = {
        applicationId: appId,
        status,
        hrFeedback,
        interviewRequest
      };
      const res = await fetch(`${this.baseUrl}/applications/status`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      return { isRemote: true, success: res.ok };
    } catch (err) {
      console.warn('Remote status update failed:', err);
      return { isRemote: false, success: false };
    }
  }

  renderConnectionBadges() {
    const isLocalHost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' || window.location.protocol === 'file:';
    document.querySelectorAll('.backend-status-badge').forEach(badge => {
      if (this.isOnline) {
        badge.innerHTML = `
          <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold shadow-xs">
            <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>REST Backend Online • Port 5000</span>
          </span>
        `;
      } else if (!isLocalHost) {
        badge.innerHTML = `
          <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-xs font-semibold shadow-xs">
            <span class="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
            <span>Cloud Mode • Standalone</span>
          </span>
        `;
      } else {
        badge.innerHTML = `
          <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200 text-xs font-semibold shadow-xs cursor-pointer hover:bg-amber-100 transition" onclick="window.FairHireAPI.checkHealth()" title="Double-click start_fairhire.bat to launch backend, or click to re-check">
            <span class="w-2 h-2 rounded-full bg-amber-500"></span>
            <span>Local Mode (Run start_fairhire.bat for Backend)</span>
          </span>
        `;
      }
    });
  }
}

// Global Instantiate
window.FairHireAPI = new FairHireAPIClient();

// Auto-check on load
window.addEventListener('DOMContentLoaded', () => {
  window.FairHireAPI.syncInitialData();
});
