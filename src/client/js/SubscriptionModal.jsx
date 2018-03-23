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

    this.state = {
      fieldError: '',
      emailText: '',
      firstNameText: '',
      lastNameText: '',
    };

    this.handleSubscription = this.handleSubscription.bind(this);
    this.updateEmail = this.updateEmail.bind(this);
    this.updateFirstName = this.updateFirstName.bind(this);
    this.updateLastName = this.updateLastName.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (!this.state.fieldError && nextState.fieldError) {
      return true;
    }

    return false;
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.fieldError) {
      this.setState({
        fieldError: '',
      });
    }
  }

  handleClickOutside(event) {
    this.props.onToggleSubscription();
  }

  updateEmail(event) {
    this.setState({
      emailText: event.target.value,
    });
  }

  updateFirstName(event) {
    this.setState({
      firstNameText: event.target.value,
    });
  }

  updateLastName(event) {
    this.setState({
      lastNameText: event.target.value,
    });
  }

  handleSubscription(event) {
    const { emailText, firstNameText, lastNameText } = this.state;
    event.preventDefault();

    fetch(SUBSCRIBE_URI, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        email: emailText || null,
        firstName: firstNameText || null,
        lastName: lastNameText || null,
      }),
    })
      .then(res => res.json())
      .then(json => {
        if (json.error === ERROR_MEMBER_EXISTS || json.error === ERROR_INVALID_RESOURCE) {
          this.setState({
            fieldError: json.error,
          });
        } else {
          this.props.onToggleSubscription();
        }
      });
  }

  render() {
    const { fieldError, emailText, firstNameText, lastNameText } = this.state;

    let error = '';

    if (fieldError === ERROR_MEMBER_EXISTS) {
      error = 'This email is already subscribed to our service.';
    } else if (fieldError === ERROR_INVALID_RESOURCE && firstNameText && lastNameText) {
      error = 'Please enter a valid email address.';
    } else if (fieldError === ERROR_INVALID_RESOURCE && !emailText) {
      error = 'Please enter your email address.';
    }

    return (
      <div className="SubscriptionModal">
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
            onChange={this.updateEmail}
          />
          {error && <p className="SubscriptionModal__errorMessage">{error}</p>}
          <label htmlFor="firstName">First Name</label>
          <input
            name="firstName"
            type="text"
            className="SubscriptionModal__firstName"
            onChange={this.updateFirstName}
          />
          {fieldError === ERROR_INVALID_RESOURCE &&
            !firstNameText && (
              <p className="SubscriptionModal__errorMessage">Please enter your first name.</p>
            )}
          <label htmlFor="lastName">Last Name</label>
          <input
            name="lastName"
            type="text"
            className="SubscriptionModal__lastName"
            onChange={this.updateLastName}
          />
          {fieldError === ERROR_INVALID_RESOURCE &&
            !lastNameText && (
              <p className="SubscriptionModal__errorMessage">Please enter your last name.</p>
            )}
          <button
            className="SubscriptionModal__submit"
            type="submit"
            onClick={this.handleSubscription}
          >
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
