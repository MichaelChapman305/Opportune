import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

export default class SearchFilter extends Component {
  constructor(props) {
    super(props);

    this.onClickFilter = this.onClickFilter.bind(this);
    this.onClickMenuOption = this.onClickMenuOption.bind(this);
  }

  onClickFilter(e) {
    const { setActiveFilter, title } = this.props;
    setActiveFilter(title);
  }

  onClickMenuOption(e) {
    const { addSearchToken, title } = this.props;
    addSearchToken(e.target.innerHTML, title);
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
        </button>
        {isMenuShown && 
          <div className="SearchFilter__menu">
          {optionsMenu.map(menuOption =>
            <a key={`${title}-${menuOption}`} onClick={this.onClickMenuOption}>
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
