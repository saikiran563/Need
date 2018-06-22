import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './NavLogin.css'

export default class NavLogin extends Component {
  static propTypes = {
    children: PropTypes.node,
    username: PropTypes.string,
    language: PropTypes.string,
  }

  static defaultProps = {
    username: 'Michelle',
    language: 'Español',
  }

  state = {}

  render() {
    const { username, language } = this.props

    return (
      <span className="vz-odt--nav--login">
        <div className="vz-odt--nav--login--language">{language}</div>
        <div className="vz-odt--nav--login--user">Hi, {username}</div>
      </span>
    )
  }
}
