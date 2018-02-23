import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

export default class SubscriptionModal extends Component {
  constructor(props) {
    super(props);

    this.onSubscriptionClick = this.onSubscriptionClick.bind(this);
  }

  onSubscriptionClick(e) {
    if (e.target.className === 'SubscriptionModal') {
      this.props.onToggleSubscription();
    }
  }

  render() {
    return (
      <div className="SubscriptionModal" onClick={this.onSubscriptionClick}>
        <p>Get new weekly job listings delivered right to your inbox!</p>
        <form className="SubscriptionModal__form">
          <p>Email Address</p>
          <input className="SubscriptionModal__email"></input>
          <p>First Name</p>
          <input className="SubscriptionModal__firstName"></input>
          <p>Last Name</p>
          <input className="SubscriptionModal__lastName"></input>
          <div className="SubscriptionModal__submit" type="submit" value='subscription'><h4>SUBSCRIBE</h4></div>
        </form>
      </div>
    );
  }
}