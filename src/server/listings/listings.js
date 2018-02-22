const getListingsFromGreenhouse = require('./getListingsFromGreenhouse');
const getListingsFromLever = require('./getListingsFromLever');
const JobListing = require('../models.js');
const listingUtilities = require('./listingUtilities.js');

function combineCompanyListings(greenhouseCompanies, leverCompanies) {
  const greenhousePromise = getCompanyListings(greenhouseCompanies, getListingsFromGreenhouse);
  const leverPromise = getCompanyListings(leverCompanies, getListingsFromLever);

  Promise.all([greenhousePromise, leverPromise]).then(data => {
    // Flatten the resulting data from the several Promise.all chains
    const listings = flatten(data);

    // Return all valid, engineering jobs from our data
    return listings.filter(listing => {
      return listing && listingUtilities.isEngineeringJob(listing.title);
    });
  })
  .then(filteredListings => updateDatabase(filteredListings))
  .catch(err => console.error('Error updating database with job listings', err));
}

function updateDatabase(listings) {
  const updateOptions = {
    upsert: true,
    runValidators: true,
  };

  for (let i = 0, len = listings.length; i < len; i++) {
    const updateCondition = { 
      id: listings[i].id,
    };

    // Update all our of entries and insert any new entries with the upsert option
    JobListing.findOneAndUpdate(updateCondition, listings[i], updateOptions).exec();
  }

  const purgeDate = new Date();
  purgeDate.setDate(purgeDate.getDate() - 7);

  // Since we have updated every entry in the database above, we can remove any 
  // entries that were not updated in the last week which means that jobs fitting 
  // this criteria no longer exist on their Greenhouse or Lever job boards
  JobListing.remove({ 
    updatedAt: { 
      $lte: purgeDate,
    },
  }).exec().then(info => console.log(`Purged ${info.n} old jobs from the database`));
}

function getCompanyListings(companies, getListingsFunc) {
  const promises = [];
  const companyIDs = Object.keys(companies);

  for (let i = 0, len = companyIDs.length; i < len; i++) {
    const companyID = companyIDs[i];
    promises.push(getListingsFunc(companyID));
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
