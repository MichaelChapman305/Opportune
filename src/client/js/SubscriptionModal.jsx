import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import onClickOutside from 'react-onclickoutside';

import { SUBSCRIBE_URI } from '../../shared/routes.js';

const ERROR_MEMBER_EXISTS = 'Member Exists';
const ERROR_INVALID_RESOURCE = 'Invalid Resource';

class SubscriptionModal extends Component {
  constructor(props) {
    super(props);

    this.textInput = null;
    this.state = {
      fieldError: false,
    };

    this.handleSubscription = this.handleSubscription.bind(this);
  }

  handleClickOutside(event) {
    this.props.onToggleSubscription();
  }

  handleSubscription(event) {
    event.preventDefault();
    const form = new FormData(event.target);

    return fetch(SUBSCRIBE_URI, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        email: form.get('email'),
        firstName: form.get('firstName'),
        lastName: form.get('lastName'),
      }),
    })
      .then(res => res.json())
      .then(json => {
        if (json.error === ERROR_MEMBER_EXISTS || json.error === ERROR_INVALID_RESOURCE) {
          this.setState({
            fieldError: json.error,
          });
        }
      });
  }

  render() {
    const { fieldError } = this.state;

    let error = '';

    if (fieldError === ERROR_MEMBER_EXISTS) {
      error = 'This email is already subscribed to our service';
    } else if (
      fieldError === ERROR_INVALID_RESOURCE &&
      this.firstNameInput.value.length > 0 &&
      this.lastNameInput.value.length > 0
    ) {
      error = 'Please enter a valid email address.';
    } else if (fieldError === ERROR_INVALID_RESOURCE && this.emailInput.value.length === 0) {
      error = 'Please enter your email address.';
    }

    return (
      <div className="SubscriptionModal" onSubmit={this.handleSubscription}>
        <img
          className="SubscriptionModal__closeButton"
          src="./images/close-icon.svg"
          alt="Close modal button"
          onClick={this.props.onToggleSubscription}
        />
        <h1 className="SubscriptionModal__title">Find your new career.</h1>
        <p className="SubscriptionModal__description">
          Enter your information below and receive new job listings every week from the world's most
          talented technology companies.
        </p>
        <form className="SubscriptionModal__form">
          <label htmlFor="email">Email Address</label>
          <input
            name="email"
            type="text"
            className="SubscriptionModal__email"
            ref={input => (this.emailInput = input)}
          />
          {error.length > 0 && <p className="SubscriptionModal__errorMessage">{error}</p>}
          <label htmlFor="firstName">First Name</label>
          <input
            name="firstName"
            type="text"
            className="SubscriptionModal__firstName"
            ref={input => (this.firstNameInput = input)}
          />
          {fieldError === ERROR_INVALID_RESOURCE &&
            this.firstNameInput.value.length === 0 && (
              <p className="SubscriptionModal__errorMessage">Please enter your first name.</p>
            )}
          <label htmlFor="lastName">Last Name</label>
          <input
            name="lastName"
            type="text"
            className="SubscriptionModal__lastName"
            ref={input => (this.lastNameInput = input)}
          />
          {fieldError === ERROR_INVALID_RESOURCE &&
            this.lastNameInput.value.length === 0 && (
              <p className="SubscriptionModal__errorMessage">Please enter your last name.</p>
            )}
          <button className="SubscriptionModal__submit" type="submit">
            Subscribe
          </button>
        </form>
      </div>
    );
  }
}

SubscriptionModal.propTypes = {
  onToggleSubscription: PropTypes.func.isRequired,
};

export default onClickOutside(SubscriptionModal);
