const getListingsFromGreenhouse = require('./getListingsFromGreenhouse');
const getListingsFromLever = require('./getListingsFromLever');
const JobListing = require('../models.js').JobListing;
const listingUtilities = require('./listingUtilities.js');

function combineCompanyListings(greenhouseCompanies, leverCompanies) {
  const greenhousePromise = getCompanyListings(greenhouseCompanies, getListingsFromGreenhouse);
  const leverPromise = getCompanyListings(leverCompanies, getListingsFromLever);

  Promise.all([greenhousePromise, leverPromise]).then(data => {
    // Flatten the data and remove any undefined entries
    const listings = flatten(data).filter(listing => listing);

    // Clean the data of all non-engineering job listings
    const filteredListings = listings.filter(listing => {
      return listingUtilities.isEngineeringJob(listing.title);
    });

    console.log(filteredListings.length);
    return filteredListings;
  })
  .then(filteredListings => JobListing.insertMany(filteredListings))
  .then(() => console.log('added'))
  .catch(err => console.error('Error updating database with job listings', err));
}

function getCompanyListings(companies, getListingsPromise) {
  const promises = [];
  const companyIDs = Object.keys(companies);

  for (let i = 0, len = companyIDs.length; i < len; i++) {
    const companyID = companyIDs[i];
    promises.push(getListingsPromise(companyID));
  }

  // Return a promise that resolves when all the listings from all the companies
  // have been fetched successfully
  return Promise.all(promises);
}

function flatten(arr, result = []) {
  for (let i = 0, len = arr.length; i < len; i++) {
    const value = arr[i];

    if (Array.isArray(value)) {
      flatten(value, result);
    } else {
      result.push(value);
    }
  }
  return result;
}

module.exports = combineCompanyListings;
