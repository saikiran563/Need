import React from 'react'
import styled, { css } from 'styled-components'

const TileReduced = ({ children }) => {
  return (
    <StyledTileReduced style={{ padding: '1rem' }}>
      <StyledSpan>{children}</StyledSpan>
      <StyledDiv />
    </StyledTileReduced>
  )
}

const StyledTileReduced = styled.div`
  padding: 1rem;
`
const StyledSpan = styled.span`
  width: 13.1875rem;
  height: 1.9rem;
  object-fit: contain;
  font-family: NHaasGroteskDSStd-55Rg;
  font-size: 1rem;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.9;
  letter-spacing: normal;
  text-align: left;
  color: #000000;
`

const StyledDiv = styled.div`
  height: 1px;
  object-fit: contain;
  opacity: 0.5;
  background-color: #000000;
  margin-top: 1rem;
`

export default TileReduced
