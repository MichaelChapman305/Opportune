import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

export default class Header extends Component {
  render() {
    return (
      <div className="Header">
        <h1 className="Header__title">Opportune</h1>
        <div>
          <a className="Header__button Header__button--subscribe">Subscribe</a>
          <a className="Header__button">Donate</a>
        </div>
      </div>
    )
  }
}