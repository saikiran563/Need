import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import IsInViewport from '../../util/InViewport'

import './BarGraph.css'

export default class BarGraph extends Component {
  static propTypes = {
    barValue: PropTypes.number.isRequired,
    barBaseValue: PropTypes.number.isRequired,
    barLabelText: PropTypes.string,
    barValueExplain: PropTypes.string,
    className: PropTypes.string,
  }

  static defaultProps = {
    baseValue: 100,
  }

  state = {
    visible: true,
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll)

    this.handleScroll()
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  }

  handleScroll = event => {
    if (!this.state.visible) {
      if (IsInViewport(this.bargraph)) {
        this.setState({
          visible: true,
        })
      }
    }
  }

  render() {
    const {
      barValue,
      barBaseValue,
      className,
      barLabelText,
      barValueExplain,
      bargraph,
      ...other
    } = this.props

    const props = {
      //Set the width of the bar when the bar component is visible
      widthValue: this.state.visible
        ? this.props.barValue / this.props.barBaseValue * 100 + '%'
        : '0%',
    }

    const labelElem = barLabelText ? (
      <h3 className="vz-odt--bargraph-label">{barLabelText}</h3>
    ) : null

    const labelLink = barValueExplain ? (
      <h3 className="vz-odt--bargraph-ValueExplain">{barValueExplain}</h3>
    ) : null

    //const valuebarColorCondition = (props.widthValue === '100%')?():null;

    return (
      <div
        className="vz-odt--bargraph"
        ref={div => {
          this.bargraph = div
        }}
      >
        {labelLink}
        {labelElem}
        <div className="vz-odt--bargraph-bar">
          <div
            className="vz-odt--bargraph-valuebar"
            style={{
              width: props.widthValue,
              borderBottomColor:
                props.widthValue === '100%' ? '#1BAD4C' : '#00BFFF',
            }}
          />
        </div>
      </div>
    )
  }
}
