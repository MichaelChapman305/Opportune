import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

export default class ExperienceOptions extends Component {
  render() {
    return (
      <div className="dropDown">
        <a>Intern</a>
        <a>New Graduate</a>
        <a>Senior</a>
        <a>Management</a>
      </div>
    )
  }
}
