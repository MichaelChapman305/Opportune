const fetch = require('node-fetch');

function getListingsFromLever(companyName) {
  return fetch(`https://api.lever.co/v0/postings/${companyName}?&mode=json`)
    .then(res => res.json())
    .then(json => {
      const jobs = json.map(job => ({
        id: job.id,
        title: job.text,
        location: job.categories && job.categories.location,
        url: job.hostedUrl,
      }));

      return {
        [companyName]: jobs,
      };
    }).catch(err => console.error('Error fetching Lever data', err));
}

module.exports = getListingsFromLever;
