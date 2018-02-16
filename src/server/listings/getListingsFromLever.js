const fetch = require('node-fetch');
const companyNames = require('./companyNames.js');
const listingUtilities = require('./listingUtilities.js');

function getListingsFromLever(companyID) {
  return fetch(`https://api.lever.co/v0/postings/${companyID}?&mode=json`)
    .then(res => res.json())
    .then(json => {
      if (!Array.isArray(json)) {
        throw new Error(`couldn't retrieve data for company ${companyID}`);
      }

      const jobs = json.map(job => ({
        id: job.id,
        company: companyNames.LEVER_COMPANIES[companyID],
        title: job.text,
        experience: listingUtilities.getExperienceLevelFromTitle(job.text),
        description: job.descriptionPlain,
        location: job.categories && job.categories.location,
        url: job.hostedUrl,
      }));

      return jobs;
    }).catch(err => console.error('Error fetching Lever data:', err));
}

module.exports = getListingsFromLever;
