# FairHire — Fair Hiring. Better Opportunities.

An AI-assisted fair hiring platform prototype focused on transparent, structured, and job-related candidate evaluation.

> **Early Project Milestone / MVP Prototype**
> Developed for college project mentor demonstration.

---

## 🌟 Core Innovation

> *"Don't just rank candidates — verify skills, explain evaluations, identify skill gaps, and help candidates become job-ready."*

Traditional recruitment processes suffer from subjective resume filtering, prestige bias, and unexplainable black-box AI rejections. **FairHire** introduces an open, deterministic, 50-point evaluation engine that strips non-job-related attributes, enforces anti-bias assessment locks, and provides candidates with personalized skill gap roadmaps.

---

## 🚀 How to Run the Prototype

1. **Direct Browser Execution (No dependencies or build steps required):**
   - Simply double-click or open `index.html` in Google Chrome, Microsoft Edge, Firefox, or Safari.
   - Or open the file path directly:
     ```text
     file:///C:/Users/keert/.gemini/antigravity/scratch/fairhire/index.html
     ```

2. **Or run with a local web server (PowerShell 1-liner):**
   ```powershell
   Start-Process "C:\Users\keert\.gemini\antigravity\scratch\fairhire\index.html"
   ```

---

## 🎓 Mentor Demonstration Walkthrough (Step-by-Step)

Use the top **Demo Role Switcher Bar** to easily switch between viewpoints.

### 1. Landing Page Walkthrough
- Point out the hero tagline: *"Fair Hiring. Better Opportunities."*
- Highlight the **6-Step Process Architecture**:
  `Candidate Profile → Skill Assessment → FairHire Score → Job Matching → HR Review → Final Decision`
- Open the **Fair Hiring Transparency Charter** to demonstrate what FairHire forbids (gender, caste, religion, personal connections) vs the 6 verified merit pillars.

### 2. HR Recruiter Portal & Anti-Bias Assessment Lock
- Click **HR Recruiter Portal** from the top bar.
- **1-Click Recruiter Workspace Entry**:
  - Displays `FAIRHIRE Recruiter Workspace`.
  - Organization: `FairHire Demo Organization`
  - Role: `Recruiter / Hiring Manager`
  - Access: `Demo Recruiter Workspace`
  - Click **[ Enter Recruiter Workspace → ]** for instant access without typing credentials.
- **8 Recruiter Sub-Tabs**:
  1. 📊 **Dashboard:** 5 core metrics (Jobs: 5, Applications: 126, Pending: 74, Accepted: 18, Rejected: 34).
  2. 💼 **Jobs:** 5 active campus roles (Backend, ML, Frontend, Cloud DevOps, Full Stack).
  3. 👥 **Applicants:** Verified applicant roster with real-time status badges.
  4. ⚖️ **Candidate Evaluation:** Deep-dive candidate scoring matrix.
  5. 📝 **Assessments:** Standardized technical assessment benchmarks.
  6. 📅 **Interviews:** Scheduled structured merit interview slots.
  7. 🔔 **Notifications:** System alerts & assessment completion alerts.
  8. 📜 **Audit History:** Immutable audit log tracking hiring decisions and recruiter rationale.
- **Anti-Bias Assessment-Lock Demonstration**:
  - Open candidate **FH1001 (Ragav V)** under *Candidate Evaluation*.
  - Show the mentor that the evaluation is **🔒 LOCKED** because the candidate has not completed the assessment.
  - Recruiter view hides CGPA, marks, FairHire scores, and technical scores to prevent pre-screening bias.
  - Decision buttons (`Accept` / `Reject`) are disabled.

### 3. Candidate Portal Walkthrough (Demo Candidate: Ragav V)
- Click **Candidate Portal** from top navigation.
- **Candidate Login Gate**:
  - Authenticate using the 1-click **[ ⚡ Continue as Ragav V (Demo Candidate) ]** or enter email/password.
  - Pre-loaded stats: ID `FH1001`, FairHire Score `42/50`, CGPA `8.5`, `10 Verified Skills`.
- **My Profile**:
  - Academic persistence (10th: 79%, 12th: 72%, CGPA: 8.5).
  - Add a skill (e.g. `Docker` - Intermediate) and click **Save Profile** for live recalculation.
- **My FairHire Score**:
  - Animated circular score gauge (`42 / 50`).
  - Click **"Why 17/20?"** on the Academic, Technical, Certifications, and Projects cards for transparent auditing.
- **Skill Assessments & Live HR Unlock**:
  - Go to **Skill Assessment** tab.
  - Take the interactive quiz questions and click **Submit Assessment**.
  - Verified skill levels update automatically.
- **Available Jobs & Job Matching**:
  - View **Zoho** and **Infosys** marked as **✓ ELIGIBLE**.
  - View **Google (Software Engineer)** marked as **🔒 NOT CURRENTLY ELIGIBLE** (shows exact deficit and missing skills).
- **Skill Gap Analyzer & AI Coach**:
  - View targeted comparison for *Software Developer* or *Cloud Engineer*.
  - Ask the floating AI Coach: *"Why is my score 42/50?"*, *"Why is Google locked?"*, and *"How can I improve my score?"*.

### 4. Recruiter Decision & Audit Log
- Return to **HR Recruiter Portal → Candidate Evaluation**.
- Open candidate **FH1001**: The candidate is now **🔓 AVAILABLE** with full verified scores displayed.
- Click **[ ✓ ACCEPT ]** or **[ ✕ REJECT ]**.
- Type a mandatory job-related reason in the feedback box and click **Confirm & Save Decision**.
- Check the **Audit History** tab to show the logged decision and timestamp.

---

## 🏛️ Architecture & Future Spring Boot + MySQL Migration

The prototype code is decoupled so that JavaScript calculations map directly to future Spring Boot REST controllers:

```text
fairhire/
├── index.html          # Clean, semantic SPA markup with Tailwind CSS CDN
├── css/
│   └── styles.css      # Custom animations, gauges, and design tokens
├── js/
│   ├── state.js        # Central state store + localStorage persistence
│   ├── scoring.js      # Deterministic 50-point scoring & eligibility logic
│   ├── coach.js        # AI Career Coach conversational intelligence
│   └── app.js          # DOM controllers, event routing, modals, and toasts
└── README.md           # Documentation & mentor demo guide
```

### Future Spring Boot REST Endpoints Planned:
- `POST /api/candidates` — Create/Update candidate profile
- `GET  /api/candidates/me` — Retrieve candidate profile & verified badges
- `POST /api/scoring/calculate` — Server-side rule calculation
- `POST /api/assessments/submit` — Proctoring and automated test scoring
- `GET  /api/jobs` — Retrieve active listings and candidate eligibility
- `POST /api/applications` — Submit job application with duplicate prevention
- `PUT  /api/applications/{id}/status` — Update recruiter decision with mandatory feedback
- `POST /api/ai/coach/query` — LLM-assisted career coaching with candidate context
