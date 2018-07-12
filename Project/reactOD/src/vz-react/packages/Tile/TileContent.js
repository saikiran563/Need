import React from 'react'
import styled, { css } from 'styled-components'
import { media } from '../../util/style'

const TileContent = ({
  children,
  trendingMode,
  alertMode,
  image,
  alertCopyHeading,
  lightMode,
  isCarousel,
  device,
}) => {
  const alertCopyHeadingComp = alertCopyHeading ? (
    <P alertMode={alertMode} lightMode={lightMode}>
      {NewlineBreak(alertCopyHeading)}
    </P>
  ) : null
  return (
    <StyledTileContent
      trendingMode={trendingMode}
      alertMode={alertMode}
      image={image}
      isCarousel={isCarousel}
      device={device}
    >
      {alertCopyHeadingComp}
      {children}
    </StyledTileContent>
  )
}

const StyledTileContent = styled.div`
  position: absolute;
  top: 50%;
  margin-top: 1rem;
  height: 9.1875rem;
  object-fit: contain;
  font-family: NHaasGroteskDSStd-55Rg;
  font-size: 1.25rem;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.2;
  letter-spacing: normal;
  text-align: left;
  color: #000000;
  ${props =>
    props.trendingMode &&
    `
      display: none;
    `};
  ${props =>
    props.alertMode &&
    `
      animation-fill-mode: forwards;
      @keyframes alertColor {
        from {
          color:#000000;
        }
        to {
          color:#FFFFFF;
        }
      }
      animation-name: alertColor;
      animation-duration: 2s;
      animation-delay: 2s;
    `};
  ${props =>
    props.alertMode &&
    !props.isCarousel &&
    `
      font-size: 1rem;
    `};
  ${props =>
    props.device &&
    `
      top:6rem;
      width:12rem;
    `};
  ${media.mobile`
    font-size: 1rem;
  `};
`

export default TileContent
