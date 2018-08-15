import React from "react";
import styled from "styled-components";

class TestBlock extends React.Component {
  render() {
    return <Block />;
  }
}

const Block = styled.div`
  background-color: black;
  width: 100px;
  height: 100px;
`;

export default TestBlock;
