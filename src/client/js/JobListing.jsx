import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

export default class JobListing extends Component {
  render() {
    return (
      <div className="JobListing">
        <div className="JobListing__info">
          <a>{this.props.jobTitle} {this.props.position} at <b>{this.props.company}</b></a>
          <a className="JobListing__info--location">{this.props.location}</a>
        </div>
        <button className="JobListing__apply">APPLY</button>
      </div>
    );
  }
}

JobListing.propTypes = {
  company: PropTypes.string.isRequired,
  jobTitle: PropTypes.string.isRequired,
  position: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
};
