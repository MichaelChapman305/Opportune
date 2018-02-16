import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import '../css/style.scss';

import Header from './Header.jsx';
import SearchContainer from './SearchContainer.jsx';
import JobListingContainer from './JobListingContainer.jsx';

class Home extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="app-container" onClick={this.hideFilter}>
        <Header />
        <SearchContainer />
        <JobListingContainer />
      </div>
    );
  }
}

ReactDOM.render(<Home />, document.getElementById('container'));
