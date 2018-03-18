import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import JobListing from './JobListing.jsx';

const JobListingContainer = ({ jobs, isLoading }) => (
  <div className="JobListingContainer">
    {isLoading && <div className="loading" />}
    <a className="JobListingContainer__amount">
      Showing <b>{jobs.length}</b> jobs
    </a>
    {jobs.map(job => (
      <JobListing
        key={`${job.company}-${job.id}`}
        company={job.company}
        title={job.title}
        applyUrl={job.url}
        location={job.location}
      />
    ))}
  </div>
);

JobListingContainer.propTypes = {
  jobs: PropTypes.arrayOf(PropTypes.object).isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default JobListingContainer;
