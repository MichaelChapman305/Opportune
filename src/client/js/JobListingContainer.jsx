import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import JobListing from './JobListing.jsx';

export default class JobListingContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="JobListingContainer">
        <div className="JobListingContainer__info">
          <a>Showing {this.props.jobs.length} jobs</a>
          <a>Sort by</a>
        </div>
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
  jobs: PropTypes.array,
};
