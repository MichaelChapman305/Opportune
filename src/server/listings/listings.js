const getListingsFromGreenhouse = require('./getListingsFromGreenhouse');
const getListingsFromLever = require('./getListingsFromLever');
const companyNames = require('./companyNames.js');
const jobListing = require('../models.js').JobListing;

const EXCLUDED_WORDS = ['specialist', 'consultant', 'trainer', 'it', 'support'];

function combineCompanyListings(greenhouseCompanies, leverCompanies) {
  const greenhousePromise = getCompanyListings(greenhouseCompanies, getListingsFromGreenhouse);
  const leverPromise = getCompanyListings(leverCompanies, getListingsFromLever);

  Promise.all([greenhousePromise, leverPromise]).then(data => {
    const parsedListings = flatten(data).filter(listing => listing);

    // Clean the data of all non-engineering job listings
    const filteredListings = parsedListings.filter(listing => {
      const title = listing.title.toLowerCase();

      if (title.includes('engineer') || title.includes('developer')) {
        for (let i = 0, len = EXCLUDED_WORDS.length; i < len; i++) {
          if (title.includes(EXCLUDED_WORDS[i])) {
            return false;
          }
        }
        return true;
      }
    });

    //console.log(filteredListings.length);
    //jobListing.insertMany(filteredListings);
  });
}

function getCompanyListings(companies, getListingsPromise) {
  const promises = [];

  for (let i = 0, len = companies.length; i < len; i++) {
    const company = companies[i];
    promises.push(getListingsPromise(company));
  }

  // Return a promise that resolves when all the listings from all the companies
  // have been fetched successfully
  return Promise.all(promises);
}

function flatten(arr, result = []) {
  for (let i = 0, length = arr.length; i < length; i++) {
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
