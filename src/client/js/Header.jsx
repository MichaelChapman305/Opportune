import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

const Header = ({ onToggleSubscription }) => (
  <div className="Header">
    <h1 className="Header__title">Opportune</h1>
    <ul className="Header__items">
      <li>
        <a className="Header__button" onClick={onToggleSubscription}>Subscribe</a>
      </li>
      <li>
        <a className="Header__button" href="https://www.buymeacoffee.com/oZfAMy0mC" target="_blank">Donate</a>
      </li>
      <li>
        <a className="Header__button" href="mailto:hello@opportunecareers.com">Contact</a>
      </li>
    </ul>
  </div>
);

Header.propTypes = {
  onToggleSubscription: PropTypes.func.isRequired,
};

export default Header;
