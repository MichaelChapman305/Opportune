import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

export default class Header extends Component {
  render() {
  	return (
      <div className="Header">
        <p className="Header-title">Opportune</p>
        <div className="Header-subscribe-donate-container">
          <p className="Header-subscribe">Subscribe</p>
          <p className="Header-donate">Dontate</p>
        </div>
      </div>
  	)
  }
}