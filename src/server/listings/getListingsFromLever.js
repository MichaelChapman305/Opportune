const fetch = require('node-fetch');

function getListingsFromLever(companyName) {
  fetch(`https://api.lever.co/v0/postings/${companyName}?&mode=json`)
    .then(res => res.json())
    .then(json => {
      const jobs = json.map(job => {
        return {
          id: job.id,
          title: job.text,
          location: job.categories && job.categories.location,
          url: job.hostedUrl,
        };
      });

      return {
        [companyName]: jobs
      };
    }).catch(err => console.error('Error fetching lever data', err));
}

module.exports = getListingsFromLever;
