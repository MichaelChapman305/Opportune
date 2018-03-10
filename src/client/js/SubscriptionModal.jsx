import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import onClickOutside from 'react-onclickoutside';

class SubscriptionModal extends Component {
  handleClickOutside(event){
    this.props.onToggleSubscription();
  }

  render() {
    return (
      <div className="SubscriptionModal" onSubmit={this.props.handleSubscription}>
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

export default onClickOutside(SubscriptionModal);

SubscriptionModal.propTypes = {
  onToggleSubscription: PropTypes.func.isRequired,
  handleSubscription: PropTypes.func.isRequired,
};
