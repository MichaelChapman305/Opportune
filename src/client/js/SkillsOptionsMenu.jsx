import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

export default class SkillsOptionsMenu extends Component {
  render() {
    const { changeTitle, className } = this.props;

    return (
      <div className={className}>
        <a>Javascript</a>
        <a>PhP</a>
        <a>C++</a>
        <a>Javascript, Html5, css, React</a>
        <a>None</a>
      </div>
    )
  }
}

SkillsOptionsMenu.propTypes = {
  className: PropTypes.string,
};