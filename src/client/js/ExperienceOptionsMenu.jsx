import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

export default class ExperienceOptionsMenu extends Component {
  render() {
    console.log(this.props.showValue);
    return (
      <div className={this.props.className}>
        <a onClick={this.props.showValue}>Intern</a>
        <a>New Graduate</a>
        <a>Senior</a>
        <a>Management</a>
      </div>
    )
  }
}

ExperienceOptionsMenu.propTypes = {
  className: PropTypes.string,
  showValue: PropTypes.func.isRequired
}