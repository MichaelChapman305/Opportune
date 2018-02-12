import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

export default class SearchFilter extends Component {
  render() {
    return (
      <div className="SearchContainer__filter">
        <div className="SearchContainer__filter__experience">Experience</div>
        <div className="SearchContainer__filter__location">Location</div>
        <div className="SearchContainer__filter__more">More</div>
      </div>  
    )
  }
}