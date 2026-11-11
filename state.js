/**
 * FairHire State Management
 * Handles central state, seed data, and persistent storage via localStorage.
 * Serves as the single source of truth for both Candidate and HR portals.
 * 
 * Future Backend Integration:
 * // GET /api/candidates/me
 * // GET /api/hr/dashboard
 * // GET /api/hr/applications
 */

const STORAGE_KEY = 'FAIRHIRE_MVP_STATE_V4';

const DEFAULT_STATE = {
  activeRole: 'landing', // 'landing' | 'candidate' | 'hr'
  activeCandidateTab: 'dashboard', // 'dashboard' | 'profile' | 'score' | 'assessments' | 'jobs' | 'applications' | 'skillgap' | 'transparency'
  activeHRTab: 'dashboard', // 'dashboard' | 'jobs' | 'applicants' | 'evaluation' | 'assessments' | 'interviews' | 'notifications' | 'audithistory'
  
  // Candidate Authentication State
  candidateAuth: {
    isLoggedIn: false,
    email: '',
    name: 'Candidate'
  },

  // Multi-candidate profiles storage
  candidateProfiles: {},

  // Current demo candidate: Ragav V
  candidate: {
    id: 'FH1001',
    name: 'Ragav V',
    email: 'ragav.v@student.edu',
    phone: '+91 98765 43210',
    location: 'Chennai, India',
    profileCompletion: 85,
    assessmentStatus: 'Not Completed',
    latestAssessment: null,
    activeAssessment: null,
    academic: {
      tenthPercent: 79,
      twelfthPercent: 72,
      cgpa: 8.5,
      semesters: [
        { sem: 'Sem 1', gpa: 8.2 },
        { sem: 'Sem 2', gpa: 8.4 },
        { sem: 'Sem 3', gpa: 8.6 },
        { sem: 'Sem 4', gpa: 8.5 },
        { sem: 'Sem 5', gpa: 8.7 },
        { sem: 'Sem 6', gpa: 8.6 }
      ]
    },
    skills: [
      { name: 'Java', level: 'Advanced' },
      { name: 'Python', level: 'Advanced' },
      { name: 'SQL', level: 'Advanced' },
      { name: 'Git', level: 'Intermediate' },
      { name: 'Data Structures', level: 'Intermediate' },
      { name: 'C++', level: 'Beginner' },
      { name: 'HTML', level: 'Advanced' },
      { name: 'CSS', level: 'Intermediate' },
      { name: 'JavaScript', level: 'Intermediate' },
      { name: 'Spring Boot', level: 'Intermediate' }
    ],
    certifications: [
      { id: 'c1', title: 'NPTEL Python', issuer: 'IIT Madras', year: '2024' },
      { id: 'c2', title: 'Python Programming', issuer: 'Coursera', year: '2024' },
      { id: 'c3', title: 'MySQL Developer', issuer: 'Oracle Academy', year: '2025' },
      { id: 'c4', title: 'Cloud Fundamentals', issuer: 'AWS Educate', year: '2025' }
    ],
    projects: [
      {
        id: 'p1',
        title: 'GestureHeal AI',
        description: 'AI-assisted emergency healthcare communication platform using real-time gesture recognition.',
        technologies: ['FastAPI', 'React', 'MediaPipe', 'OpenCV'],
        githubUrl: 'https://github.com/ragav/gestureheal-ai',
        liveUrl: 'https://gestureheal-demo.app',
        verified: true
      }
    ],
    experience: {
      hasInternship: true,
      role: 'Software Development Intern',
      company: 'NextGen Tech Labs',
      duration: '2 Months (Summer 2025)',
      description: 'Engineered RESTful microservices in Java and tuned database query execution performance.'
    },
    assessmentStats: {
      completed: 3,
      total: 4,
      scores: {
        'Java': 88,
        'Python': 91,
        'SQL': 67,
        'Data Structures': 61
      },
      verifiedLevels: {
        'Java': 'Advanced',
        'Python': 'Advanced',
        'SQL': 'Intermediate',
        'Data Structures': 'Intermediate'
      }
    },
    score: {
      total: 42,
      max: 50,
      academic: 17,
      academicMax: 20,
      technical: 17,
      technicalMax: 20,
      certifications: 4,
      certificationsMax: 5,
      projects: 4,
      projectsMax: 5
    }
  },

  // Available Jobs Catalogue
  jobs: [
    {
      id: 'job-1',
      company: 'Zoho',
      title: 'Software Developer',
      location: 'Chennai / Hybrid',
      type: 'Full-time',
      experience: '0-1 Years',
      minScore: 35,
      requiredSkills: ['Java', 'SQL', 'Data Structures'],
      description: 'Join our core platform engineering group developing high-throughput web applications with multi-tenant architectures.',
      salary: '₹6.5 - ₹8.5 LPA'
    },
    {
      id: 'job-2',
      company: 'Infosys',
      title: 'Systems Engineer',
      location: 'Bangalore / Remote',
      type: 'Full-time',
      experience: 'Fresher',
      minScore: 32,
      requiredSkills: ['Java', 'Python', 'SQL'],
      description: 'Build robust enterprise services, participate in agile client sprints, and maintain code quality standardizations.',
      salary: '₹4.5 - ₹6.0 LPA'
    },
    {
      id: 'job-3',
      company: 'Google',
      title: 'Software Engineer (Early Career)',
      location: 'Hyderabad / Bangalore',
      type: 'Full-time',
      experience: '0-2 Years',
      minScore: 45,
      requiredSkills: ['Java', 'Python', 'Data Structures', 'Distributed Systems'],
      description: 'Develop resilient software systems processing petabytes of requests with industry-leading availability and security.',
      salary: '₹22.0 - ₹28.0 LPA'
    },
    {
      id: 'job-4',
      company: 'AWS',
      title: 'Associate Cloud Engineer',
      location: 'Chennai / Hyderabad',
      type: 'Full-time',
      experience: '0-1 Years',
      minScore: 40,
      requiredSkills: ['Python', 'SQL', 'Cloud Fundamentals', 'Docker'],
      description: 'Work with cloud architecture teams assisting global enterprise partners in serverless migration and container deployments.',
      salary: '₹14.0 - ₹18.0 LPA'
    },
    {
      id: 'job-5',
      company: 'ABC Technologies',
      title: 'Java Developer',
      location: 'Coimbatore / Remote',
      type: 'Full-time',
      experience: '0-1 Yr',
      minScore: 36,
      requiredSkills: ['Java', 'Spring Boot', 'SQL'],
      description: 'Build backend microservices for our fintech transaction pipeline with high security and low latency.',
      salary: '₹5.5 - ₹7.0 LPA'
    }
  ],

  // Unified Applications: Single Source of Truth for Candidate and HR
  applications: [
    {
      id: 'app-seed-1',
      jobId: 'job-5',
      jobTitle: 'Java Developer',
      company: 'ABC Technologies',
      candidateId: 'FH1001',
      candidateName: 'Ragav V',
      candidateEmail: 'ragav.v@student.edu',
      appliedDate: '2026-09-12',
      status: 'UNDER_REVIEW', // Status flow: APPLIED | UNDER_REVIEW | INTERVIEW_REQUESTED | SELECTED | REJECTED
      score: 42,
      generalScore: 13,
      generalTotal: 15,
      generalPercentage: 87,
      caseScore: 5,
      caseTotal: 6,
      casePercentage: 83,
      candidateProfile: {
        cgpa: 8.5,
        tenth: 79,
        twelfth: 72,
        academicScore: '17 / 20',
        technicalScore: '17 / 20',
        certificationsScore: '4 / 5',
        projectsScore: '4 / 5',
        skills: ['Java', 'SQL', 'Spring Boot', 'Python', 'Git'],
        certifications: ['NPTEL Python', 'MySQL Developer'],
        projects: ['GestureHeal AI (FastAPI, React, MediaPipe)'],
        education: 'B.Tech Computer Science (CGPA: 8.5)'
      },
      interviewRequest: null,
      hrFeedback: 'Profile passed preliminary automated screening. Queued for technical review.'
    },
    {
      id: 'app-seed-2',
      jobId: 'job-1',
      jobTitle: 'Software Developer',
      company: 'Zoho',
      candidateId: 'FH1002',
      candidateName: 'Priya Sharma',
      candidateEmail: 'priya.s@student.edu',
      appliedDate: '2026-09-10',
      status: 'UNDER_REVIEW',
      score: 44,
      generalScore: 12,
      generalTotal: 15,
      generalPercentage: 80,
      caseScore: 5,
      caseTotal: 6,
      casePercentage: 83,
      candidateProfile: {
        cgpa: 8.8,
        tenth: 84,
        twelfth: 82,
        academicScore: '18 / 20',
        technicalScore: '16 / 20',
        certificationsScore: '5 / 5',
        projectsScore: '5 / 5',
        skills: ['Java', 'SQL', 'Data Structures', 'C++'],
        certifications: ['Oracle Certified Associate Java', 'Coursera Algorithms'],
        projects: ['CloudInventory Manager (Java, MySQL)'],
        education: 'B.E. Information Technology (CGPA: 8.8)'
      },
      interviewRequest: null,
      hrFeedback: 'Strong data structures score. High potential for platform engineering.'
    },
    {
      id: 'app-seed-3',
      jobId: 'job-2',
      jobTitle: 'Systems Engineer',
      company: 'Infosys',
      candidateId: 'FH1003',
      candidateName: 'Aditya Kumar',
      candidateEmail: 'aditya.k@student.edu',
      appliedDate: '2026-09-14',
      status: 'APPLIED',
      score: 38,
      generalScore: 11,
      generalTotal: 15,
      generalPercentage: 73,
      caseScore: 4,
      caseTotal: 6,
      casePercentage: 67,
      candidateProfile: {
        cgpa: 7.9,
        tenth: 76,
        twelfth: 74,
        academicScore: '16 / 20',
        technicalScore: '14 / 20',
        certificationsScore: '4 / 5',
        projectsScore: '4 / 5',
        skills: ['Python', 'SQL', 'Git', 'Linux'],
        certifications: ['Python for Everybody - Univ of Michigan'],
        projects: ['DataPipelines CLI (Python, Pandas)'],
        education: 'B.Tech Electrical & Electronics (CGPA: 7.9)'
      },
      interviewRequest: null,
      hrFeedback: 'Application received and awaiting recruiter review.'
    },
    {
      id: 'app-seed-4',
      jobId: 'job-1',
      jobTitle: 'Software Developer',
      company: 'Zoho',
      candidateId: 'FH1005',
      candidateName: 'Karthik Raja',
      candidateEmail: 'karthik.r@student.edu',
      appliedDate: '2026-09-02',
      status: 'SELECTED',
      score: 48,
      generalScore: 15,
      generalTotal: 15,
      generalPercentage: 100,
      caseScore: 6,
      caseTotal: 6,
      casePercentage: 100,
      candidateProfile: {
        cgpa: 9.3,
        tenth: 92,
        twelfth: 89,
        academicScore: '19 / 20',
        technicalScore: '19 / 20',
        certificationsScore: '5 / 5',
        projectsScore: '5 / 5',
        skills: ['Java', 'Spring Boot', 'SQL', 'Docker', 'Kafka'],
        certifications: ['AWS Certified Developer', 'Spring Professional Certification'],
        projects: ['High-Throughput Payment Engine (Spring Boot, Kafka)'],
        education: 'B.Tech Computer Science (CGPA: 9.3)'
      },
      interviewRequest: {
        type: 'Technical Interview',
        date: '2026-09-22',
        time: '10:00 AM',
        message: 'Completed technical rounds with highest score recommendation.',
        requestedAt: '2026-09-18'
      },
      hrFeedback: 'Outstanding problem solving and verified project portfolio. Offer processed.'
    }
  ],

  // HR Recruiter Workspace Info (Demo Organization)
  hrAuth: {
    isLoggedIn: false,
    organization: 'FairHire Demo Organization',
    role: 'Recruiter / Hiring Manager',
    accessLevel: 'Demo Recruiter Workspace'
  },

  hrMetrics: {
    totalJobs: 5,
    totalApplicants: 4,
    pending: 3,
    accepted: 1,
    rejected: 0
  },

  // HR Interviews
  hrInterviews: [
    { 
      id: 'int-1', 
      applicationId: 'app-seed-4', 
      candidateId: 'FH1005', 
      candidateName: 'Karthik Raja', 
      jobTitle: 'Software Developer (Zoho)', 
      date: '2026-09-22', 
      time: '10:00 AM', 
      round: 'Technical Interview', 
      status: 'Scheduled', 
      interviewer: 'Lead Architect',
      message: 'Please prepare a walkthrough of your Payment Engine project.'
    }
  ],

  // HR Notifications
  hrNotifications: [
    { id: 'notif-1', time: '10 mins ago', title: 'New Application Received', message: 'Candidate FH1001 applied for Java Developer at ABC Technologies.', type: 'info' },
    { id: 'notif-2', time: '2 hours ago', title: 'Assessment Completed', message: 'Candidate FH1002 completed the Standardized Technical Assessment (Score: 12/15).', type: 'success' },
    { id: 'notif-3', time: '1 day ago', title: 'Interview Scheduled', message: 'Candidate FH1005 confirmed Technical Interview for Sept 22.', type: 'info' }
  ],

  // HR Audit History (Transparent Decisions)
  hrAuditHistory: [
    { id: 'aud-1', timestamp: '2026-09-18 16:45', candidateId: 'FH1005', action: 'Selected', recruiter: 'Recruiter / Hiring Manager', reason: 'Outstanding problem solving and verified project portfolio.' }
  ]
};

// Storage helper functions
class StateStore {
  constructor() {
    this.state = this.loadState();
  }

  loadState() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Ensure critical arrays and objects exist
        if (!parsed.applications) parsed.applications = DEFAULT_STATE.applications;
        if (!parsed.candidateProfiles) parsed.candidateProfiles = {};
        if (!parsed.hrInterviews) parsed.hrInterviews = DEFAULT_STATE.hrInterviews;
        
        // Self-heal application scores and academic details for stored caches
        if (Array.isArray(parsed.applications)) {
          parsed.applications.forEach(a => {
            if (a.score === undefined || a.score === null || isNaN(a.score)) {
              if (a.id === 'app-seed-1') a.score = 42;
              else if (a.id === 'app-seed-2') a.score = 44;
              else if (a.id === 'app-seed-3') a.score = 38;
              else if (a.id === 'app-seed-4') a.score = 48;
              else a.score = 42;
            }
            if (!a.candidateProfile) a.candidateProfile = {};
            if (a.candidateProfile.tenth === undefined) a.candidateProfile.tenth = 79;
            if (a.candidateProfile.twelfth === undefined) a.candidateProfile.twelfth = 72;
            if (a.candidateProfile.cgpa === undefined) a.candidateProfile.cgpa = 8.5;
          });
        }
        return parsed;
      }
    } catch (e) {
      console.warn('Could not read from localStorage, using default state.', e);
    }
    return JSON.parse(JSON.stringify(DEFAULT_STATE));
  }

  saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
    } catch (e) {
      console.error('Could not save to localStorage', e);
    }
  }

  resetToDefault() {
    this.state = JSON.parse(JSON.stringify(DEFAULT_STATE));
    this.saveState();
  }

  getState() {
    return this.state;
  }

  update(mutatorFn) {
    mutatorFn(this.state);
    this.saveState();
  }

  getCandidateProfile(email) {
    if (!email) return this.state.candidate;
    const key = email.trim().toLowerCase();
    if (!this.state.candidateProfiles) {
      this.state.candidateProfiles = {};
    }

    // Special preset for Ragav V
    if (key === 'ragav.v@student.edu' && !this.state.candidateProfiles[key]) {
      this.state.candidateProfiles[key] = JSON.parse(JSON.stringify(this.state.candidate));
      this.saveState();
      return this.state.candidateProfiles[key];
    }

    if (!this.state.candidateProfiles[key]) {
      const username = key.split('@')[0] || 'candidate';
      const cleanName = username
        .replace(/[._\-+0-9]/g, ' ')
        .trim()
        .split(' ')
        .filter(Boolean)
        .map(w => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ');

      const displayName = cleanName || 'Candidate';
      const randId = 'FH' + Math.floor(1000 + Math.random() * 9000);

      this.state.candidateProfiles[key] = {
        id: randId,
        name: displayName,
        email: email.trim(),
        assessmentStatus: 'Not Completed',
        latestAssessment: null,
        activeAssessment: null,
        phone: '+91 98765 00000',
        location: 'Demo Campus',
        profileCompletion: 70,
        academic: {
          tenthPercent: 80,
          twelfthPercent: 78,
          cgpa: 8.2,
          semesters: [
            { sem: 'Sem 1', gpa: 8.0 },
            { sem: 'Sem 2', gpa: 8.1 },
            { sem: 'Sem 3', gpa: 8.3 },
            { sem: 'Sem 4', gpa: 8.2 }
          ]
        },
        skills: [
          { name: 'Programming Fundamentals', level: 'Unverified' },
          { name: 'Python Basics', level: 'Unverified' },
          { name: 'SQL Fundamentals', level: 'Unverified' },
          { name: 'Problem Solving', level: 'Unverified' },
          { name: 'Web Development Basics', level: 'Unverified' }
        ],
        certifications: [
          { id: 'c1', title: 'Computer Science Core', issuer: 'Demo University', year: '2025' }
        ],
        projects: [
          {
            id: 'p1',
            title: 'Campus Portal Project',
            description: 'Web application prototype built with modern web technologies.',
            technologies: ['JavaScript', 'HTML/CSS', 'SQL'],
            githubUrl: 'https://github.com/demo/campus-portal',
            verified: true
          }
        ],
        experience: {
          hasInternship: false,
          role: '',
          company: '',
          duration: '',
          description: ''
        },
        score: {
          total: 22,
          max: 50,
          academic: 16,
          academicMax: 20,
          technical: 0,
          technicalMax: 20,
          certifications: 3,
          certificationsMax: 5,
          projects: 3,
          projectsMax: 5
        }
      };
      this.saveState();
    }
    return this.state.candidateProfiles[key];
  }

  saveActiveAssessmentSession(email, session) {
    if (!email) return;
    const key = email.trim().toLowerCase();
    const profile = this.getCandidateProfile(email);
    if (profile) {
      profile.activeAssessment = session;
    }
    if (this.state.candidate && this.state.candidate.email && this.state.candidate.email.toLowerCase() === key) {
      this.state.candidate.activeAssessment = session;
    }
    this.saveState();
  }

  clearActiveAssessmentSession(email) {
    if (!email) return;
    const key = email.trim().toLowerCase();
    const profile = this.getCandidateProfile(email);
    if (profile) {
      profile.activeAssessment = null;
    }
    if (this.state.candidate && this.state.candidate.email && this.state.candidate.email.toLowerCase() === key) {
      this.state.candidate.activeAssessment = null;
    }
    this.saveState();
  }

  saveCandidateAssessment(email, result) {
    if (!email) return;
    const key = email.trim().toLowerCase();
    const profile = this.getCandidateProfile(email);
    if (!profile) return;

    profile.assessmentStatus = 'Completed';
    profile.latestAssessment = result;
    profile.activeAssessment = null;

    // Update verified skill levels from category breakdown
    if (result && result.categories) {
      profile.skills = Object.keys(result.categories).map(catName => {
        const cat = result.categories[catName];
        let level = 'Beginner';
        if (cat.percentage >= 80) level = 'Advanced';
        else if (cat.percentage >= 50) level = 'Intermediate';
        return { name: catName, level: level };
      });

      // Update technical score component
      const techScore = Math.round((result.percentage / 100) * 20);
      if (!profile.score) {
        profile.score = { total: 0, max: 50, academic: 16, technical: techScore, certifications: 3, projects: 3 };
      }
      profile.score.technical = techScore;
      profile.score.total = (profile.score.academic || 16) + techScore + (profile.score.certifications || 3) + (profile.score.projects || 3);
    }

    if (!this.state.candidateProfiles) this.state.candidateProfiles = {};
    this.state.candidateProfiles[key] = profile;
    this.state.candidate = profile;
    this.saveState();
  }

  saveCandidateProfile(email, updatedData) {
    if (!email) return;
    const key = email.trim().toLowerCase();
    const profile = this.getCandidateProfile(email);
    if (!profile) return;

    Object.assign(profile, updatedData);
    if (!this.state.candidateProfiles) this.state.candidateProfiles = {};
    this.state.candidateProfiles[key] = profile;
    this.state.candidate = profile;
    this.saveState();
  }
}

// Global App State Instance
const appStore = new StateStore();
window.appStore = appStore;
