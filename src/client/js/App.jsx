import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import '../css/style.scss';

import Header from './Header.jsx';
import SearchComponent from './SearchComponent.jsx';
import JobListingContainer from './JobListingContainer.jsx';

class Home extends Component {
  render() {
  	return (
  	  <div className="container">
        <Header />
        <SearchComponent />
        <JobListingContainer />
  	  </div>
  	);
  }
}

ReactDOM.render(<Home />, document.getElementById('container'));