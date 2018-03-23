import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import onClickOutside from 'react-onclickoutside';

import * as searchConstants from './searchConstants.js';

import SearchBar from './SearchBar.jsx';
import SearchFilter from './SearchFilter.jsx';
import SearchToken from './SearchToken.jsx';

export default class SearchContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeFilterTitle: '',
      searchTokens: [],
      searchText: '',
    };

    const debounce = (func, delay) => {
      let trackDebounce;
      return function() {
        const context = this;
        const args = arguments;
        clearTimeout(trackDebounce);
        trackDebounce = setTimeout(() => func.apply(context, args), delay);
      };
    };

    this.debouncedFetchJobs = debounce(this.handleChange, searchConstants.DEBOUNCE_TIME);

    this.handleChange = this.handleChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.removeSearchText = this.removeSearchText.bind(this);
    this.removeAllTokens = this.removeAllTokens.bind(this);
    this.removeSearchToken = this.removeSearchToken.bind(this);
    this.addSearchToken = this.addSearchToken.bind(this);
    this.setActiveFilter = this.setActiveFilter.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    const { searchText, searchTokens } = this.state;

    if (
      searchText !== prevState.searchText ||
      searchTokens.length !== prevState.searchTokens.length
    ) {
      this.debouncedFetchJobs();
    }
  }

  handleChange() {
    const { searchText, searchTokens } = this.state;
    this.props.fetchJobs(searchText, searchTokens);
  }

  handleSearch(e) {
    this.setState({
      searchText: e.target.value,
    });
  }

  removeSearchText() {
    this.setState({
      searchText: '',
    });
  }

  addSearchToken(value, type) {
    const { searchTokens } = this.state;
    const searchToken = {
      value,
      type,
    };

    for (let i = 0, len = searchTokens.length; i < len; i++) {
      if (value === searchTokens[i].value) {
        return;
      }
    }

    this.setState(prevState => ({
      searchTokens: prevState.searchTokens.concat([searchToken]),
    }));
  }

  removeSearchToken(value, type) {
    this.setState(prevState => ({
      searchTokens: prevState.searchTokens.filter(item => item.value !== value),
    }));
  }

  removeAllTokens() {
    if (this.state.searchTokens.length === 0) {
      return;
    }

    this.setState({
      searchTokens: [],
    });
  }

  setActiveFilter(filterTitle) {
    // If a person click's the filter when they already have that filter opened,
    // we should reset the activeFilterTitle in order to close the filter's menu
    if (this.state.activeFilterTitle === filterTitle) {
      filterTitle = '';
    }

    this.setState({
      activeFilterTitle: filterTitle,
    });
  }

  render() {
    const EnhancedSearchFilter = onClickOutside(SearchFilter);
    const { activeFilterTitle, searchText, searchTokens } = this.state;

    return (
      <div className="SearchContainer">
        <SearchBar
          searchText={searchText}
          removeSearchText={this.removeSearchText}
          handleSearch={this.handleSearch}
        />
        <div className="SearchContainer__filters">
          <EnhancedSearchFilter
            title={searchConstants.EXPERIENCE_FILTER_TITLE}
            optionsMenu={searchConstants.EXPERIENCE_OPTIONS}
            setActiveFilter={this.setActiveFilter}
            activeFilterTitle={activeFilterTitle}
            addSearchToken={this.addSearchToken}
          />
          <EnhancedSearchFilter
            title={searchConstants.LOCATION_FILTER_TITLE}
            optionsMenu={searchConstants.LOCATION_OPTIONS}
            setActiveFilter={this.setActiveFilter}
            activeFilterTitle={activeFilterTitle}
            addSearchToken={this.addSearchToken}
          />
          <EnhancedSearchFilter
            title={searchConstants.ROLE_FILTER_TITLE}
            optionsMenu={searchConstants.ROLE_OPTIONS}
            setActiveFilter={this.setActiveFilter}
            activeFilterTitle={activeFilterTitle}
            addSearchToken={this.addSearchToken}
          />
          <EnhancedSearchFilter
            title={searchConstants.SKILLS_FILTER_TITLE}
            optionsMenu={searchConstants.SKILL_OPTIONS}
            setActiveFilter={this.setActiveFilter}
            activeFilterTitle={activeFilterTitle}
            addSearchToken={this.addSearchToken}
          />
          <a className="SearchContainer__resetFilters" role="button" onClick={this.removeAllTokens}>
            Reset Filters
          </a>
        </div>
        {searchTokens.length > 0 && (
          <div className="SearchContainer__tokens">
            {searchTokens.map(token => (
              <SearchToken
                key={`${token.value}-${token.type}`}
                value={token.value}
                type={token.type}
                removeSearchToken={this.removeSearchToken}
              />
            ))}
          </div>
        )}
      </div>
    );
  }
}

SearchContainer.propTypes = {
  fetchJobs: PropTypes.func.isRequired,
};
