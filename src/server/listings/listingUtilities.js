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

module.exports = {
  isEngineeringJob,
  getExperienceLevelFromTitle,
};
