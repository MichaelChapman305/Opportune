import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

export default class RoleOptionsMenu extends Component {
  render() {
    return (
      <div className={this.props.className}>
        <a>Frontend</a>
        <a>Backend</a>
        <a>Fullstack</a>
      </div>
    )
  }
}

RoleOptionsMenu.propTypes = {
  className: PropTypes.string,
};
