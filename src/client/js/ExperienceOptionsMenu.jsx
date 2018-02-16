import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

export default class ExperienceOptionsMenu extends Component {
  render() {
    return (
      <div className={this.props.className}>
        <a onClick={this.props.changeTitle}>Intern</a>
        <a onClick={this.props.changeTitle}>New Graduate</a>
        <a onClick={this.props.changeTitle}>Senior</a>
        <a onClick={this.props.changeTitle}>Management</a>
        <a onClick={this.props.changeTitle}>none</a>
      </div>
    );
  }
}

ExperienceOptionsMenu.propTypes = {
  className: PropTypes.string,
  changeTitle: PropTypes.func.isRequired,
};
