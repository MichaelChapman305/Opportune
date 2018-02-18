import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

export default class SearchFilter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
    };

    this.changeTitle = this.changeTitle.bind(this);
    this.toggleFilter = this.toggleFilter.bind(this);
  }

  getFilterTitle() {
    const { title } = this.state;

    return title ? title : this.props.defaultTitle;
  }

  changeTitle(e) {
    const isOutsideHTML = e.target.innerHTML === 'None';

    this.setState({
      title: isOutsideHTML ? '' : e.target.innerHTML,
    }, this.props.onClickFilter(''));
  }

  toggleFilter(e) {
    const { onClickFilter } = this.props;
    const filterTitle = this.getFilterTitle();

    onClickFilter(filterTitle);
  }

  render() {
    // To render a component that was passed as props, the component needs
    // to be PascalCase so "OptionsMenu" and not "optionsMenu"
    const { activeFilterTitle, optionsMenu: OptionsMenu } = this.props;
    const { title } = this.state;

    const filterTitle = this.getFilterTitle();
    const isMenuShown = activeFilterTitle === filterTitle;
    const isItemSelected = (title && title !== 'None') || isMenuShown;

    return (
      <div className="SearchFilter">
        <button
          className={'SearchFilter__button' + (isItemSelected ? ' SearchFilter__button--selected' : '')}
          value="filterButton"
          onClick={this.toggleFilter}
        >
          {filterTitle}
        </button>
        {isMenuShown && 
          <OptionsMenu className="SearchFilter__menu" changeTitle={this.changeTitle} />
        }
      </div>
    );
  }
}

SearchFilter.propTypes = {
  defaultTitle: PropTypes.string.isRequired,
  activeFilterTitle: PropTypes.string.isRequired,
  onClickFilter: PropTypes.func.isRequired,
  optionsMenu: PropTypes.func.isRequired,
};
