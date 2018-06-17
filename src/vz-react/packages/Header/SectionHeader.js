import React, { Component, Children } from 'react'
import PropTypes from 'prop-types'
import './SectionHeader.css'

export default class SectionHeader extends Component {
  static propTypes = {}

  static defaultProps = {}

  render() {
    const {} = this.props

    return (
      <div
        className="vz-odt--header__section"
        aria-label={this.props.children}
        aria-hidden="false"
        tabIndex="0"
      >
        {this.props.children}

        <div className="vz-odt--header__section_highlight" />
      </div>
    )
  }
}
