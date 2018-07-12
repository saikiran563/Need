import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Wrapper = styled.div`
  min-height: 100vh;
  font-family: NeueHaasGroteskText;

  p {
    font-family: NeueHaasGroteskDisplayBold;
  }
`

const Main = ({ children }) => (
  <Wrapper>
    <main>{children}</main>
  </Wrapper>
)

Main.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Main
