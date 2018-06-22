import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import './Icon.css'

export default class Icon extends Component {
  static propTypes = {
    icon: PropTypes.object,
    className: PropTypes.string,
  }

  render() {
    const { icon, className, style, fill, ...other } = this.props

    const classname = this.props.className ? className : 'vz-odt--icon'

    const svgProps = {
      fill: fill,
      style: style,
      className: classname,
      title: icon.title,
      viewBox: icon.viewBox,
      xmlns: 'http://www.w3.org/2000/svg',
    }

    return <svg {...svgProps}>{icon.paths}</svg>
  }
}
