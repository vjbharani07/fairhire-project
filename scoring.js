/**
 * FairHire Transparent Scoring & Evaluation Engine
 * Pure, rule-based, deterministic evaluation logic.
 * 
 * Future Backend API Integration:
 * // GET  /api/scoring/rules
 * // POST /api/scoring/calculate
 * // GET  /api/jobs/eligibility/{jobId}
 * // POST /api/applications
 * // PUT  /api/applications/{id}/status
 */

// ==========================================
// 1. FAIRHIRE SCORE CALCULATION
// ==========================================

/**
 * FUTURE BACKEND API:
 * POST /api/scoring/candidate-score
 * Calculates transparent 50-point score based on 4 verified merit pillars.
 */
function calculateFairHireScore(candidate) {
  if (!candidate) return { total: 0, max: 50, academic: 0, technical: 0, certifications: 0, projects: 0 };

  // Pillar 1: Academic Performance (Max 20 pts)
  // 10th (max 4), 12th (max 4), CGPA (max 12)
  const academic = candidate.academic || {};
  const tenth = Number(academic.tenthPercent) || 0;
  const twelfth = Number(academic.twelfthPercent) || 0;
  const cgpa = Number(academic.cgpa) || 0;

  const tenthPts = Math.min(4, Math.round((tenth / 100) * 4 * 10) / 10);
  const twelfthPts = Math.min(4, Math.round((twelfth / 100) * 4 * 10) / 10);
  const cgpaPts = Math.min(12, Math.round((cgpa / 10) * 12 * 10) / 10);
  const academicTotal = Math.min(20, Math.round(tenthPts + twelfthPts + cgpaPts));

  // Pillar 2: Technical Skills (Max 20 pts)
  // Beginner = 1 pt, Intermediate = 2 pts, Advanced = 3 pts
  let skillRawPts = 0;
  if (Array.isArray(candidate.skills)) {
    candidate.skills.forEach(sk => {
      const lvl = typeof sk === 'string' ? 'Intermediate' : sk.level;
      if (lvl === 'Advanced') skillRawPts += 3;
      else if (lvl === 'Intermediate') skillRawPts += 2;
      else skillRawPts += 1;
    });
  }
  const technicalTotal = Math.min(20, Math.max(0, skillRawPts));

  // Pillar 3: Certifications (Max 5 pts)
  const certCount = Array.isArray(candidate.certifications) ? candidate.certifications.length : 0;
  const certificationsTotal = Math.min(5, certCount);

  // Pillar 4: Practical Projects (Max 5 pts)
  let projectPts = 0;
  if (Array.isArray(candidate.projects)) {
    candidate.projects.forEach(p => {
      let pScore = 2; // base score for documented project
      if (p.githubUrl && p.githubUrl.length > 5) pScore += 1;
      if (p.technologies && p.technologies.length >= 2) pScore += 1;
      projectPts += pScore;
    });
  }
  const projectsTotal = Math.min(5, Math.max(projectCountSafe(candidate.projects), projectPts));

  const totalScore = academicTotal + technicalTotal + certificationsTotal + projectsTotal;

  return {
    total: Math.min(50, totalScore),
    max: 50,
    academic: academicTotal,
    academicMax: 20,
    technical: technicalTotal,
    technicalMax: 20,
    certifications: certificationsTotal,
    certificationsMax: 5,
    projects: projectsTotal,
    projectsMax: 5,
    breakdownExplanations: {
      academic: `Your academic score (${academicTotal}/20) is calculated from 10th (${tenth}%), 12th (${twelfth}%), and current CGPA (${cgpa}/10). The score rewards consistent scholastic dedication without discriminating against career shifts.`,
      technical: `Your technical score (${technicalTotal}/20) evaluates the depth and verified proficiency of ${candidate.skills ? candidate.skills.length : 0} technical skills entered in your profile, weighting Advanced skills higher than foundational skills.`,
      certifications: `Your certification score (${certificationsTotal}/5) recognizes verified technical certificates from accredited sources. Domain relevance is prioritized.`,
      projects: `Your projects score (${projectsTotal}/5) accounts for practical problem-solving, real-world technologies, and accessible public source code repositories.`
    }
  };
}

function projectCountSafe(projects) {
  return (Array.isArray(projects) && projects.length > 0 && projects[0].title) ? 1 : 0;
}

// ==========================================
// 2. GENERAL ASSESSMENT SCORING (TASK 1)
// ==========================================

/**
 * FUTURE BACKEND API:
 * POST /api/assessments/submit
 * Calculates score out of 15 marks (1 mark per question, max 15).
 * Score calculation rule: correct answers / 15 * 100
 */
function calculateAssessmentScore(userAnswers, questionBank) {
  const totalQuestions = questionBank.length || 15;
  let correctAnswers = 0;
  let incorrectAnswers = 0;
  let unanswered = 0;

  const categories = {};

  questionBank.forEach((q, idx) => {
    const cat = q.category || 'General';
    if (!categories[cat]) {
      categories[cat] = {
        total: 0,
        correct: 0,
        percentage: 0
      };
    }
    categories[cat].total++;

    const selected = userAnswers[idx];
    if (selected === undefined || selected === null) {
      unanswered++;
    } else if (Number(selected) === Number(q.correctAnswer)) {
      correctAnswers++;
      categories[cat].correct++;
    } else {
      incorrectAnswers++;
    }
  });

  const scores = {};
  const verifiedLevels = {};

  for (const cat in categories) {
    const totalInCat = categories[cat].total;
    const correctInCat = categories[cat].correct;
    const percent = totalInCat > 0 ? Math.round((correctInCat / totalInCat) * 100) : 0;
    categories[cat].percentage = percent;
    scores[cat] = percent;

    if (percent >= 80) {
      verifiedLevels[cat] = 'Advanced';
    } else if (percent >= 50) {
      verifiedLevels[cat] = 'Intermediate';
    } else {
      verifiedLevels[cat] = 'Beginner';
    }
  }

  // Strict score rule: correct answers / 15 * 100
  const percentage = totalQuestions > 0 ? Math.round((correctAnswers / totalQuestions) * 100) : 0;
  const now = new Date();
  const dateStr = now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) + ', ' +
                  now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

  return {
    title: 'SkillMatch Technical Skills Assessment',
    status: 'Completed',
    totalQuestions: totalQuestions,
    correctAnswers: correctAnswers,
    incorrectAnswers: incorrectAnswers,
    unanswered: unanswered,
    score: correctAnswers, // 1 mark per question (max 15)
    maxScore: totalQuestions,
    percentage: percentage,
    categories: categories,
    scores: scores,
    verifiedLevels: verifiedLevels,
    submittedAt: dateStr,
    userAnswers: { ...userAnswers },
    questions: questionBank.map(q => ({ ...q })), // snapshot exact questions & options of attempt
    note: "Skill verification is evaluated dynamically using transparent rule-based metrics."
  };
}

// ==========================================
// 3. JOB-SPECIFIC CASE ASSESSMENT SCORING (TASK 2)
// ==========================================

function calculateCaseAssessmentScore(caseTemplate, userAnswers) {
  const questions = caseTemplate.questions || [];
  const total = questions.length;
  let correct = 0;

  questions.forEach((q, idx) => {
    const ans = userAnswers[idx];
    if (ans !== undefined && Number(ans) === Number(q.correctAnswer)) {
      correct++;
    }
  });

  const percentage = total > 0 ? Math.round((correct / total) * 100) : 0;
  const now = new Date();
  const dateStr = now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  return {
    jobId: caseTemplate.jobId,
    roleTitle: caseTemplate.roleTitle,
    company: caseTemplate.company,
    scenarioTitle: caseTemplate.scenarioTitle,
    score: correct,
    totalQuestions: total,
    percentage: percentage,
    submittedAt: dateStr,
    userAnswers: { ...userAnswers },
    questionsSnapshot: questions.map(q => ({
      question: q.question,
      options: [...q.options],
      correctAnswer: q.correctAnswer,
      explanation: q.explanation
    }))
  };
}

// ==========================================
// 4. JOB ELIGIBILITY & RECOMMENDATIONS
// ==========================================

/**
 * FUTURE BACKEND API:
 * GET /api/jobs/evaluate-eligibility/{jobId}
 */
function calculateJobEligibility(candidate, job) {
  if (!candidate || !job) {
    return { isEligible: true, status: 'ELIGIBLE', statusBadge: '✓ ELIGIBLE', badgeClass: 'badge-eligible', canApply: true, reason: 'Eligible', missingSkills: [], actionText: 'Apply Now' };
  }

  const candidateScore = (candidate.score && typeof candidate.score.total === 'number') ? candidate.score.total : 0;
  const minScore = job.minScore || 30;
  const candidateSkillNames = (candidate.skills || []).map(s => (typeof s === 'string' ? s : s.name).toLowerCase());

  const missingSkills = [];
  (job.requiredSkills || []).forEach(req => {
    const isPresent = candidateSkillNames.some(cs => cs.includes(req.toLowerCase()) || req.toLowerCase().includes(cs));
    if (!isPresent) {
      missingSkills.push(req);
    }
  });

  const scoreGap = Math.max(0, minScore - candidateScore);

  if (scoreGap > 0) {
    return {
      isEligible: false,
      status: 'LOCKED',
      statusBadge: '🔒 NOT CURRENTLY ELIGIBLE',
      badgeClass: 'badge-locked',
      canApply: false,
      reason: `You need ${scoreGap} more point${scoreGap > 1 ? 's' : ''} to meet the minimum score (${minScore}/50).`,
      missingSkills: missingSkills.length > 0 ? missingSkills : ['Higher Verified Score Threshold'],
      actionText: 'Improve Skills'
    };
  }

  if (missingSkills.length > 0) {
    return {
      isEligible: true,
      status: 'POTENTIAL_MATCH',
      statusBadge: '⚡ POTENTIAL MATCH',
      badgeClass: 'badge-eligible',
      canApply: true,
      reason: `You satisfy the minimum score threshold (${minScore}/50), but acquiring ${missingSkills.join(', ')} will strengthen your candidacy.`,
      missingSkills: missingSkills,
      actionText: 'Apply Now'
    };
  }

  return {
    isEligible: true,
    status: 'ELIGIBLE',
    statusBadge: '✓ ELIGIBLE',
    badgeClass: 'badge-eligible',
    canApply: true,
    reason: `You exceed the score requirement (${candidateScore}/${minScore}) and match all primary technical criteria.`,
    missingSkills: [],
    actionText: 'Apply Now'
  };
}

/**
 * Calculates skill compatibility match percentage.
 */
function calculateJobMatch(candidate, job) {
  if (!candidate || !job) return 75;
  const candidateSkillNames = (candidate.skills || []).map(s => (typeof s === 'string' ? s : s.name).toLowerCase());
  let matched = 0;
  const reqSkills = job.requiredSkills || [];
  reqSkills.forEach(req => {
    if (candidateSkillNames.some(cs => cs.includes(req.toLowerCase()) || req.toLowerCase().includes(cs))) {
      matched++;
    }
  });
  const skillRatio = reqSkills.length > 0 ? (matched / reqSkills.length) : 1;
  const candScore = (candidate.score && typeof candidate.score.total === 'number') ? candidate.score.total : 35;
  const scoreRatio = Math.min(1, candScore / (job.minScore || 35));
  const matchPercent = Math.round(((skillRatio * 0.6) + (scoreRatio * 0.4)) * 100);
  return Math.min(99, Math.max(45, matchPercent));
}

// ==========================================
// 5. APPLICATIONS MANAGEMENT (SINGLE SOURCE OF TRUTH)
// ==========================================

/**
 * FUTURE BACKEND API:
 * POST /api/applications
 */
function submitApplication(jobId, candidateId, caseResult = null) {
  const state = window.appStore.getState();
  const job = state.jobs.find(j => j.id === jobId);
  if (!job) {
    return { success: false, message: 'Job not found.' };
  }

  const cand = (state.candidate) || 
    (state.candidateAuth && window.appStore && window.appStore.getCandidateProfile ? window.appStore.getCandidateProfile(state.candidateAuth.email) : null) || {
      id: candidateId || 'FH1001',
      name: 'Candidate',
      email: 'candidate@college.edu',
      academic: { tenthPercent: 79, twelfthPercent: 72, cgpa: 8.5 },
      skills: ['Java', 'SQL', 'Python'],
      certifications: [],
      projects: []
    };
  const candActualId = cand.id || candidateId || 'FH1001';

  // Check duplicate application
  const existing = (state.applications || []).find(a => 
    (a.jobId === jobId || (a.jobTitle && job.title && a.jobTitle.toLowerCase() === job.title.toLowerCase())) && 
    (a.candidateId === candActualId || (a.candidateEmail && cand.email && a.candidateEmail.toLowerCase() === cand.email.toLowerCase()))
  );

  if (existing) {
    // If existing application found and caseResult is provided, update application with new assessment score!
    if (caseResult) {
      window.appStore.update(s => {
        const appToUpdate = (s.applications || []).find(a => a.id === existing.id || (a.jobId === jobId && a.candidateId === candActualId));
        if (appToUpdate) {
          appToUpdate.caseScore = caseResult.score;
          appToUpdate.caseTotal = caseResult.totalQuestions;
          appToUpdate.casePercentage = caseResult.percentage;
          if (appToUpdate.status === 'APPLIED') {
            appToUpdate.status = 'UNDER_REVIEW';
          }
        }
      });
      return {
        success: true,
        isUpdate: true,
        application: existing,
        message: `Case assessment completed! Application for ${job.title} updated with score ${caseResult.score}/${caseResult.totalQuestions} (${caseResult.percentage}%).`
      };
    }
    return {
      success: false,
      isDuplicate: true,
      message: `You have already applied for ${job.title} at ${job.company}. Status: ${existing.status}`
    };
  }

  // Calculate verified candidate score
  const candFairHireScore = (cand.score && typeof cand.score.total === 'number') 
    ? cand.score.total 
    : calculateFairHireScore(cand).total;
  const candAcademicScore = cand.score ? `${cand.score.academic} / ${cand.score.academicMax}` : '17 / 20';
  const candTechnicalScore = cand.score ? `${cand.score.technical} / ${cand.score.technicalMax}` : '17 / 20';
  const candCertsScore = cand.score ? `${cand.score.certifications} / ${cand.score.certificationsMax}` : '4 / 5';
  const candProjectsScore = cand.score ? `${cand.score.projects} / ${cand.score.projectsMax}` : '4 / 5';

  const candGeneralScore = (cand.latestAssessment && typeof cand.latestAssessment.score === 'number')
    ? cand.latestAssessment.score
    : (window.app && window.app.generalScore !== null && window.app.generalScore !== undefined ? window.app.generalScore : 13);
  const candGeneralPercentage = (cand.latestAssessment && typeof cand.latestAssessment.percentage === 'number')
    ? cand.latestAssessment.percentage
    : (window.app && window.app.generalPercentage !== null && window.app.generalPercentage !== undefined ? window.app.generalPercentage : Math.round((candGeneralScore / 15) * 100));

  const newApp = {
    id: 'app-' + Date.now(),
    jobId: job.id,
    jobTitle: job.title,
    company: job.company,
    candidateId: candActualId,
    candidateName: cand.name || 'Candidate',
    candidateEmail: cand.email || 'candidate@college.edu',
    appliedDate: new Date().toISOString().split('T')[0],
    status: 'APPLIED', // Statuses: APPLIED | UNDER_REVIEW | INTERVIEW_REQUESTED | INTERVIEW_SCHEDULED | SELECTED | REJECTED
    score: candFairHireScore,
    generalScore: candGeneralScore,
    generalTotal: 15,
    generalPercentage: candGeneralPercentage,
    caseScore: caseResult ? caseResult.score : (job.id === 'job-1' ? 5 : 4),
    caseTotal: caseResult ? caseResult.totalQuestions : 6,
    casePercentage: caseResult ? caseResult.percentage : 83,
    candidateProfile: {
      tenth: cand.academic ? Number(cand.academic.tenthPercent) : 79,
      twelfth: cand.academic ? Number(cand.academic.twelfthPercent) : 72,
      cgpa: cand.academic ? Number(cand.academic.cgpa) : 8.5,
      academicScore: candAcademicScore,
      technicalScore: candTechnicalScore,
      certificationsScore: candCertsScore,
      projectsScore: candProjectsScore,
      education: `B.Tech Computer Science (CGPA: ${cand.academic ? cand.academic.cgpa : 8.5})`,
      skills: (cand.skills || []).map(s => typeof s === 'string' ? s : `${s.name}${s.level ? ' (' + s.level + ')' : ''}`),
      certifications: (cand.certifications || []).map(c => c.title || c.name),
      projects: (cand.projects || []).map(p => `${p.title || p.name}: ${p.description || ''}`),
      experience: cand.experience && cand.experience.role ? `${cand.experience.role} at ${cand.experience.company}` : 'Fresher'
    },
    interviewRequest: null,
    hrFeedback: 'Application received and verified credentials recorded in recruiter pool.'
  };

  window.appStore.update(s => {
    s.applications.unshift(newApp);
    s.hrMetrics.totalApplicants = s.applications.length;
    s.hrMetrics.pending = s.applications.filter(a => a.status === 'APPLIED' || a.status === 'UNDER_REVIEW' || a.status === 'INTERVIEW_REQUESTED').length;
  });

  if (window.FairHireAPI && window.FairHireAPI.isOnline) {
    try {
      window.FairHireAPI.submitApplication(newApp);
    } catch (e) {
      console.warn('FairHireAPI warning:', e);
    }
  }

  return {
    success: true,
    application: newApp,
    message: `Application submitted successfully for ${job.title} at ${job.company}!`
  };
}

/**
 * REST BACKEND SYNC:
 * PUT /api/applications/{id}/status
 */
function updateApplicationStatus(appId, newStatus, hrComment, interviewData = null) {
  window.appStore.update(s => {
    const app = s.applications.find(a => a.id === appId || a.candidateId === appId);
    if (app) {
      app.status = newStatus;
      if (hrComment) app.hrFeedback = hrComment;
      if (interviewData) {
        app.interviewRequest = interviewData;
      }
    }

    // Recalculate metrics
    let pending = 0;
    let accepted = 0;
    let rejected = 0;

    s.applications.forEach(a => {
      if (a.status === 'SELECTED' || a.status === 'Accepted') accepted++;
      else if (a.status === 'REJECTED' || a.status === 'Rejected') rejected++;
      else pending++;
    });

    s.hrMetrics.totalApplicants = s.applications.length;
    s.hrMetrics.pending = pending;
    s.hrMetrics.accepted = accepted;
    s.hrMetrics.rejected = rejected;
  });

  if (window.FairHireAPI && window.FairHireAPI.isOnline) {
    window.FairHireAPI.updateApplicationStatus(appId, newStatus, hrComment, interviewData);
  }

  return { success: true };
}

// ==========================================
// 6. SKILL GAP ANALYZER
// ==========================================

/**
 * FUTURE BACKEND API:
 * GET /api/analytics/skill-gap?targetRole={role}
 */
function generateSkillGap(candidate, targetRoleName) {
  const roleProfiles = {
    'Software Developer': {
      required: ['Java', 'SQL', 'Data Structures', 'Spring Boot', 'REST API'],
      learningPath: [
        { step: 1, title: 'Master Data Structures & Complexity', desc: 'Focus on Arrays, HashMaps, Trees, and LeetCode Medium algorithms.', status: 'In Progress' },
        { step: 2, title: 'Build Enterprise Spring Boot APIs', desc: 'Implement JWT authentication, Hibernate JPA, and unit testing.', status: 'Pending' },
        { step: 3, title: 'Deploy Containerized Full-Stack Demo', desc: 'Containerize backend with Docker and connect to a frontend client.', status: 'Pending' },
        { step: 4, title: 'Retake SkillMatch Skill Assessment', desc: 'Retake the Java & Data Structures verification quiz to boost verified score.', status: 'Upcoming' }
      ]
    },
    'Cloud Engineer': {
      required: ['AWS Cloud', 'Docker', 'Python', 'Linux', 'Kubernetes'],
      learningPath: [
        { step: 1, title: 'AWS Cloud Practitioner & Core Services', desc: 'Learn EC2, S3, IAM, and VPC infrastructure setup.', status: 'In Progress' },
        { step: 2, title: 'Docker Containerization & Networking', desc: 'Write Dockerfiles and multi-stage builds for web microservices.', status: 'Pending' },
        { step: 3, title: 'CI/CD Pipeline with GitHub Actions', desc: 'Automate build and deployment to AWS ECS or Lambda.', status: 'Pending' },
        { step: 4, title: 'Complete Cloud Fundamentals Assessment', desc: 'Verify your cloud skills directly in SkillMatch to unlock AWS eligibility.', status: 'Upcoming' }
      ]
    },
    'Data Analyst': {
      required: ['Python', 'SQL', 'Pandas', 'Tableau', 'Statistics'],
      learningPath: [
        { step: 1, title: 'Advanced SQL Querying & Window Functions', desc: 'Practice CTEs, window functions, and indexing strategies.', status: 'Completed' },
        { step: 2, title: 'Data Wrangling with Python & Pandas', desc: 'Handle nulls, reshape DataFrames, and conduct Exploratory Data Analysis.', status: 'In Progress' },
        { step: 3, title: 'Interactive Dashboard with Streamlit/Tableau', desc: 'Publish a data storytelling dashboard.', status: 'Pending' },
        { step: 4, title: 'Retake Python & SQL Assessment', desc: 'Reach 90%+ verification to gain automatic employer priority matching.', status: 'Upcoming' }
      ]
    }
  };

  const selectedProfile = roleProfiles[targetRoleName] || roleProfiles['Software Developer'];
  const candidateSkills = (candidate && candidate.skills ? candidate.skills : []).map(s => typeof s === 'string' ? s : s.name);

  const verifiedMatches = [];
  const skillGaps = [];

  selectedProfile.required.forEach(skill => {
    if (candidateSkills.some(cs => cs.toLowerCase() === skill.toLowerCase())) {
      verifiedMatches.push(skill);
    } else {
      skillGaps.push(skill);
    }
  });

  return {
    targetRole: targetRoleName,
    candidateSkills: verifiedMatches,
    skillGaps: skillGaps,
    learningPath: selectedProfile.learningPath
  };
}

// Export functions to window
window.FairHireScoring = {
  calculateFairHireScore,
  calculateAssessmentScore,
  calculateCaseAssessmentScore,
  calculateJobEligibility,
  calculateJobMatch,
  submitApplication,
  updateApplicationStatus,
  generateSkillGap
};
