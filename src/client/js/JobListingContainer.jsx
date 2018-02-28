import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import JobListing from './JobListing.jsx';

export default class JobListingContainer extends Component {
  render() {
    return (
      <div className="JobListingContainer">
        {this.props.isLoading && <div className="loading" />}
        <a className="JobListingContainer__amount">Showing <b>{this.props.jobs.length}</b> jobs</a>
        {this.props.jobs.map(job =>
          <JobListing
            key={`${job.company}-${job.id}`}
            company={job.company}
            title={job.title}
            applyUrl={job.url}
            location={job.location}
          />
        )}
      </div>
    );
  }
}

JobListingContainer.propTypes = {
  jobs: PropTypes.arrayOf(PropTypes.object),
  isLoading: PropTypes.bool,
};
