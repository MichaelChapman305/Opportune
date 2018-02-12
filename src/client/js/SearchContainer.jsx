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
        <SearchFilter />
      </div>
    )
  }
}