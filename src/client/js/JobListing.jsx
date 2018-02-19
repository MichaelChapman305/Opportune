import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

export default class JobListing extends Component {
  render() {
    return (
      <div className="JobListing">
        <div className="JobListing__info">
          <h2 className="JobListing__title">
            {this.props.title} at <b class="JobListing__company">{this.props.company}</b>
          </h2>
          <h3 className="JobListing__location">{this.props.location}</h3>
        </div>
        <a className="JobListing__apply" href={this.props.applyUrl}>APPLY</a>
      </div>
    );
  }
}

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

