import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

export default class RoleOptionsMenu extends Component {
  render() {
    const { changeTitle, className } = this.props;

    return (
      <div className={className}>
        <a>Frontend</a>
        <a>Backend</a>
        <a>Fullstack</a>
        <a>None</a>
      </div>
    )
  }
}

RoleOptionsMenu.propTypes = {
  className: PropTypes.string,
};
