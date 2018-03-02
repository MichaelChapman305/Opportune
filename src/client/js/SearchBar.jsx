import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

export default class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchText: '',
    }

    const debounce = (func, delay) => {
      let trackDebounce;
      return function() {
        const context = this;
        const args = arguments;
        clearTimeout(trackDebounce);
        trackDebounce = setTimeout(() => func.apply(context, args), delay);
      }
    }

    this.handleChange = debounce(searchText => {
      this.setState({ searchText }, () => this.props.fetchJobs(searchText));
    }, 500)

    this.handle = this.handle.bind(this);
    this.removeText = this.removeText.bind(this);
    this.TextInput;
  }

  handle(e) {
    this.handleChange(e.target.value);
  }

  removeText() {
    this.textInput.value = '';

    this.setState({
      searchText: '',
    }, this.handleChange(''));
  }

  render() {
    return (
      <div className="SearchBar">
        <img className="searchBar__icon "src="./images/search-icon.svg" alt="Search icon" />
        <input
          className="SearchBar__input"
          ref={input => this.textInput = input}
          onChange={this.handle}
          type="search"
          placeholder="Find your dream job"
          autoFocus
        />
        {this.state.searchText.length > 0 &&
          <img className="searchBar__cancel" src="./images/cancel-icon.svg" alt="Cancel icon" onClick={this.removeText} />
        }
      </div>
    );
  }
}

SearchBar.propTypes = {
  fetchJobs: PropTypes.func.isRequired,
};
