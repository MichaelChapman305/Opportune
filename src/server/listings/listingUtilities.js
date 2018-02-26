const EXCLUDED_WORDS = [
  'specialist',
  'consultant',
  'trainer',
  'it',
  'support',
  'qa',
  'quality',
  'mechanical',
  'customer',
  'solution',
  'solutions',
  'value',
  'field',
  'sales',
  'helpdesk',
];

function isEngineeringJob(title) {
  title = title.toLowerCase();

  if (!title.includes('engineer') && !title.includes('developer')) {
    return false;
  }

  for (let i = 0, len = EXCLUDED_WORDS.length; i < len; i++) {
    if (title.includes(EXCLUDED_WORDS[i])) {
      return false;
    }
  }

  return true;
}

function getExperienceLevelFromTitle(title) {
  title = title.toLowerCase();

  if (/\binterns?(ships?)?\b/.test(title)) {
    return 'Intern';
  }
  else if (/\bcampus\b|\b(grad(uate)?)\b/.test(title)) {
    return 'New Graduate';
  }
  else if (/\bsr\.?\b|\bsenior\b|\bstaff\b/.test(title)) {
    return 'Senior';
  }
  else if (/\blead\b|\bmanager\b/.test(title)) {
    return 'Management';
  }

  return 'Mid-level';
}

function getRoleFromTitle(title) {
  title = title.toLowerCase();

  if (/\bfront.?end\b|\bjavascript\b|\bui\b|\bweb\b/.test(title)) {
    return 'Frontend';
  }
  else if (/\bback.?end\b|\bapi\b/.test(title)) {
    return 'Backend';
  }
  else if (/\bfull.?stack\b/.test(title)) {
    return 'Full-stack';
  }
  else if (/\b(machine|deep) learning\b|\bml\b|\bai\b/.test(title)) {
    return 'Machine Learning';
  }
  else if (/\bdevops\b|\binfrastructure\b/.test(title)) {
    return 'DevOps / Infrastructure';
  } 
  else if (/\bmobile\b|\bios\b|\bandroid\b/.test(title)) {
    return 'Mobile';
  }

  return 'General';
}

module.exports = {
  isEngineeringJob,
  getExperienceLevelFromTitle,
  getRoleFromTitle,
};
