import React, { Component } from "react";
import styled, { keyframes, css } from "styled-components";

export default class AnimationTextRise extends Component {
  render() {
    const words = React.Children.map(this.props.children, (child, i) => {
      let delay = 0;
      if (this.props.customDelay) {
        delay = this.props.customDelay;
      }
      return <AnimatedLine delay={delay}>{child}</AnimatedLine>;
    });

    return <Wrapper>{words}</Wrapper>;
  }
}

const Wrapper = styled.div`overflow: hidden;`;

const AnimatedLine = styled.div`
                    &::after {
                        content: " ";
                        white-space: pre;
                    }
                    float: left;
                    -webkit-animation-name: slideInUp;
                    animation-name: slideInUp;
                    -webkit-animation-duration: 0.2s;
                    animation-duration: 0.2s;
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
`;
