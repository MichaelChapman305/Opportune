import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

export default class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.clearSearch = this.clearSearch.bind(this);
  }

  clearSearch() {
    this.textInput.value = '';
    this.props.removeSearchText();
  }

  render() {
    return (
      <div className="SearchBar">
        <img className="SearchBar__searchIcon "src="./images/search-icon.svg" alt="Search icon" />
        <input
          className="SearchBar__input"
          ref={input => this.textInput = input}
          onChange={this.props.handleSearch}
          type="search"
          placeholder="Find your dream job"
          autoFocus
        />
        {this.props.searchText.length > 0 &&
          <img className="SearchBar__cancelIcon" src="./images/cancel-icon.svg" alt="Cancel icon" onClick={this.clearSearch}  />
        }
      </div>
    );
  }
}

SearchBar.propTypes = {
  handleSearch: PropTypes.func.isRequired,
  removeSearchText: PropTypes.func.isRequired,
};
