import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import JobListing from './JobListing.jsx';

export default class JobListingContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      jobListings: [{company: 'Yelp', jobTitle: 'Software Engineering', position: 'intern', location: "Tyson's Corner, VA", key: 1}, {company: 'Yelp', jobTitle: 'Software Engineering', position: 'intern', location: "Tyson's Corner, VA", key: 1}],
      totalListings: 0
    }
  }

  componentDidMount() {
    this.setState({
      totalListings: this.state.jobListings.length
    });
  }

  /*
    Data retrieving API will go here
    Data will be placed in jobListings array
  */

  render() {
    return (
      <div className="JobListingContainer">
        <div className="JobListingContainer__info">
          <a>Showing {this.state.totalListings} jobs</a>
          <a>Sort by</a>
        </div>
        {this.state.jobListings.map((listing) => {
          return (
            <JobListing 
              //These are to be changed to the actual return values
              company={listing.company}
              jobTitle={listing.jobTitle}                
              position={listing.position}
              location={listing.location}
              key={listing.key}
            />
          );
        })}
      </div>
    );
  }
}
