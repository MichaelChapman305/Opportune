const fetch = require('node-fetch');
const companyNames = require('./companyNames.js');

function getListingsFromGreenhouse(companyID) {
  return fetch(`https://api.greenhouse.io/v1/boards/${companyID}/jobs?content=true`)
    .then(res => res.json())
    .then(json => {
      if (!json.jobs) {
        throw new Error(`couldn't retrieve data for company ${companyID}`);
      }

      const jobs = json.jobs.map(job => ({
        id: job.id,
        company: companyNames.GREENHOUSE_COMPANIES[companyID],
        title: job.title,
        description: htmlToPlainText(job.content),
        location: job.location && job.location.name,
        url: job.absolute_url,
      }));

      return jobs;
    }).catch(err => console.error('Error fetching Greenhouse data:', err));
}

function htmlToPlainText(str) {
  return str
    .replace(/&amp;amp;/g, '&') // Convert HTML entities
    .replace(/&#39;/g, '\'')
    .replace(/&amp;/, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/<(?:.|\n)*?>/gm, '') // Strip HTML elements
    .replace(/\n/g, ' '); // Strip newlines
}

module.exports = getListingsFromGreenhouse;
