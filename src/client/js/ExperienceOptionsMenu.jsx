import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

export default class ExperienceOptionsMenu extends Component {
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
        <a>Intern</a>
        <a>New Graduate</a>
        <a>Senior</a>
        <a>Management</a>
        <a>None</a>
      </div>
    );
  }
}

ExperienceOptionsMenu.propTypes = {
  className: PropTypes.string,
  addSearchToken: PropTypes.func,
  title: PropTypes.string,
};
