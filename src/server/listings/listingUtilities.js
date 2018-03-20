const EXCLUDED_WORDS = [
  'specialist',
  'consultant',
  'trainer',
  'it',
  'support',
  'qa',
  'quality',
  'mechanical',
  'construction',
  'customer',
  'solution',
  'value',
  'field',
  'sales',
  'helpdesk',
  'manufacturing',
  'thermal',
  'electronics',
  'acoustics',
  'hardware',
  'electrical',
  'audio systems',
  'integration',
  'technical services',
  'equipment',
  'fpga',
  'civil',
  'marketing manager',
  'process development',
  'vehicle controls',
  'bridge',
  'strategic partner',
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

function getExperienceLevel(title) {
  title = title.toLowerCase();

  if (/\binterns?(ships?)?\b/.test(title)) {
    return 'Intern';
  } else if (/\bcampus\b|\b(grad(uate)?)\b/.test(title)) {
    return 'New graduate';
  } else if (/\bsr\.?\b|\bsenior\b|\bstaff\b/.test(title)) {
    return 'Senior';
  } else if (/\blead\b|\bmanager\b/.test(title)) {
    return 'Management';
  }

  return 'Mid-level';
}

function getRole(title) {
  title = title.toLowerCase();

  if (/\bfront.?end\b|\bjavascript\b|\bui\b|\bweb\b/.test(title)) {
    return 'Frontend';
  } else if (/\bback.?end\b|\bapi\b/.test(title)) {
    return 'Backend';
  } else if (/\bfull.?stack\b/.test(title)) {
    return 'Full-stack';
  } else if (/\b(machine|deep) learning\b|\bml\b|\bai\b/.test(title)) {
    return 'Machine learning';
  } else if (/\bdevops\b|\binfrastructure\b/.test(title)) {
    return 'DevOps / Infra';
  } else if (/\bmobile\b|\bios\b|\bandroid\b|\bswift\b/.test(title)) {
    return 'Mobile';
  }

  return 'General';
}

function getSkills(title, description) {
  const skills = [];
  const addSkill = (regex, skill) => {
    if (regex.test(title) || regex.test(description)) {
      skills.push(skill);
    }
  };

  addSkill(/\bjavascript\b/i, 'JavaScript');
  addSkill(/\bios\b/i, 'iOS');
  addSkill(/\bAndroid\b/, 'Android');
  addSkill(/\bGo\b|\bGolang\b/, 'Go');
  addSkill(/\bPython\b/, 'Python');
  addSkill(/\bC\+\+\b/, 'C++');
  addSkill(/\bJava\b/, 'Java');

  return skills;
}

module.exports = {
  isEngineeringJob,
  getExperienceLevel,
  getRole,
  getSkills,
};
