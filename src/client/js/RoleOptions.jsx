import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

export default class RoleOptions extends Component {
  render() {
    return (
      <div className="dropDown">
        <a>Frontend</a>
        <a>Backend</a>
        <a>Fullstack</a>
      </div>
    )
  }
}
