import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import Arrow from './Arrow.jsx';

export default class SearchFilter extends Component {
  constructor(props) {
    super(props);

    this.onClickFilter = this.onClickFilter.bind(this);
    this.onClickMenuOption = this.onClickMenuOption.bind(this);
  }

  onClickFilter(event) {
    const { setActiveFilter, title } = this.props;
    setActiveFilter(title);
  }

  onClickMenuOption(event) {
    const { addSearchToken, title } = this.props;
    addSearchToken(event.target.innerHTML, title);
  }

  handleClickOutside(event) {
    if (event.target.className !== 'SearchFilter__button' && event.target.className.animVal !== 'Arrow' && event.target.type !== 'a') {
      this.props.setActiveFilter('');
    }
  }

  render() {
    const { title, activeFilterTitle, optionsMenu } = this.props;
    const isMenuShown = activeFilterTitle === title;

    return (
      <div className="SearchFilter">
        <button
          className={'SearchFilter__button' + (isMenuShown ? ' SearchFilter__button--selected' : '')}
          onClick={this.onClickFilter}
        >
          {title}
          <Arrow fill={isMenuShown ? '#ffffff' : '#484848'} isExpanded={isMenuShown}></Arrow>
        </button>
        {isMenuShown && 
          <div className="SearchFilter__menu">
          {optionsMenu.map(menuOption =>
            <a type='a' key={`${title}-${menuOption}`} onClick={this.onClickMenuOption}>
              {menuOption}
            </a>
          )}
          </div>
        }
      </div>
    );
  }
}

SearchFilter.propTypes = {
  title: PropTypes.string.isRequired,
  activeFilterTitle: PropTypes.string.isRequired,
  setActiveFilter: PropTypes.func.isRequired,
  addSearchToken: PropTypes.func.isRequired,
};
