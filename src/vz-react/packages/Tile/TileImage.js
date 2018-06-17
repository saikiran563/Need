import React from 'react'
import styled, { css } from 'styled-components'
import { media } from '../../util/style'

const TileImage = ({ image, visible, device }) => {
  const imageComp = image ? (
    <ImageWrapper device={device}>
      <Image src={image} visible={visible} device={device} />
    </ImageWrapper>
  ) : null
  return imageComp
}

const ImageWrapper = styled.figure`
  height: 100%;
  overflow: hidden;
  margin: auto 0 auto 1.25rem;
  ${props =>
    props.device &&
    `
   margin:0;
   paddind:0;
   overflow:none;
   
    `};
`
const Image = styled.img`
  margin-right: -1.5625rem;
  height: 21.1875rem;
  transition-duration: 600ms;
  transition-timing-function: ease-in-out;
  max-height: 19.0625rem;
  ${props =>
    props.device &&
    `
    margin-right: 10rem;
    height:18rem;
    width:10rem;
    `}
  ${props =>
    props.visible &&
    !props.device &&
    `
      color: #ffffff;
      margin-right: -1.5625rem;
    `}
  ${props =>
    !props.device &&
    media.tablet &&
    `
        max-height: 16.25rem;
    `}
  }
`
export default TileImage
