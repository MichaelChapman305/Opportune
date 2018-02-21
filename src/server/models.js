const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/jobListings');

const db = mongoose.connection;
mongoose.promise = global.promise;

db.on('error', err => {
  console.error('connection error:', err);
});

db.once('open', () => {
  console.log('db connection successful');
});

const Schema = mongoose.Schema;
const jobListing = new Schema({
  id: String,
  company: String,
  experience: String,
  description: String,
  title: String,
  location: String,
  url: String,
  updated_at: { type: Date, default: Date.now },
});

// Index important fields in the jobListing schema with search weights
// for more accurate results
jobListing.index(
  {
    company: 'text',
    experience: 'text',
    description: 'text',
    title: 'text',
    location: 'text',
  },
  {
    weights: {
      company: 8,
      experience: 12,
      description: 1,
      title: 12,
      location: 12,
    },
  },
);

const JobListing = mongoose.model('JobListing', jobListing);

module.exports.JobListing = JobListing;
