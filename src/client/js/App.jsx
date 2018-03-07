import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import 'whatwg-fetch';

import '../css/style.scss';

import Header from './Header.jsx';
import SearchContainer from './SearchContainer.jsx';
import JobListingContainer from './JobListingContainer.jsx';
import SubscriptionModal from './SubscriptionModal.jsx';

const JOBS_URI = '/jobs';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      jobs: [],
      showSubscription: false,
      text: '',
    };

    this.onToggleSubscription = this.onToggleSubscription.bind(this);
    this.fetchJobs = this.fetchJobs.bind(this);
  }

  onToggleSubscription() {
    this.setState({ showSubscription: !this.state.showSubscription });
  }

  fetchJobs(text = '', tokens = []) {
    this.setState({
      isLoading: true,
      text: text,
    });
    
    const searchFilter = {
      experienceLevels: [],
      locations: [],
      roles: [],
      skills: [],
      text: text,
    };

    for (let i = 0, len = tokens.length; i < len; i++) {
      const token = tokens[i];

      if (token.type === 'Experience') {
        searchFilter.experienceLevels.push(token.value);
      } else if (token.type === 'Location') {
        searchFilter.locations.push(token.value);
      } else if (token.type === 'Role') {
        searchFilter.roles.push(token.value);
      } else if (token.type === 'Skills') {
        searchFilter.skills.push(token.value);
      }
    }

    if (text || tokens) {
      return fetch(`/jobs?query=${JSON.stringify( searchFilter )}`)
        .then(res => res.json())
        .then(json => this.setState({ jobs: json, isLoading: false }));
    }
    return fetch(JOBS_URI)
      .then(res => res.json())
      .then(json => this.setState({ jobs: json, isLoading: false }));   
  }

  componentDidMount() {
    this.fetchJobs();
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.jobs.length === 0 && nextState.jobs.length === 0 && this.state.text.length > 0) {
      return false;
    } 
    
    return true;
  }

  render() {
    return (
      <div className="app-container">
        <Header
          onToggleSubscription={this.onToggleSubscription}
        />
        <SearchContainer fetchJobs={this.fetchJobs} />
        {this.state.showSubscription && 
          <div>
            <div className="Subscription__overlay"></div>
            <SubscriptionModal
              onToggleSubscription={this.onToggleSubscription}
            />
          </div>
        }
        {this.state.jobs.length === 0 && !this.state.isLoading ?
          <div className="no-results">
            <h1>No search results found.</h1>
            <h3>How about trying <a>new graduate jobs in San Fransisco</a> or <a>roles at FinTech companies</a>?</h3>
          </div>
          :
          <JobListingContainer 
            jobs={this.state.jobs} 
            isLoading={this.state.isLoading}
          />
        }
      </div>
    );
  }
}

ReactDOM.render(<Home />, document.getElementById('container'));
