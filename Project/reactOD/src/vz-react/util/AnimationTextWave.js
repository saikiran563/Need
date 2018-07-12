import React, { Component } from 'react'
import styled, { keyframes, css } from 'styled-components'

export default class AnimationTextWave extends Component {
  render() {
    const words = React.Children.map(this.props.children, (child, i) => {
      let delay = i / 9
      if (this.props.initialDelay) {
        delay = this.props.initialDelay + delay
        console.log('delay: ' + delay)
      }
      return <AnimatedWord delay={delay}>{child}</AnimatedWord>
    })

    return <Wrapper>{words}</Wrapper>
  }
}
//let delay = -1;
const Wrapper = styled.div`
  overflow: hidden;
`

const AnimatedWord = styled.div`
                    &::after {
                        content: " ";
                        white-space: pre;
                    }
                    float: left;
                    -webkit-animation-name: slideInUp;
                    animation-name: slideInUp;
                    -webkit-animation-duration: 0.75s;
                    animation-duration: 0.75s;
                    animation-delay: ${props => props.delay}s;
                    -webkit-animation-fill-mode: both;
                    animation-fill-mode: both;
                    }
                    @-webkit-keyframes slideInUp {
                    0% {
                    -webkit-transform: translateY(100%);
                    transform: translateY(100%);
                    visibility: visible;
                    }
                    100% {
                    -webkit-transform: translateY(0);
                    transform: translateY(0);
                    }
                    }
                    @keyframes slideInUp {
                    0% {
                    -webkit-transform: translateY(100%);
                    transform: translateY(100%);
                    visibility: visible;
                    }
                    100% {
                    -webkit-transform: translateY(0);
                    transform: translateY(0);
                    }
`
