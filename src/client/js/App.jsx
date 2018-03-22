import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import 'whatwg-fetch';

import '../css/style.scss';

import { JOBS_URI } from '../../shared/routes.js';
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

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      isSubscriptionModalShown: false,
      jobs: [],
      activeText: '',
      activeTokens: [],
    };

    this.onToggleSubscription = this.onToggleSubscription.bind(this);
    this.fetchJobs = this.fetchJobs.bind(this);
  }

  componentDidMount() {
    this.fetchJobs();
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { jobs, activeText, activeTokens } = this.state;

    if (jobs.length === 0 && nextState.jobs.length === 0) {
      if (activeText || activeTokens.length > 0) {
        return false;
      }
    }

    return true;
  }

  onToggleSubscription() {
    this.setState(
      prevState => ({
        isSubscriptionModalShown: !prevState.isSubscriptionModalShown,
      }),
      () => {
        if (this.state.isSubscriptionModalShown) {
          document.body.style.position = 'fixed';
        } else {
          document.body.style.position = '';
        }
      }
    );
  }

  fetchJobs(text = '', tokens = []) {
    this.setState({
      isLoading: true,
      activeText: text,
      activeTokens: tokens,
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

    const encodedSearchQuery = encodeURIComponent(JSON.stringify(searchQuery));
    const queryParam = text || tokens ? `?query=${encodedSearchQuery}` : '';

    return fetch(`${JOBS_URI}${queryParam}`)
      .then(res => res.json())
      .then(json => this.setState({ jobs: json, isLoading: false }));
  }

  render() {
    const { jobs, isLoading, isSubscriptionModalShown } = this.state;

    return (
      <div className="app-container">
        <Header onToggleSubscription={this.onToggleSubscription} />
        <SearchContainer fetchJobs={this.fetchJobs} />
        {isSubscriptionModalShown && (
          <div className="Subscription__overlay">
            <SubscriptionModal onToggleSubscription={this.onToggleSubscription} />
          </div>
        )}
        {jobs.length > 0 || isLoading ? (
          <JobListingContainer jobs={jobs} isLoading={isLoading} />
        ) : (
          <div className="no-results">
            <h1>No search results found.</h1>
            <h3>
              Can't find what you're looking for? Don't worry, we update our career listings every
              week!
            </h3>
          </div>
        )}
      </div>
    );
  }
}

ReactDOM.render(<Home />, document.getElementById('container'));
