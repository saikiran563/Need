import React from 'react'
/*
import 'gsap/src/uncompressed/TimelineMax.js';
import 'gsap/src/uncompressed/TweenMax.js';
import 'scrollmagic/scrollmagic/uncompressed/ScrollMagic.js';
import 'scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap.js';
import 'scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators.js';

*/

import ScrollMagic from 'scrollmagic'
import 'scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators.js'

const withScrollAnimation = config => WrappedComponent => {
  const scrollController = new ScrollMagic.Controller()

  return class extends React.Component {
    componentDidMount() {
      const scene = new ScrollMagic.Scene({
        triggerElement: '#' + config.triggerId,
        triggerHook: 1.0,
        reverse: false,
        offset: config.offset || 0,
      })
        //.addIndicators({ name: config.triggerId }) /* debugging */
        .addTo(scrollController)
        .on('start', () => {
          if (config) {
            //console.log('starting: ', config.triggerId, this.props);
            this.props.onEnter && this.props.onEnter(config.triggerId)
          }
        })
    }

    componentWillUnmount() {
      scrollController.destroy()
    }

    render() {
      return <WrappedComponent {...this.props} />
    }
  }
}

export default withScrollAnimation
