import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

export default class RoleOptionsMenu extends Component {

  constructor(props) {
    super(props);

    this.onAddToken = this.onAddToken.bind(this);
  }
  
  onAddToken(e) {
    const { addSearchToken, title } = this.props;
    addSearchToken(e.target.innerHTML, title);
  }

  render() {
    const { className } = this.props;

    return (
      <div className={className} onClick={this.onAddToken}>
        <a>Frontend</a>
        <a>Backend</a>
        <a>Fullstack</a>
        <a>None</a>
      </div>
    )
  }
}

RoleOptionsMenu.propTypes = {
  className: PropTypes.string,
  addSearchToken: PropTypes.func,
};
