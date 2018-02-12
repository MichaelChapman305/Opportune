import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

export default class SearchContainer extends Component {
  render() {
    return (
      <div className="SearchContainer">
        <input className="SearchContainer-searchbar" type="search" placeholder="Find your dream job" minLength="1" maxLength="15" pattern="[A-z]" />
        <div className="SearchContainer-filter">
          <div className="SearchContainer-filter-experience">Experience</div>
          <div className="SearchContainer-filter-location">Location</div>
          <div className="SearchContainer-filter-more">More</div>
        </div>
      </div>
    )
  }
}