import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import SearchBar from './SearchBar.jsx';
import SearchFilter from './SearchFilter.jsx';
import ExperienceOptionsMenu from './ExperienceOptionsMenu.jsx';
import LocationOptionsMenu from './LocationOptionsMenu.jsx';
import RoleOptionsMenu from './RoleOptionsMenu.jsx';
import SkillsOptionsMenu from './SkillsOptionsMenu.jsx';
import SearchToken from './SearchToken.jsx';

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
    this.onClickFilter = this.onClickFilter.bind(this);
  }

  addSearchToken(value, type) {
    const searchToken = { 
      value: value, 
      type: type,
    };

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

  onClickFilter(filterTitle) {
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
            optionsMenu={ExperienceOptionsMenu}
            onClickFilter={this.onClickFilter}
            activeFilterTitle={activeFilterTitle}
            addSearchToken={this.addSearchToken}
          />
          <SearchFilter
            title="Location"
            optionsMenu={LocationOptionsMenu}
            onClickFilter={this.onClickFilter}
            activeFilterTitle={activeFilterTitle}
            addToken={this.addSearchToken}
          />
          <SearchFilter
            title="Role"
            optionsMenu={RoleOptionsMenu}
            onClickFilter={this.onClickFilter}
            activeFilterTitle={activeFilterTitle}
            addToken={this.addSearchToken}
          />
          <SearchFilter
            title="Skills"
            optionsMenu={SkillsOptionsMenu}
            onClickFilter={this.onClickFilter}
            activeFilterTitle={activeFilterTitle}
            addToken={this.addSearchToken}
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
                removeToken={this.removeSearchToken}
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
