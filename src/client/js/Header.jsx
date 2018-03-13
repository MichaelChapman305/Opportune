import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

export default class Header extends Component {
  render() {
    return (
      <div className="Header">
        <h1 className="Header__title">Opportune</h1>
        <ul className="Header__items">
          <li>
            <a className="Header__button" onClick={this.props.onToggleSubscription}>Subscribe</a>
          </li>
          <li>
            <a className="Header__button">Donate</a>
          </li>
          <li>
            <a className="Header__button" href="mailto:hello@opportunecareers.com">Contact</a>
          </li>
        </ul>
      </div>
    )
  }
}

Header.propTypes = {
  onToggleSubscription: PropTypes.func.isRequired,
};
