import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

export default class SearchFilter extends Component {
  constructor(props) {
    super(props);

    this.toggleFilter = this.toggleFilter.bind(this);
  }

  toggleFilter(e) {
    const { onClickFilter, title } = this.props;
    onClickFilter(title);
  }

  render() {
    // To render a component that was passed as props, the component needs
    // to be PascalCase so "OptionsMenu" and not "optionsMenu"
    const { title, activeFilterTitle, optionsMenu: OptionsMenu } = this.props;
    const isMenuShown = activeFilterTitle === title;

    return (
      <div className="SearchFilter">
        <button
          className={'SearchFilter__button' + (isMenuShown ? ' SearchFilter__button--selected' : '')}
          onClick={this.toggleFilter}
        >
          {title}
        </button>
        {isMenuShown && 
          <OptionsMenu className="SearchFilter__menu" />
        }
      </div>
    );
  }
}

SearchFilter.propTypes = {
  title: PropTypes.string.isRequired,
  activeFilterTitle: PropTypes.string.isRequired,
  onClickFilter: PropTypes.func.isRequired,
  optionsMenu: PropTypes.func.isRequired,
};
