import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import SearchBar from './SearchBar.jsx';
import SearchFilter from './SearchFilter.jsx';
import SearchToken from './SearchToken.jsx';

const EXPERIENCE_OPTIONS = [
  'Intern',
  'New graduate',
  'Mid-level',
  'Senior',
  'Management'
];

const LOCATION_OPTIONS = [
  'San Francisco, CA',
  'New York City, NY',
  'Seattle, WA',
  'Washington, D.C.',
  'Pittsburgh, PA',
  'Chicago, IL',
  'Remote'
];

const ROLE_OPTIONS = [
  'Full-stack',
  'Frontend',
  'Backend',
  'Mobile',
  'DevOps / Infra',
  'Machine learning'
];

const SKILL_OPTIONS = [
  'JavaScript',
  'Python',
  'Go',
  'Java',
  'C++',
  'iOS',
  'Android',
];

export default class SearchContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeFilterTitle: '',
      searchTokens: [],
    };

    this.removeAllTokens = this.removeAllTokens.bind(this);
    this.removeSearchToken = this.removeSearchToken.bind(this);
    this.addSearchToken = this.addSearchToken.bind(this);
    this.setActiveFilter = this.setActiveFilter.bind(this);
  }

  addSearchToken(value, type) {
    const { searchTokens } = this.state;
    const searchToken = { 
      value: value, 
      type: type,
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

  removeSearchToken(value) {
    this.setState(prevState => ({
      searchTokens: prevState.searchTokens.filter(item => item.value !== value),
    }));
  }

  removeAllTokens() {
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
    const { activeFilterTitle, searchTokens } = this.state;

    return (
      <div className="SearchContainer">
        <SearchBar 
          fetchJobs={this.props.fetchJobs}
        />
        <div className="SearchContainer__filters">
          <SearchFilter
            title="Experience"
            optionsMenu={EXPERIENCE_OPTIONS}
            setActiveFilter={this.setActiveFilter}
            activeFilterTitle={activeFilterTitle}
            addSearchToken={this.addSearchToken}
          />
          <SearchFilter
            title="Location"
            optionsMenu={LOCATION_OPTIONS}
            setActiveFilter={this.setActiveFilter}
            activeFilterTitle={activeFilterTitle}
            addSearchToken={this.addSearchToken}
          />
          <SearchFilter
            title="Role"
            optionsMenu={ROLE_OPTIONS}
            setActiveFilter={this.setActiveFilter}
            activeFilterTitle={activeFilterTitle}
            addSearchToken={this.addSearchToken}
          />
          <SearchFilter
            title="Skills"
            optionsMenu={SKILL_OPTIONS}
            setActiveFilter={this.setActiveFilter}
            activeFilterTitle={activeFilterTitle}
            addSearchToken={this.addSearchToken}
          />
          <a className="SearchContainer__resetFilters" onClick={this.removeAllTokens}>RESET FILTERS</a>
        </div>
        {searchTokens.length > 0 &&
          <div className="SearchContainer__tokens">          
            {searchTokens.map(token =>
              <SearchToken 
                key={`${token.value}-${token.type}`}
                value={token.value}
                type={token.type}
                removeSearchToken={this.removeSearchToken}
              />
            )}  
          </div> 
        }      
      </div>
    );
  }
}

SearchContainer.propTypes = {
  fetchJobs: PropTypes.func.isRequired,
};
