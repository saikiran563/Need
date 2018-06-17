import React, { Component } from 'react'
import PropTypes from 'prop-types'

import classNames from 'classnames'

import './CarouselIndicator.css'

export default class CarouselIndicatorBar extends Component {
  constructor(props) {
    super(props)
  }

  static propTypes = {
    className: PropTypes.string,
    isActive: PropTypes.bool,
  }

  static defaultProps = {
    isActive: false,
  }

  state = {
    active: this.props.isActive,
  }

  componentDidMount() {}

  componentWillUnmount() {}

  componentWillReceiveProps(props) {
    //console.log('isActive: ' + props.isActive);
    this.setState({
      active: props.isActive,
    })
  }

  render() {
    const { children, className, ...other } = this.props

    const props = {}

    return (
      <div
        className={classNames({
          'vz-odt--carouselindicator--bar': true,
          'is-active': this.state.active,
        })}
      />
    )
  }
}
