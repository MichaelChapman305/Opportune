import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

export default class SearchComponent extends Component {
  render() {
    return (
      <div className="SearchComponent">
        <input className="SearchComponent-search-bar" type="search" placeholder="Find your dream job" minLength="1" maxLength="15" pattern="[A-z]" />
        <div className="SearchComponent-filter">
          <div className="SearchComponent-filter-experience">Experience</div>
          <div className="SearchComponent-filter-location">Location</div>
          <div className="SearchComponent-filter-more">More</div>
        </div>
      </div>
    )
  }
}