import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

const Arrow = ({ fill, isExpanded }) => (
  <svg
    className={'Arrow' + (isExpanded ? ' Arrow--selected' : '')}
    fill={fill}
    viewBox="0 0 404.257 404.257"
  >
   <polygon points="386.257,114.331 202.128,252.427 18,114.331 0,138.331 202.128,289.927 404.257,138.331 "/>
  </svg>
);

Arrow.propTypes = {
  fill: PropTypes.string.isRequired,
  isExpanded: PropTypes.bool,
};

Arrow.defaultProps = {
  isExpanded: false,
};

export default Arrow;