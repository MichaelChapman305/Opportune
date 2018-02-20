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
          onChange={this.props.searchListings}
          type="search"
          placeholder="Find your dream job"
          autoFocus
        />
      </div>
    );
  }
}
