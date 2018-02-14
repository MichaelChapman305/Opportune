import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import SearchBar from './SearchBar.jsx';
import SearchFilter from './SearchFilter.jsx';
import ExperienceOptions from './ExperienceOptions.jsx';
import LocationOptions from './LocationOptions.jsx';
import RoleOptions from './RoleOptions.jsx';
import SkillsOptions from './SkillsOptions.jsx';

export default class SearchContainer extends Component {
  render() {
    return (
      <div className="SearchContainer">
        <SearchBar />
        <div className="SearchContainer__filters">
          <div className="SearchContainer__filters-container">
            <SearchFilter title="Experience" dropDownShown={this.props.dropDownShown}/>
            {this.props.title === 'Experience' && 
              <ExperienceOptions />
            }
          </div>

          <div className="SearchContainer__filters-container">
            <SearchFilter title="Location" dropDownShown={this.props.dropDownShown} />
            {this.props.title === 'Location' && 
              <LocationOptions />
            }
          </div>

          <div className="SearchContainer__filters-container">
            <SearchFilter title="Role" dropDownShown={this.props.dropDownShown} />  
            {this.props.title === 'Role' && 
              <RoleOptions />
            }
          </div>

          <div className="SearchContainer__filters-container">
            <SearchFilter title="Skill" dropDownShown={this.props.dropDownShown} />
            {this.props.title === 'Skill' && 
              <SkillsOptions />
            }
          </div>
        </div>
      </div>
    )
  }
}

SearchContainer.propTypes = {
  title: PropTypes.string,
  dropDownShown: PropTypes.func.isRequired,
}
