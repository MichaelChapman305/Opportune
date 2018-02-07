const fetch = require('node-fetch');

function getListingsFromGreenhouse(companyName) {
  fetch(`https://api.greenhouse.io/v1/boards/${companyName}/jobs`)
    .then(res => res.json())
    .then(json => {
      const jobs = json.jobs.map(job => ({
        id: job.id,
        title: job.title,
        location: job.location && job.location.name,
        url: job.absolute_url,
      }));

      return jobs;
    }).catch(err => console.error('Error fetching Greenhouse data', err));
}

module.exports = getListingsFromGreenhouse;
