const express = require('express');
const CronJob = require('cron').CronJob;
const combineCompanyListings = require('./listings/listings.js');
const companyNames = require('./listings/companyNames.js');
const routes = require('./routes.js');
const createEmailTemplate = require('./email/createEmailTemplate.js');

const app = express();

const cron = new CronJob(
  '00 00 12 * * 6',
  () => {
    combineCompanyListings(companyNames.GREENHOUSE_COMPANIES, companyNames.LEVER_COMPANIES)
    .then(createEmailTemplate.getNewJobListings)
    .then(newListings => {
      if (newListings.length > 0) {
        createEmailTemplate.createEmail(newListings);
      }
    })
    .catch(err => console.error(err));
  },
  null,
  true,
  'America/New_York'
);

app.use('/images', express.static('./src/client/images'));
app.use('/', express.static('./dist'));

app.use(routes);

console.log('Starting server on port 5000!');
app.listen(process.env.PORT || 5000);
