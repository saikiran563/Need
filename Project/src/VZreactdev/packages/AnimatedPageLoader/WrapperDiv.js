import React from "react";
import styled from "styled-components";
import IsInViewport from "vz-odt-utils/InViewport";
import { FadeInAnimation } from "./Animations";

class WrapperDiv extends React.Component {
  state = {
    aboveFold: true,
    pureAboveFold: true
  };

  handleScroll = event => {
    if (IsInViewport(this.domDiv)) {
      this.setState(prevState => ({
        aboveFold: true
      }));
      window.removeEventListener("scroll", this.handleScroll);
    }
  };

  componentDidMount() {
    let inViewport = IsInViewport(this.domDiv);
    this.setState(prevState => ({
      aboveFold: inViewport,
      pureAboveFold: inViewport
    }));

    window.addEventListener("scroll", this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  render() {
    return (
      <Wrapper
        innerRef={comp => (this.domDiv = comp)}
        aboveFold={this.state.aboveFold}
        animationDelay={this.props.animationDelay}
        pureAboveFold={this.state.pureAboveFold}
      >
        {this.props.children}
      </Wrapper>
    );
  }
}

const Wrapper = styled.div`
  ${props =>
    props.aboveFold && props.pureAboveFold
      ? FadeInAnimation(props => props.animationDelay + "s")
      : props.aboveFold ? FadeInAnimation(props => "0.3s") : null};
  ${props =>
    props.aboveFold ? `visibility: visible;` : `visibility: hidden;`};
`;

export default WrapperDiv;
