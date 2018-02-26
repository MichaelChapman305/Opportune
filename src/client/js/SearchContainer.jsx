import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import SearchBar from './SearchBar.jsx';
import SearchFilter from './SearchFilter.jsx';
import ExperienceOptionsMenu from './ExperienceOptionsMenu.jsx';
import LocationOptionsMenu from './LocationOptionsMenu.jsx';
import RoleOptionsMenu from './RoleOptionsMenu.jsx';
import SkillsOptionsMenu from './SkillsOptionsMenu.jsx';

export default class SearchContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeFilterTitle: '',
    };

    this.onClickFilter = this.onClickFilter.bind(this);
  }

  //Add onClick event listener

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
    const { activeFilterTitle } = this.state;

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
          />
          <SearchFilter
            title="Location"
            optionsMenu={LocationOptionsMenu}
            onClickFilter={this.onClickFilter}
            activeFilterTitle={activeFilterTitle}
          />
          <SearchFilter
            title="Role"
            optionsMenu={RoleOptionsMenu}
            onClickFilter={this.onClickFilter}
            activeFilterTitle={activeFilterTitle}
          />
          <SearchFilter
            title="Skills"
            optionsMenu={SkillsOptionsMenu}
            onClickFilter={this.onClickFilter}
            activeFilterTitle={activeFilterTitle}
          />
          <a className="SearchContainer__resetFilters">RESET FILTERS</a>
        </div>
      </div>
    );
  }
}

SearchContainer.propTypes = {
  fetchJobs: PropTypes.func.isRequired,
};
