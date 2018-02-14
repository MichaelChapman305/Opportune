import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import '../css/style.scss';

import Header from './Header.jsx';
import SearchContainer from './SearchContainer.jsx';
import JobListingContainer from './JobListingContainer.jsx';

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: ''
    } 

    this.dropDownShown = this.dropDownShown.bind(this);
  }

  dropDownShown(e) {
  	if (e.target.title !== this.state.title) {
      this.setState({
        title: e.target.title
      })
    } else {
      this.setState({
      	title: ''
      })
    }
  }

  render() {
    return (
      <div className="app-container">
        <Header />
        <SearchContainer 
          dropDownShown={this.dropDownShown}
          title={this.state.title}
        />
        <JobListingContainer />
      </div>
    );
  }
}

ReactDOM.render(<Home />, document.getElementById('container'));
