import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

export default class LocationOptionsMenu extends Component {
  render() {
    const { changeTitle, className } = this.props;

    return (
      <div className={className} onClick={changeTitle}>
        <a>NY</a>
        <a>Washington DC</a>
        <a>San Fran</a>
        <a>Chicago</a>
        <a>None</a>
      </div>
    )
  }
}

LocationOptionsMenu.propTypes = {
  className: PropTypes.string,
  changeTitle: PropTypes.func.isRequired,
};