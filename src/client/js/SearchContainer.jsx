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

<<<<<<< Updated upstream
    this.onClickFilter = this.onClickFilter.bind(this);
  }

  onClickFilter(filterTitle) {
    this.setState({
=======
    this.hideFilter = this.hideFilter.bind(this);
    this.toggleFilter = this.toggleFilter.bind(this);
  }

  hideFilter() {
    setTimeout(() => { this.setState({
      activeFilterTitle: '',
    })}, 50);
  }

  toggleFilter(filterTitle) {
    this.setState(prevState => ({
>>>>>>> Stashed changes
      activeFilterTitle: filterTitle,
    });
  }

  render() {
    const { activeFilterTitle } = this.state;

    return (
      <div className="SearchContainer">
        <SearchBar />
        <div className="SearchContainer__filters">
          <SearchFilter
            title={'Experience'}
            optionsMenu={ExperienceOptionsMenu}
            activeFilterTitle={activeFilterTitle}
<<<<<<< Updated upstream
            onClickFilter={this.onClickFilter}
=======
            onClickFilter={this.toggleFilter}
            hideFilter={this.hideFilter}
>>>>>>> Stashed changes
          />
          <SearchFilter
            title={'Location'}
            optionsMenu={LocationOptionsMenu}
            activeFilterTitle={activeFilterTitle}
<<<<<<< Updated upstream
            onClickFilter={this.onClickFilter}
=======
            onClickFilter={this.toggleFilter}
            hideFilter={this.hideFilter}
>>>>>>> Stashed changes
          />
          <SearchFilter
            title={'Role'}
            optionsMenu={RoleOptionsMenu}
            activeFilterTitle={activeFilterTitle}
<<<<<<< Updated upstream
            onClickFilter={this.onClickFilter}
=======
            onClickFilter={this.toggleFilter}
            hideFilter={this.hideFilter}
>>>>>>> Stashed changes
          />  
          <SearchFilter
            title={'Skills'}
            optionsMenu={SkillsOptionsMenu}
            activeFilterTitle={activeFilterTitle}
<<<<<<< Updated upstream
            onClickFilter={this.onClickFilter}
=======
            onClickFilter={this.toggleFilter}
            hideFilter={this.hideFilter}
>>>>>>> Stashed changes
          />
        </div>
      </div>
    )
  }
}