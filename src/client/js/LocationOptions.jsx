import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

export default class LocationOptions extends Component {
  render() {
    return (
      <div className="dropDown">
        <a>NY</a>
        <a>Washington DC</a>
        <a>San Fran</a>
        <a>Chicago</a>
      </div>
    )
  }
}
