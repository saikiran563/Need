import React, { Component } from 'react'
import PropTypes from 'prop-types'

import classNames from 'classnames'

import './CarouselIndicator.css'

import CarouselIndicatorBar from './CarouselIndicatorBar'

export default class CarouselIndicator extends Component {
  constructor(props) {
    super(props)
  }

  static propTypes = {
    className: PropTypes.string,
    numSlides: PropTypes.number,
    activeIndicatorIndex: PropTypes.number,
  }

  static defaultProps = {
    numSlides: 2,
  }

  state = {
    activeIndicatorIndex: this.props.activeIndicatorIndex || 0,
  }

  componentDidMount() {}

  componentWillUnmount() {}

  componentWillReceiveProps(props) {
    //console.log('activeIndicatorIndex: ' + props.activeIndicatorIndex);
    this.setState({
      activeIndicatorIndex: props.activeIndicatorIndex,
    })
  }

  render() {
    const {
      children,
      className,
      numSlides,
      activeIndicatorIndex,
      ...other
    } = this.props

    const props = {}

    const indicators = []

    const getIndicators = () => {
      for (var i = 0; i < numSlides; i++) {
        indicators[i] = {}
      }
      return indicators
    }

    const getActiveStatus = index => {
      if (index === this.state.activeIndicatorIndex) {
        return true
      } else {
        return false
      }
    }

    const bars = Object.keys(getIndicators()).map(function(key, i) {
      return (
        <CarouselIndicatorBar
          key={i}
          isActive={getActiveStatus(i)}
          ref={CarouselIndicatorBar => {
            indicators[i].ref = CarouselIndicatorBar
          }}
        />
      )
    })

    return (
      <div
        className={classNames({
          'vz-odt--carouselindicator-container': true,
          [this.props.className]: this.props.className,
        })}
      >
        {bars}
      </div>
    )
  }
}
