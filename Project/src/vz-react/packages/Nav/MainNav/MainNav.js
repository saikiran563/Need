import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './MainNav.css'
import Button from '../../Button/Button'

export default class MainNav extends Component {
  static propTypes = {}

  static defaultProps = {}

  state = {}

  render() {
    const {} = this.props

    return (
      <div className="vz-odt--mainnav__container">
        <div className="vz-odt--mainnav">
          <Button disabled="true" kind={Button.BUTTON_TYPE.NAV_MAIN}>
            My Home
          </Button>
          <Button kind={Button.BUTTON_TYPE.NAV_MAIN}>Bill</Button>
          <Button kind={Button.BUTTON_TYPE.NAV_MAIN}>Data Hub</Button>
          <Button kind={Button.BUTTON_TYPE.NAV_MAIN}>Account</Button>
          <Button kind={Button.BUTTON_TYPE.NAV_MAIN}>Devices</Button>
          <Button kind={Button.BUTTON_TYPE.NAV_MAIN}>Verizon Up</Button>
        </div>
      </div>
    )
  }
}
