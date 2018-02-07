const fetch = require('node-fetch');

function getListingsFromGreenhouse(companyName) {
  fetch(`https://api.greenhouse.io/v1/boards/${companyName}/jobs`)
    .then(res => res.json())
    .then(json => {
      const jobs = json.jobs.map(job => {
        return {
          id: job.id,
          title: job.title,
          location: job.location && job.location.name,
          url: job.absolute_url,
        };
      });
      console.log(jobs);

      return jobs;
    }).catch(err => console.error('Error fetching greenhouse data', err));
}

module.exports = getListingsFromGreenhouse;