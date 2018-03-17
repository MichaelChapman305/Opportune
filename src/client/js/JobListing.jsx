import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

const JobListing = ({ company, title, location, applyUrl }) => (
  <div className="JobListing">
    <div className="JobListing__info">
      <h2 className="JobListing__title">
        {title} at <b className="JobListing__company">{company}</b>
      </h2>
      <h3 className="JobListing__location">{location}</h3>
    </div>
    <a className="JobListing__apply" href={applyUrl} target="_blank">APPLY</a>
  </div>
);

JobListing.propTypes = {
  company: PropTypes.string,
  title: PropTypes.string,
  location: PropTypes.string,
  applyUrl: PropTypes.string,
};

JobListing.defaultProps = {
  company: 'Unknown',
  title: 'Unknown',
  location: 'Unknown',
  applyUrl: '',
};

export default JobListing;
