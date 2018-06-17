import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './Nav.css'
import { ICONS } from '../Icon/Icon-assets'
import Icon from '../Icon/Icon'
import NavSearchCart from './SearchCart/NavSearchCart'
import NavLogin from './Login/NavLogin'
import NavGlobalNav from './GlobalNav/NavGlobalNav'
import MainNav from './MainNav/MainNav'

export default class Nav extends Component {
  static propTypes = {
    children: PropTypes.node,
    username: PropTypes.string,
  }

  static defaultProps = {
    username: 'Michelle',
  }

  state = {}

  render() {
    const { username } = this.props

    return (
      <nav>
        <div className="vz-odt--global-nav__container">
          <div className="vz-odt--nav">
            <div className="vz-odt--nav--logo">
              <Icon icon={ICONS.VZ_LOGO} className="vz-odt--nav--logo__icon" />
            </div>
            <div className="vz-odt--nav__wrapper">
              <NavGlobalNav />
              <div className="vz-odt--nav--searchcart-login__container">
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                  }}
                >
                  <NavSearchCart />
                  <div className="vz-odt--nav--mobile-menu">
                    <Icon
                      icon={ICONS.MENU}
                      className="vz-odt--nav--mobile-menu__icon"
                    />
                  </div>
                </div>
                <NavLogin username={username} />
              </div>
            </div>
          </div>
        </div>
        <MainNav />
      </nav>
    )
  }
}
