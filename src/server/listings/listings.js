const getListingsFromGreenhouse = require('./getListingsFromGreenhouse');
const getListingsFromLever = require('./getListingsFromLever');

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

function combineCompanyListings(greenhouseCompanies, leverCompanies) {
  const greenhousePromise = getCompanyListings(greenhouseCompanies, getListingsFromGreenhouse);
  const leverPromise = getCompanyListings(leverCompanies, getListingsFromLever);
  let parsedListings = [];

  Promise.all([greenhousePromise, leverPromise]).then(data => {
    parsedListings = [].concat(...data);

    // TODO: Clean the data here
  });
}

module.exports = parseListingData;
