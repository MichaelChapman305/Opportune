import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

export default class LocationOptionsMenu extends Component {
  render() {
    return (
      <div className={this.props.className}>
        <a onClick={this.props.changeTitle}>NY</a>
        <a onClick={this.props.changeTitle}>Washington DC</a>
        <a onClick={this.props.changeTitle}>San Fran</a>
        <a onClick={this.props.changeTitle}>Chicago</a>
        <a onClick={this.props.changeTitle}>none</a>
      </div>
    )
  }
}

LocationOptionsMenu.propTypes = {
  className: PropTypes.string,
};