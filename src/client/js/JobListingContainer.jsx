import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import JobListingComponents from './JobListingComponents.jsx';

export default class jobListingContainer extends Component {
  render() {
    return (
      <div className="JobListingContainer">
        <JobListingComponents />
      </div>
    )
  }
}