import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

export default class SearchBar extends Component {
  render() {
    return (
      <div className="SearchBar__container">
        <img src="./images/search-icon.svg" alt="" />
        <input
          className="SearchBar__container__searchbar"
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
