import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

export default class SkillsOptions extends Component {
  render() {
    return (
      <div className="dropDown">
        <a>Javascript</a>
        <a>PhP</a>
        <a>C++</a>
        <a>Javascript, Html5, css, React</a>
      </div>
    )
  }
}
