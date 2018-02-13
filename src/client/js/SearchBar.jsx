import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

export default class SearchBar extends Component {
  render() {
    return (
      <div className="SearchBar">
        <img src="./images/search-icon.svg" alt="Search icon" />
        <input
          className="SearchBar__input"
          type="search"
          placeholder="Find your dream job"
          minLength="1"
          maxLength="15"
          pattern="[A-z]"
        />
      </div>
    );
  }
}
