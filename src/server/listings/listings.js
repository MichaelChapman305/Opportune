const getListingsFromGreenhouse = require('./getListingsFromGreenhouse');
const getListingsFromLever = require('./getListingsFromLever');
const JobListing = require('../models.js');
const listingUtilities = require('./listingUtilities.js');

function updateDatabase(listings) {
  const updateOptions = {
    upsert: true,
    runValidators: true,
  };
  const promises = [];

  for (let i = 0, len = listings.length; i < len; i++) {
    const updateCondition = {
      id: listings[i].id,
    };
    const updatePromise = JobListing.findOneAndUpdate(
      updateCondition,
      listings[i],
      updateOptions
    ).exec();

    promises.push(updatePromise);
  }

  const purgeDate = new Date();
  purgeDate.setDate(purgeDate.getDate() - 7);

  // Since we have updated every entry in the database above, we can remove any
  // entries that were not updated in the last week which means that jobs fitting
  // this criteria no longer exist on their Greenhouse or Lever job boards
  const removeListings = JobListing.remove({
    updatedAt: {
      $lte: purgeDate,
    },
  }).exec();

  return Promise.all(promises)
    .then(removeListings)
    .then(removedListings =>
      console.log(`Removed ${removedListings.length} old entries from the database`)
    );
}

function getNewJobListings() {
  return JobListing.find(
    {
      $where: 'this.updatedAt[0] === this.createdAt[0]',
    },
    {
      company: 1,
      title: 1,
      url: 1,
    }
  ).exec();
}

function getCompanyListings(companies, getListingsFunc) {
  if (!companies) {
    return;
  }

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

function combineCompanyListings(greenhouseCompanies, leverCompanies) {
  const greenhousePromise = getCompanyListings(greenhouseCompanies, getListingsFromGreenhouse);
  const leverPromise = getCompanyListings(leverCompanies, getListingsFromLever);

  return Promise.all([greenhousePromise, leverPromise]).then(data => {
    // Flatten the resulting data from the several Promise.all chains
    const listings = flatten(data);

    // Return all valid, engineering jobs from our data
    return listings.filter(listing => listing && listingUtilities.isEngineeringJob(listing.title));
  });
}

module.exports = {
  combineCompanyListings,
  updateDatabase,
  getNewJobListings,
};
