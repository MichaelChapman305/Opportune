import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

export default class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: this.props.searchText,
    }

    this.onChange = this.onChange.bind(this);
  }

  onChange(event) {
    this.setState({ 
      value: event.target.value,
    });
  }

  render() {
    return (
      <div className="SearchBar">
        <img src="./images/search-icon.svg" alt="Search icon" />
        <input
          className="SearchBar__input"
          onChange={this.onChange}
          type="search"
          placeholder="Find your dream job"
          autoFocus
        />
      </div>
    );
  }
}
