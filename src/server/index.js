const express = require('express');
const CronJob = require('cron').CronJob;
const combineCompanyListings = require('./listings/listings.js');
const companyNames = require('./listings/companyNames.js');

const app = express();

/* const cron = new CronJob('00 00 12 * * 6', () => {
  combineCompanyListings(companyNames.GREENHOUSE_COMPANIES, companyNames.LEVER_COMPANIES);
}, null, true, 'America/New_York'); */

app.use('/', express.static('./dist'));
app.get('/', (req, res) => {
  res.sendFile('index.html', { root: '.' });
});

console.log('Starting server on port 5000!');
app.listen(process.env.PORT || 5000);
