import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import 'whatwg-fetch';

import '../css/style.scss';

import Header from './Header.jsx';
import SearchContainer from './SearchContainer.jsx';
import JobListingContainer from './JobListingContainer.jsx';
import SubscriptionModal from './SubscriptionModal.jsx';

const JOBS_URI = '/jobs/';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      jobs: [],
      showSubscription: false,
    }

    this.onToggleSubscription = this.onToggleSubscription.bind(this);
    this.searchListings = this.searchListings.bind(this);
  }

   onToggleSubscription() {
    this.setState({
      showSubscription: !this.state.showSubscription
    });
  }

  searchListings(query) {
    console.log(query);
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
        <Header 
          onToggleSubscription={this.onToggleSubscription}
        />
        <SearchContainer 
          searchListings={this.searchListings}
        />
        {this.state.showSubscription && 
          <SubscriptionModal 
            onToggleSubscription={this.onToggleSubscription}
            showSubscription={this.state.showSubscription}
          />
        }
        {this.state.jobs.length === 0 ?
          <div className='no-results'>
            <h1>No search results found.</h1>
            <h3>How about trying <a>new graduate jobs in San Fransisco</a> or <a>roles at FinTech companies</a>?</h3>
          </div>
          :
          <JobListingContainer jobs={this.state.jobs} />
        }
      </div>
    );
  }
}

ReactDOM.render(<Home />, document.getElementById('container'));
