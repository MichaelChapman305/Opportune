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

function combineCompanyListings(greenhouseCompanies, leverCompanies) {
  const greenhousePromise = getCompanyListings(greenhouseCompanies, getListingsFromGreenhouse);
  const leverPromise = getCompanyListings(leverCompanies, getListingsFromLever);

  Promise.all([greenhousePromise, leverPromise]).then(data => {
    const parsedListings = flatten(data).filter(listing => listing);

    // Cleans data of all non-engineering job listings
    for (let i = 0; i < validListings.length; i++) {
      const result = Object.values(validListings[i]).filter(listing => {
        const title = listing.title.toLowerCase();
        const excludedWords = ['specialist', 'consultant', 'trainer', 'business', 'it', 'support'];

        if (title.includes('engineer') || title.includes('developer')) {
          for (let j = 0; j < excludedWords.length; j++) {
            if (title.includes(excludedWords[j])) {
              return false;
            }
          }
          return true;
        }
      });

      console.log(result);
    }
  });
}

combineCompanyListings(['yext'], ['yelp']);

module.exports = combineCompanyListings;
