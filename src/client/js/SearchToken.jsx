import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

export default class SearchToken extends Component {
  constructor(props) {
    super(props);

    this.onRemoveToken = this.onRemoveToken.bind(this);
  }

  onRemoveToken() {
    const { value, removeSearchToken } = this.props;
    removeSearchToken(value);
  }

  render() {
  	return (
      <div className="SearchToken">
        <p>{this.props.value}</p>
        <img src="./images/close-icon.svg" alt="remove icon" onClick={this.onRemoveToken}/>
      </div>
  	);
  }
}

SearchToken.propTypes = {
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  removeSearchToken: PropTypes.func.isRequired,
};
