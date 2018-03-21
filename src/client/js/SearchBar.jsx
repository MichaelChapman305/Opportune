import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

const SearchBar = ({ handleSearch, searchText, removeSearchText }) => (
  <div className="SearchBar">
    <img className="SearchBar__searchIcon " src="./images/search-icon.svg" alt="Search icon" />
    <input
      className="SearchBar__input"
      onChange={handleSearch}
      value={searchText}
      type="search"
      placeholder="Find your dream job"
    />
    {searchText.length > 0 && (
      <img
        className="SearchBar__cancelIcon"
        src="./images/cancel-icon.svg"
        alt="Cancel button"
        onClick={removeSearchText}
      />
    )}
  </div>
);

SearchBar.propTypes = {
  handleSearch: PropTypes.func.isRequired,
  searchText: PropTypes.string.isRequired,
  removeSearchText: PropTypes.func.isRequired,
};

export default SearchBar;
