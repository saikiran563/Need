import React from 'react'
import styled, { keyframes } from 'styled-components'
import { ScaleDownFadeInAnimation } from './TileAnimations'

const loadingImage =
  "'data:image/png;base64,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'"

const FullScreenImage = ({ fullscreenImage, visible, loading, device }) => {
  let fullscreenImageComp = fullscreenImage ? (
    <Wrapper device={device}>
      {fullscreenImage && (
        <Img
          device={device}
          src=""
          fullscreenImage={`url(${fullscreenImage})`}
        />
      )}
    </Wrapper>
  ) : null

  if (!fullscreenImageComp && loading) {
    fullscreenImageComp = (
      <Wrapper device={device}>
        <Img device={device} src="" fullscreenImage={`url(${loadingImage})`} />
      </Wrapper>
    )
  }

  return fullscreenImageComp
}
const Wrapper = styled.div`
  position: absolute;
  overflow: hidden;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  ${props =>
    props.device &&
    `
     background-color: #F6F6F6;
    `};
`

const Img = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  transform: scale(1.3);
  opacity: 0;
  background-position: center;
  background-size: 95% 95%;
  background-image: ${props => props.fullscreenImage};
  ${props =>
    props.device &&
    `
      right: 5rem;
      top: 5rem;
    `};
  ${ScaleDownFadeInAnimation()};
`

export default FullScreenImage
