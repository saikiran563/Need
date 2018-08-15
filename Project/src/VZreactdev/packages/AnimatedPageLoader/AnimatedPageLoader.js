import React from "react";
import styled from "styled-components";
import WrapperDiv from "./WrapperDiv";

class AnimatedPageLoader extends React.Component {
  wrapChildren = (children, delays) => {
    if (delays && React.Children.count(children) == delays.length) {
      return React.Children.map(children, (child, i) => {
        return <WrapperDiv animationDelay={delays[i]}>{child}</WrapperDiv>;
      });
    }
    return React.Children.map(children, (child, i) => {
      return <WrapperDiv animationDelay={i / 3}>{child}</WrapperDiv>;
    });
  };

  render() {
    return (
      <div>{this.wrapChildren(this.props.children, this.props.delays)} </div>
    );
  }
}

export default AnimatedPageLoader;
