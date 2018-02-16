import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

export default class RoleOptionsMenu extends Component {
  render() {
    return (
      <div className={this.props.className}>
        <a onClick={this.props.changeTitle}>Frontend</a>
        <a onClick={this.props.changeTitle}>Backend</a>
        <a onClick={this.props.changeTitle}>Fullstack</a>
        <a onClick={this.props.changeTitle}>none</a>
      </div>
    )
  }
}

RoleOptionsMenu.propTypes = {
  className: PropTypes.string,
};
