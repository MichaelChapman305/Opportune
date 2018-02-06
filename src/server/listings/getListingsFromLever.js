const request = require('request');

function getListingsFromLever(companyName) {
  request(`https://api.lever.co/v0/postings/${companyName}?&mode=json`, (err, res, body) => {
    if (err) {
      console.error(err);
    }

    let json = '';

    try {
      json = JSON.parse(body);
    } catch (e) {
      console.error(e);
    }

    const jobListings = {};

    jobListings[companyName] = {};

    json.map(listing =>
      jobListings[companyName][listing.id] = {
        id: listing.id,
        title: listing.text,
        location: listing.categories.location,
        url: listing.hostedUrl,
      };
    );

    return jobListings;
  });
}

module.exports = getListingsFromLever;
