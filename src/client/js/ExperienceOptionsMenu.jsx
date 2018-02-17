import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

export default class ExperienceOptionsMenu extends Component {
  render() {
    const { changeTitle, className } = this.props;

    return (
      <div className={className} onClick={changeTitle}>
        <a>Intern</a>
        <a>New Graduate</a>
        <a>Senior</a>
        <a>Management</a>
        <a>None</a>
      </div>
    );
  }
}

ExperienceOptionsMenu.propTypes = {
  className: PropTypes.string,
  changeTitle: PropTypes.func.isRequired,
};
