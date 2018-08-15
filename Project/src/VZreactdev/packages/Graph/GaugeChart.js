import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { TweenLite } from 'gsap'

import './GaugeChart.css'

export default class GaugeChart extends Component {
  static propTypes = {
    radius: PropTypes.number,
    angleRange: PropTypes.number,
    meterValue: PropTypes.number,
    baseArcStrokeColor: PropTypes.string,
    baseArcStrokeWidth: PropTypes.number,
    baseArcStrokeLinecap: PropTypes.string,

    meterArcStrokeColor: PropTypes.string,
    meterArcStrokeWidth: PropTypes.number,
    meterArcStrokeLinecap: PropTypes.string,
  }

  static defaultProps = {
    radius: 100,
    angleRange: 275,
    meterValue: 50,
    baseArcStrokeColor: '#999999',
    baseArcStrokeWidth: 5,
    baseArcStrokeLineCap: 'round',

    meterArcStrokeColor: '#666666',
    meterArcStrokeWidth: 5,
    meterArcStrokeLineCap: 'round',
  }

  static polarToCartesian = (radius, angleInDegrees) => {
    let angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0

    return {
      x: _centerX + radius * Math.cos(angleInRadians),
      y: _centerY + radius * Math.sin(angleInRadians),
    }
  }

  static describeArc = (radius, startAngle, endAngle) => {
    let start = polarToCartesian(radius, endAngle)
    let end = polarToCartesian(radius, startAngle)

    let largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1'

    let d = [
      'M',
      start.x,
      start.y,
      'A',
      radius,
      radius,
      0,
      largeArcFlag,
      0,
      end.x,
      end.y,
    ].join(' ')

    return d
  }

  static drawMeter = (newAngle, init) => {

    angle = newAngle._angle
    radians = angle / 180 * Math.PI

    meterSVGdesc = describeArc(
      radius - baseArcStrokeWidth,
      minAngle + 90,
      angle + 90
    )
  }

  render() {
    const {
      radius,
      angleRange,
      meterValue,
      baseArcStrokeColor,
      baseArcStrokeWidth,
      baseArcStrokeLinecap,

      meterArcStrokeColor,
      meterArcStrokeWidth,
      meterArcStrokeLinecap,

      meterSVGdesc,
    } = this.props

    const minAngle = (360 - angleRange) / 2 + 90

    const destAngle = minAngle + meterValue / 100 * angleRange
    const angle = minAngle % 360

   

    const radians = angle / 180 * Math.PI

    const width = (radius + baseArcStrokeWidth) * 2

    const centerX = width / 2
    const centerY = width / 2

    const baseArcClass = {
      fill: 'none',
      stroke: { baseArcStrokeColor },
      strokeWidth: { baseArcStrokeWidth },
      strokeLinecap: { baseArcStrokeLinecap },
      viewBox: '0 0 ' + { width } + ' ' + { width },
      xmlns: 'http://www.w3.org/2000/svg',
      width: { width },
      height: { width },
    }

    const meterArcClass = {
      fill: 'none',
      stroke: { meterArcStrokeColor },
      strokeWidth: { meterArcStrokeWidth },
      strokeLinecap: { meterArcStrokeLinecap },
      viewBox: '0 0 ' + { width } + ' ' + { width },
      xmlns: 'http://www.w3.org/2000/svg',
      width: { width },
      height: { width },
    }

    const objAngle = { _angle: angle }

    //console.log('TweenLite = ' + TweenLite);
    TweenLite.to(objAngle, 1, {
      _angle: this.destAngle,
      ease: Quad.easeOut,
      onUpdate: this.drawMeter,
      onUpdateParams: [objAngle],
      onUpdateScope: this,
    })
    /*
        */
    return (
      <div className="vz-odt--graph--gaugechat-container">
        <svg id="baseArc" className={baseArcClass} />
        <svg id="meterArc" className={meterArcClass} d={meterSVGdesc} />
        Test
      </div>
    )
  }
}
