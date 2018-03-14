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
  company: { type: String, trim: true },
  experience: String,
  role: String,
  description: { type: String, trim: true },
  title: { type: String, trim: true },
  location: { type: String, trim: true },
  skills: [String],
  url: String,
}, {
  timestamps: true,
});

// Index important fields in the jobListing schema with search weights
// for more accurate results
jobListing.index(
  {
    company: 'text',
    role: 'text',
    experience: 'text',
    description: 'text',
    title: 'text',
    location: 'text',
  },
  {
    weights: {
      company: 20,
      role: 20,
      experience: 20,
      description: 1,
      title: 20,
      location: 20,
    },
  },
);

const JobListing = mongoose.model('JobListing', jobListing);

module.exports = JobListing;
