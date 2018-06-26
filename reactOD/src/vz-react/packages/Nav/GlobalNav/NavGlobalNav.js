import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './NavGlobalNav.css'

export default class NavGlobalNav extends Component {
  static propTypes = {}

  static defaultProps = {}

  state = {}

  render() {
    const {} = this.props

    return (
      <div className="vz-odt--nav--globalnav">
        <div className="vz-odt--nav--globalnav--mainnav">
          <div>Wireless</div>
          <div style={{ color: '#747676' }}>In Home</div>
          <div style={{ color: '#747676' }}>Business</div>
        </div>
        <div className="vz-odt--nav--globalnav--subnav">
          <div>Phones</div>
          <div>Plans</div>
          <div>Deals</div>
          <div>Shop</div>
          <div>Support</div>
        </div>
      </div>
    )
  }
}
