import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import '../css/style.scss';

import Header from './Header';
import SearchContainer from './SearchContainer';
import JobListingContainer from './JobListingContainer';

class Home extends Component {
  render() {
    return (
      <div className="container">
        <Header />
        <SearchContainer />
        <JobListingContainer />
      </div>
    );
  }
}

ReactDOM.render(<Home />, document.getElementById('container'));
