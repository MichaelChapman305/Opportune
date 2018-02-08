const mongoose = require('mongoose');

//mongoose.connect('mongodb://localhost:27017/jobListings');

const db = mongoose.connection;
mongoose.promise = global.promise;

db.on('error', (err) => {
  console.error('connection error:', err);
});

//db.once('open', () => {
//  console.log('db connection successful');
//});

const Schema = mongoose.Schema;
const jobListing = new Schema({
  'id': String,
  'company': String,
  'description': String,
  'title': String,
  'location': String,
});

const JobListing = mongoose.model('JobListing', jobListing);

module.exports.JobListing = JobListing;
