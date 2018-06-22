import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './NavSearchCart.css'
import { ICONS } from '../../Icon/Icon-assets'
import Icon from '../../Icon/Icon'

export default class NavSearchCart extends Component {
  static propTypes = {
    children: PropTypes.node,
    placeHolderText: PropTypes.string,
  }

  static defaultProps = {
    placeHolderText: 'Search',
  }

  state = {}

  render() {
    const { placeHolderText } = this.props

    return (
      <div className="vz-odt--nav--searchcart__container">
        <input
          aria-label="Search"
          className="vz-odt--nav--searchcart--search_input"
          placeholder={placeHolderText}
        />
        <div className="vz-odt--nav--searchcart--search__magnifier">
          <Icon
            icon={ICONS.MAGNIFIER}
            className="vz-odt--nav--searchcart--search__magnifier_icon"
          />
        </div>

        <Icon
          icon={ICONS.SHOPPING_CART}
          className="vz-odt--nav--searchcart--cart"
        />
      </div>
    )
  }
}
