/**
 * FairHire AI Career Coach
 * Provides contextual, transparent guidance explaining scores, job locks, and learning paths.
 * Dynamically binds to the active candidate profile with graceful fallbacks.
 * 
 * FUTURE BACKEND API:
 * // POST /api/ai/coach/query
 */

function generateCoachResponse(queryText, state) {
  const q = queryText.toLowerCase().trim();
  const candidate = state.candidate || (state.candidateAuth && state.candidateAuth.email ? state.candidateProfiles[state.candidateAuth.email.toLowerCase()] : null) || {};

  const candName = candidate.name || 'Candidate';
  const candScore = (candidate.score && typeof candidate.score.total === 'number') ? candidate.score.total : 0;
  const scoreMax = (candidate.score && candidate.score.max) || 50;

  // Academic data
  const academic = candidate.academic || {};
  const tenth = academic.tenthPercent !== undefined && academic.tenthPercent !== null ? `${academic.tenthPercent}%` : 'Not added yet';
  const twelfth = academic.twelfthPercent !== undefined && academic.twelfthPercent !== null ? `${academic.twelfthPercent}%` : 'Not added yet';
  const cgpa = academic.cgpa !== undefined && academic.cgpa !== null ? `${academic.cgpa} / 10` : 'Not added yet';
  const acadScore = candidate.score ? (candidate.score.academic !== undefined ? `${candidate.score.academic} / ${candidate.score.academicMax || 20}` : 'Not calculated yet') : 'Not calculated yet';

  // Skills
  const skillsList = Array.isArray(candidate.skills) && candidate.skills.length > 0
    ? candidate.skills.map(s => typeof s === 'string' ? s : `${s.name}${s.level ? ' (' + s.level + ')' : ''}`).join(', ')
    : 'Not added yet. Add your verified skills in My Profile to get customized recommendations.';

  const advancedSkills = Array.isArray(candidate.skills)
    ? candidate.skills.filter(s => typeof s === 'object' && s.level === 'Advanced').map(s => s.name)
    : [];

  const techScore = candidate.score ? (candidate.score.technical !== undefined ? `${candidate.score.technical} / ${candidate.score.technicalMax || 20}` : 'Pending') : 'Pending';

  // Certifications
  const certCount = Array.isArray(candidate.certifications) ? candidate.certifications.length : 0;
  const certsList = certCount > 0
    ? candidate.certifications.map(c => c.title || c.name).join(', ')
    : 'Not added yet';
  const certScore = candidate.score ? (candidate.score.certifications !== undefined ? `${candidate.score.certifications} / ${candidate.score.certificationsMax || 5}` : '0 / 5') : '0 / 5';

  // Projects
  const projectCount = Array.isArray(candidate.projects) ? candidate.projects.length : 0;
  const projectsList = projectCount > 0
    ? candidate.projects.map(p => p.title || p.name).join(', ')
    : 'Not added yet';
  const projScore = candidate.score ? (candidate.score.projects !== undefined ? `${candidate.score.projects} / ${candidate.score.projectsMax || 5}` : '0 / 5') : '0 / 5';

  // Assessment results
  const latestAssess = candidate.latestAssessment;
  const assessScoreStr = latestAssess
    ? `${latestAssess.score} / ${latestAssess.totalQuestions} (${latestAssess.percentage}%)`
    : 'Assessment Not Completed yet';

  // 1. Why is my score X/50? or Score Breakdown
  if (q.includes('why is my score') || q.includes('my score') || q.includes('score') || q.includes('score breakdown')) {
    return `
      <p class="font-semibold text-blue-400 mb-1">Hello <strong>${candName}</strong>, your current SkillMatch Score is <strong>${candScore} / ${scoreMax}</strong>. Here is your transparent breakdown:</p>
      <ul class="list-disc pl-5 space-y-1 text-sm text-slate-300">
        <li><strong>Academic Performance:</strong> ${acadScore} (10th: ${tenth}, 12th: ${twelfth}, CGPA: ${cgpa})</li>
        <li><strong>Technical Skills:</strong> ${techScore} (Active skills: ${skillsList})</li>
        <li><strong>Certifications:</strong> ${certScore} (${certsList})</li>
        <li><strong>Practical Projects:</strong> ${projScore} (${projectsList})</li>
      </ul>
      <p class="mt-2 text-xs text-slate-400">💡 <em>Tip: ${advancedSkills.length > 0 ? `You have advanced proficiency in ${advancedSkills.join(', ')}. ` : ''}Completing assessments and adding verified code projects raises your score!</em></p>
    `;
  }

  // 2. Why is Google locked? (or Why is a job locked)
  if (q.includes('google') || q.includes('locked') || q.includes('why is google') || q.includes('why is')) {
    const googleJob = (state.jobs || []).find(j => j.company.toLowerCase().includes('google')) || { minScore: 45, title: 'Software Engineer' };
    const gap = Math.max(0, googleJob.minScore - candScore);
    const candSkillNames = (candidate.skills || []).map(s => (typeof s === 'string' ? s : s.name).toLowerCase());
    const reqSkills = googleJob.requiredSkills || ['Java', 'Python', 'Data Structures', 'Distributed Systems'];
    const missing = reqSkills.filter(req => !candSkillNames.some(cs => cs.includes(req.toLowerCase()) || req.toLowerCase().includes(cs)));

    return `
      <p class="font-semibold text-amber-400 mb-1">Google (${googleJob.title}) requires a minimum score of <strong>${googleJob.minScore} / 50</strong>.</p>
      <p class="text-sm text-slate-300 mb-2">Your current verified score is <strong>${candScore} / 50</strong> ${gap > 0 ? `(a deficit of ${gap} points)` : '(meets score threshold)'}.</p>
      <ul class="list-disc pl-5 space-y-1 text-sm text-slate-300">
        <li><strong>Missing Mandatory Skills:</strong> ${missing.length > 0 ? missing.join(', ') : 'None missing! You satisfy required skill tags.'}</li>
        <li><strong>Assessment Status:</strong> ${assessScoreStr}</li>
      </ul>
      <p class="mt-2 text-xs text-slate-400">🚀 Check out the <strong>Skill Gap Analyzer</strong> to see targeted learning milestones to qualify for this role!</p>
    `;
  }

  // 3. How can I improve my score?
  if (q.includes('improve') || q.includes('boost') || q.includes('increase score')) {
    const suggestions = [];
    if (!latestAssess || latestAssess.percentage < 80) {
      suggestions.push(`<strong>Complete / Retake the Skill Assessment:</strong> Scoring above 80% boosts your technical skill ratings to Advanced.`);
    }
    if (projectCount < 2) {
      suggestions.push(`<strong>Add Practical Projects:</strong> Adding verified GitHub repositories with full-stack frameworks grants up to 5 project points.`);
    }
    if (certCount < 3) {
      suggestions.push(`<strong>Add Technical Certifications:</strong> Accredited certifications (NPTEL, AWS, Oracle, Coursera) earn direct points.`);
    }
    if (suggestions.length === 0) {
      suggestions.push(`<strong>Maintain Advanced Skill Profiles:</strong> Continue verifying edge competencies like Cloud and Microservices to maintain top ranking.`);
    }

    return `
      <p class="font-semibold text-emerald-400 mb-1">Personalized Actions for ${candName} to boost score (${candScore}/${scoreMax}):</p>
      <ol class="list-decimal pl-5 space-y-1.5 text-sm text-slate-300">
        ${suggestions.map(s => `<li>${s}</li>`).join('')}
      </ol>
      <p class="mt-2 text-xs text-slate-400">All scoring calculations are 100% transparent and deterministic.</p>
    `;
  }

  // 4. Which skills should I learn?
  if (q.includes('which skills') || q.includes('what skills') || q.includes('skills should i learn') || q.includes('learn')) {
    const candSkillNames = (candidate.skills || []).map(s => (typeof s === 'string' ? s : s.name).toLowerCase());
    const allJobSkills = {};
    (state.jobs || []).forEach(j => {
      (j.requiredSkills || []).forEach(rs => {
        allJobSkills[rs] = (allJobSkills[rs] || 0) + 1;
      });
    });

    const recommended = Object.keys(allJobSkills).filter(sk => !candSkillNames.some(cs => cs.includes(sk.toLowerCase()) || sk.toLowerCase().includes(cs)));

    return `
      <p class="font-semibold text-blue-400 mb-1">Top In-Demand Skills for Your Target Roles:</p>
      <ul class="list-disc pl-5 space-y-1 text-sm text-slate-300">
        ${recommended.slice(0, 4).map(sk => `<li><strong>${sk}:</strong> Required by active postings in SkillMatch.</li>`).join('')}
      </ul>
      <p class="mt-2 text-xs text-slate-400">Head over to the <strong>Skill Gap Analyzer</strong> in your dashboard for custom 4-step roadmaps!</p>
    `;
  }

  // 5. Why was I not recommended? / Transparency
  if (q.includes('not recommended') || q.includes('rejected') || q.includes('why was i not') || q.includes('fairness') || q.includes('bias')) {
    return `
      <p class="font-semibold text-purple-400 mb-1">Fair Hiring Deterministic Evaluation:</p>
      <p class="text-sm text-slate-300">SkillMatch eliminates black-box AI screening and human subjective bias. Candidate evaluation is strictly bound to:</p>
      <ul class="list-disc pl-5 space-y-1 text-sm text-slate-300 mt-1">
        <li>Verified academic milestones (10th, 12th, CGPA)</li>
        <li>Objective technical assessment scores</li>
        <li>Verified certifications & public code repositories</li>
      </ul>
      <p class="mt-2 text-xs text-slate-400">Personal identity, gender, college brand, and background are never factored into rankings.</p>
    `;
  }

  // 6. Which jobs match me?
  if (q.includes('match') || q.includes('jobs match me') || q.includes('eligible jobs') || q.includes('available jobs')) {
    const jobs = state.jobs || [];
    const matches = jobs.map(j => {
      const isEligible = candScore >= j.minScore;
      return {
        job: j,
        isEligible: isEligible,
        statusText: isEligible ? '✓ Eligible' : `🔒 Needs ${j.minScore - candScore} more pts`
      };
    });

    return `
      <p class="font-semibold text-emerald-400 mb-1">Live Opportunities for ${candName} (Score: ${candScore}/50):</p>
      <ul class="list-disc pl-5 space-y-1 text-sm text-slate-300">
        ${matches.map(m => `<li><strong>${m.job.company} (${m.job.title}):</strong> Min Score: ${m.job.minScore} — <span class="${m.isEligible ? 'text-emerald-400 font-semibold' : 'text-amber-400 font-semibold'}">${m.statusText}</span></li>`).join('')}
      </ul>
      <p class="mt-2 text-xs text-slate-400">Select any eligible position under <strong>Available Jobs</strong> to take the role-specific case assessment!</p>
    `;
  }

  // Default fallback
  return `
    <p class="text-sm text-slate-300">
      Hello <strong>${candName}</strong>! I'm your <strong>SkillMatch Career Coach</strong>. Your current score is <strong>${candScore}/${scoreMax}</strong>.
    </p>
    <p class="text-xs text-slate-400 mt-2">
      I can explain your score breakdown, tell you which jobs match your verified skills, explain why roles like Google are locked, or suggest the fastest path to eligibility. Click any chip below!
    </p>
  `;
}

window.FairHireCoach = {
  generateCoachResponse
};
