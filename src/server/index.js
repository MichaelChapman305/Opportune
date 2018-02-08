const express = require('express');
const CronJob = require('cron').CronJob;

const combineCompanyListings = require('./listings/listings.js');

const app = express();
const publicPath = express.static('./dist');

const cron = new CronJob('00 00 12 * * 6', () => {
  combineCompanyListings(companyNames.GREENHOUSE_COMPANIES, companyNames.LEVER_COMPANIES);
}, null, true, 'America/New_York');

app.use('/dist', publicPath);

app.get('/', (req, res) => {
  res.sendFile('index.html', { root: '.' });
});

app.use((err, req, res) => {
  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message,
    },
  });
});

console.log('Starting server on port 5000!');
app.listen(process.env.PORT || 5000);
