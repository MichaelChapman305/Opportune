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

  changeTitle(e) {
    const isOutsideHTML = e.target.innerHTML === 'None';

    this.setState({
      title: isOutsideHTML ? '' : e.target.innerHTML,
    }, this.props.onClickFilter(''));
  }

  toggleFilter(e) {
    console.log(this.state.activeFilterTitle);
    const { onClickFilter, defaultTitle } = this.props;
    onClickFilter(defaultTitle);
  }

  render() {
    // To render a component that was passed as props, the component needs
    // to be PascalCase so "OptionsMenu" and not "optionsMenu"
    const { defaultTitle, activeFilterTitle, optionsMenu: OptionsMenu } = this.props;
    const shouldShowMenu = activeFilterTitle === defaultTitle;

    return (
      <div className="SearchFilter">
        <button
          className={'SearchFilter__button' + (this.state.title && this.state.title !== 'None'  || this.props.activeFilterTitle === this.props.defaultTitle ? ' SearchFilter__button--selected' : '')}
          value="filterButton"
          onClick={this.toggleFilter}
        >
          {!this.state.title ? this.props.defaultTitle : this.state.title}
        </button>
        {shouldShowMenu && <OptionsMenu
          className="SearchFilter__menu"
          changeTitle={this.changeTitle}
        />}
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

