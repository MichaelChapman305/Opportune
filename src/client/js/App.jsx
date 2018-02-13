import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import '../css/style.scss';

import Header from './Header.jsx';
import SearchContainer from './SearchContainer.jsx';
import JobListingContainer from './JobListingContainer.jsx';

class Home extends Component {
  render() {
    return (
      <div className="app-container">
        <Header />
        <SearchContainer />
        <JobListingContainer />
      </div>
    );
  }
}

ReactDOM.render(<Home />, document.getElementById('container'));
