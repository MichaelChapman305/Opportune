import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import SearchBar from './SearchBar.jsx';
import SearchFilter from './SearchFilter.jsx';

export default class SearchContainer extends Component {
  render() {
    return (
      <div className="SearchContainer">
        <SearchBar />
        <div className="SearchContainer__filters">
          <SearchFilter title="Experience" />
          <SearchFilter title="Location" />
          <SearchFilter title="More" />
        </div>
      </div>
    )
  }
}