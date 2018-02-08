const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/jobsListings');

const db = mongoose.connection;
mongoose.promise = global.promise;

db.on('error', (err) => {
  console.error('connection error:', err);
});

db.once('open', () => {
  console.log('db connection successful');
});

const Schema = mongoose.Schema;
const joblisting = new Schema({
  'id': String,
  'company': String,
  'title': String,
  'location': String,
});

const JobListing = mongoose.model('JobListing', joblisting);

module.exports = JobListing;
