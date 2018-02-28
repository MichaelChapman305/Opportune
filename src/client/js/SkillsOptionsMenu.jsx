import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

export default class SkillsOptionsMenu extends Component {
  
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
        <a>Javascript</a>
        <a>PhP</a>
        <a>C++</a>
        <a>Javascript, Html5, css, React</a>
        <a>None</a>
      </div>
    )
  }
}

SkillsOptionsMenu.propTypes = {
  className: PropTypes.string,
  addSearchToken: PropTypes.func,
};