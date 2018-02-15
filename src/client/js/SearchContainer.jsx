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

    this.toggleFilter = this.toggleFilter.bind(this);
  }

  toggleFilter(filterTitle) {
    this.setState(prevState => ({
      activeFilterTitle: filterTitle,
    }));
  }

  render() {
    const { activeFilterTitle } = this.state;

    return (
      <div className="SearchContainer">
        <SearchBar />
        <div className="SearchContainer__filters">
          <SearchFilter
            title="Experience"
            optionsMenu={ExperienceOptionsMenu}
            activeFilterTitle={activeFilterTitle}
            onClickFilter={this.toggleFilter}
          />
          <SearchFilter
            title="Location"
            optionsMenu={LocationOptionsMenu}
            activeFilterTitle={activeFilterTitle}
            onClickFilter={this.toggleFilter}
          />
          <SearchFilter
            title="Role" 
            optionsMenu={RoleOptionsMenu}
            activeFilterTitle={activeFilterTitle}
            onClickFilter={this.toggleFilter}
          />  
          <SearchFilter
            title="Skills" 
            optionsMenu={SkillsOptionsMenu}
            activeFilterTitle={activeFilterTitle}
            onClickFilter={this.toggleFilter}
          />
        </div>
      </div>
    )
  }
}