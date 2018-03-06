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
      <div className="SubscriptionModal">
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


export default onClickOutside(SubscriptionModal);

SubscriptionModal.propTypes = {
  onToggleSubscription: PropTypes.func.isRequired,
};
