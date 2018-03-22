const express = require('express');
const config = require('dotenv').config();
const CronJob = require('cron').CronJob;
const listings = require('./listings/listings.js');
const companyNames = require('./listings/companyNames.js');
const routes = require('./routes.js');
const sendEmailsToUsers = require('./emails.js');

const app = express();
const cron = new CronJob(
  '00 00 12 * * 6',
  () => {
    listings
      .combineCompanyListings(companyNames.GREENHOUSE_COMPANIES, companyNames.LEVER_COMPANIES)
      .then(jobListings => listings.updateDatabase(jobListings))
      .then(listings.getNewJobListings)
      .then(newListings => {
        if (newListings.length > 0) {
          sendEmailsToUsers(newListings);
        }
      })
      .catch(err => console.error('There was an error running backend updates', err));
  },
  null,
  true,
  'America/New_York'
);

app.use('/images', express.static('./src/client/images'));
app.use('/', express.static('./dist'));

if (process.env.NODE_ENV === 'production') {
  app.use((req, res, next) => {
    if (req.headers['x-forwarded-proto'] !== 'https') {
      res.redirect(`https://${req.headers.host}${req.url}`);
    } else {
      next();
    }
  })
}

app.use(routes);

console.log('Starting server on port 5000!');
app.listen(process.env.PORT || 5000);
