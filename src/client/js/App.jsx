import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import 'whatwg-fetch';

import '../css/style.scss';

import {
  EXPERIENCE_FILTER_TITLE,
  LOCATION_FILTER_TITLE,
  ROLE_FILTER_TITLE,
  SKILLS_FILTER_TITLE,
} from './searchConstants.js';

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
      isSubscriptionModalShown: false,
      jobs: [],
      text: '',
    };

    this.onToggleSubscription = this.onToggleSubscription.bind(this);
    this.fetchJobs = this.fetchJobs.bind(this);
  }

  onToggleSubscription() {
    this.setState(prevState => ({
      isSubscriptionModalShown: !prevState.isSubscriptionModalShown,
    }));
  }

  fetchJobs(text = '', tokens = []) {
    this.setState({
      isLoading: true,
      text,
    });

    const searchQuery = {
      experienceLevels: [],
      locations: [],
      roles: [],
      skills: [],
      text,
    };

    for (let i = 0, len = tokens.length; i < len; i++) {
      const token = tokens[i];

      if (token.type === EXPERIENCE_FILTER_TITLE) {
        searchQuery.experienceLevels.push(token.value);
      } else if (token.type === LOCATION_FILTER_TITLE) {
        searchQuery.locations.push(token.value);
      } else if (token.type === ROLE_FILTER_TITLE) {
        searchQuery.roles.push(token.value);
      } else if (token.type === SKILLS_FILTER_TITLE) {
        searchQuery.skills.push(token.value);
      }
    }

    const queryParam = (text || tokens) ? `?query=${JSON.stringify(searchQuery)}` : '';
    return fetch(`/jobs${queryParam}`)
      .then(res => res.json())
      .then(json => this.setState({ jobs: json, isLoading: false }));
  }

  componentDidMount() {
    this.fetchJobs();
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { jobs, text } = this.state;

    if (jobs.length === 0 && nextState.jobs.length === 0 && text.length > 0) {
      return false;
    }

    return true;
  }

  render() {
    const { jobs, isLoading, isSubscriptionModalShown } = this.state;

    return (
      <div className="app-container">
        <Header onToggleSubscription={this.onToggleSubscription} />
        <SearchContainer fetchJobs={this.fetchJobs} />
        {isSubscriptionModalShown &&
          <div>
            <div className="Subscription__overlay" />
            <SubscriptionModal onToggleSubscription={this.onToggleSubscription} />
          </div>
        }
        {jobs.length === 0 && !isLoading ?
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
