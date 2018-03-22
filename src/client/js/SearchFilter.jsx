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
    const target = event.target;

    if (!target || !target.className) {
      return;
    }

    const isFilter =
      target.className.indexOf('SearchFilter__button') > -1 || target.className instanceof SVGAnimatedString;
    const isFilterMenu = target.parentElement.className === 'SearchFilter__menu';

    if (!isFilter && !isFilterMenu) {
      console.log(event.target.className);
      console.log(event.target.className === 'SearchFilter__button SearchFilter__button--selected');
      this.props.setActiveFilter('');
    }
  }

  render() {
    const { title, activeFilterTitle, optionsMenu } = this.props;
    const isMenuShown = activeFilterTitle === title;

    return (
      <div className="SearchFilter">
        <button
          className={`SearchFilter__button${isMenuShown ? ' SearchFilter__button--selected' : ''}`}
          onClick={this.onClickFilter}
        >
          {title}
          <Arrow fill={isMenuShown ? '#ffffff' : '#484848'} isExpanded={isMenuShown} />
        </button>
        {isMenuShown && (
          <ul className="SearchFilter__menu">
            {optionsMenu.map(menuOption => (
              <li key={`${title}-${menuOption}`} onClick={this.onClickMenuOption}>
                {menuOption}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
}

SearchFilter.propTypes = {
  title: PropTypes.string.isRequired,
  activeFilterTitle: PropTypes.string.isRequired,
  setActiveFilter: PropTypes.func.isRequired,
  addSearchToken: PropTypes.func.isRequired,
  optionsMenu: PropTypes.array.isRequired,
};
