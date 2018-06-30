import React, { Component } from 'react'
import styled from 'styled-components'

import loadingIcon from '../../assets/images/loading.gif'

const Loader = () => {
  return (
    <StyledLoader>
      <img src={loadingIcon} alt="loading spinner" />
    </StyledLoader>
  )
}

const StyledLoader = styled.div`
  padding: 0 1.125rem;
  max-width: 79.5rem;
  margin: 0rem auto 1.725rem auto;

  & > img {
    height: 100px;
    z-index: 9001;
  }
`

export default Loader
