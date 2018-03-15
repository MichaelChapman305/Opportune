import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import onClickOutside from 'react-onclickoutside';

import { SUBSCRIBE_URI } from '../../shared/routes.js';

class SubscriptionModal extends Component {
  constructor(props) {
    super(props);

    this.handleSubscription = this.handleSubscription.bind(this);
  }

  handleClickOutside(event) {
    this.props.onToggleSubscription();
  }

  handleSubscription(event) {
    const form = new FormData(event.target);

    fetch(SUBSCRIBE_URI, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: form.get('email'),
        firstName: form.get('firstName'),
        lastName: form.get('lastName'),
      }),
    })
  }

  render() {
    return (
      <div className="SubscriptionModal" onSubmit={this.handleSubscription}>
        <img
          className="SubscriptionModal__closeButton"
          src="./images/close-icon.svg"
          alt="Close modal button"
          onClick={this.props.onToggleSubscription}
        />
        <h1 className="SubscriptionModal__title">Find your new career.</h1>
        <p className="SubscriptionModal__description">Enter your information below and receive new job listings every week from the world's most talented technology companies.</p>
        <form className="SubscriptionModal__form">
          <label htmlFor="email">Email Address</label>
          <input name="email" type="text" className="SubscriptionModal__email"></input>
          <label htmlFor="firstName">First Name</label>
          <input name="firstName" type="text" className="SubscriptionModal__firstName"></input>
          <label htmlFor="lastName">Last Name</label>
          <input name="lastName" type="text" className="SubscriptionModal__lastName"></input>
          <button className="SubscriptionModal__submit" type="submit">Subscribe</button>
        </form>
      </div>
    );
  }
}

SubscriptionModal.propTypes = {
  onToggleSubscription: PropTypes.func.isRequired,
};

export default onClickOutside(SubscriptionModal);
