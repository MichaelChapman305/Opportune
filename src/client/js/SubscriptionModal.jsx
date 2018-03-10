import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import onClickOutside from 'react-onclickoutside';

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

    fetch('/subscribe', {
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
        <p>Get new weekly job listings delivered right to your inbox!</p>
        <form className="SubscriptionModal__form">
          <p>Email Address</p>
          <input name="email" type="text" className="SubscriptionModal__email"></input>
          <p>First Name</p>
          <input name="firstName" type="text" className="SubscriptionModal__firstName"></input>
          <p>Last Name</p>
          <input name="lastName" type="text" className="SubscriptionModal__lastName"></input>
          <button className="SubscriptionModal__submit" type="submit" value='subscription'>SUBSCRIBE</button>
        </form>
      </div>
    );
  }
}

SubscriptionModal.propTypes = {
  onToggleSubscription: PropTypes.func.isRequired,
};

export default onClickOutside(SubscriptionModal);
