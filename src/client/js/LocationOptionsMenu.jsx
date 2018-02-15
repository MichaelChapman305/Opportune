import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

export default class LocationOptionsMenu extends Component {
  render() {
    return (
      <div className={this.props.className}>
        <a>NY</a>
        <a>Washington DC</a>
        <a>San Fran</a>
        <a>Chicago</a>
      </div>
    )
  }
}

LocationOptionsMenu.propTypes = {
  className: PropTypes.string,
};