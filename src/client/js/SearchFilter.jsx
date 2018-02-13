import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

export default class SearchFilter extends Component {
  render() {
    return (
      <div className="SearchFilter">
        {this.props.title}
      </div>  
    )
  }
}

SearchFilter.propTypes = {
  title: PropTypes.string,
}