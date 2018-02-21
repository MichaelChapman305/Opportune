import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import 'whatwg-fetch';

import '../css/style.scss';

import Header from './Header.jsx';
import SearchContainer from './SearchContainer.jsx';
import JobListingContainer from './JobListingContainer.jsx';

const JOBS_URI = '/jobs/';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      jobs: [],
    }

    this.searchListings = this.searchListings.bind(this);
  }

  searchListings(query) {
    return fetch('/jobs?query=' + JSON.stringify({ text: query }))
      .then(res => res.json())
      .then(json => this.setState({ jobs: json }));
  }

  fetchJobs(query) {
    return fetch(JOBS_URI)
      .then(res => res.json())
      .then(json => this.setState({ jobs: json }));
  }

  componentDidMount() {
    this.fetchJobs();
  }

  render() {
    return (
      <div className="app-container">
        <Header />
        <SearchContainer 
          searchListings={this.searchListings}
        />
        <JobListingContainer jobs={this.state.jobs} />
      </div>
    );
  }
}

ReactDOM.render(<Home />, document.getElementById('container'));
