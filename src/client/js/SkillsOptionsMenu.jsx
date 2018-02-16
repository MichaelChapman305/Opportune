import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

export default class SkillsOptionsMenu extends Component {
  render() {
    return (
      <div className={this.props.className}>
        <a onClick={this.props.changeTitle}>Javascript</a>
        <a onClick={this.props.changeTitle}>PhP</a>
        <a onClick={this.props.changeTitle}>C++</a>
        <a onClick={this.props.changeTitle}>Javascript, Html5, css, React</a>
        <a onClick={this.props.changeTitle}>none</a>
      </div>
    )
  }
}

SkillsOptionsMenu.propTypes = {
  className: PropTypes.string,
};