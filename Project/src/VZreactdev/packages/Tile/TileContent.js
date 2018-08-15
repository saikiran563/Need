import React from "react";
import styled, { css } from "styled-components";
import { media } from "../../util/style";
import NewlineBreak from "../../util/NewlineBreak";
import Shiitake from "shiitake";

const TileContent = ({
  children,
  trendingMode,
  alertMode,
  background,
  image,
  alertCopyHeading,
  lightMode,
  isCarousel,
  device,
  deviceSubheaderMTN,
  deviceHorizontalRule,
  barChartData
}) => {
  const alertCopyHeadingComp = alertCopyHeading ? (
    <P alertMode={alertMode} lightMode={lightMode}>
      {NewlineBreak(alertCopyHeading)}
    </P>
  ) : null;
  return !barChartData ? (
    <StyledTileContent
      trendingMode={trendingMode}
      alertMode={alertMode}
      image={image}
      background={background}
      isCarousel={isCarousel}
      device={device}
      deviceSubheaderMTN={deviceSubheaderMTN}
      deviceHorizontalRule={deviceHorizontalRule}
    >
      {alertCopyHeadingComp}
      {children}
    </StyledTileContent>
  ) : null;
};

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
  z-index: 999;
  max-width: 22.3rem;
  ${props =>
    props.trendingMode &&
    `
      display: none;
    `};
  ${props =>
    props.background === "black" &&
    `
         color:#FFF;
    `};
  ${props =>
    !props.alertMode &&
    ` a{
          color: #000;
          text-decoration: underline;      
      }
    `};
  ${props =>
    props.alertMode &&
    ` a{
        color: #fff;
        text-decoration: underline;      
    }
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
    max-width: 16.56rem;
  `};
  ${props =>
    props.device &&
    !props.deviceSubheaderMTN &&
    props.deviceHorizontalRule &&
    `
      width: 384px;
      height:50px;
      top:140px;
      white-space: normal;
      overflow: hidden;
      text-overflow: ellipsis;
    `};
  ${props =>
    props.device &&
    !props.deviceHorizontalRule &&
    `
      display:none ;
    `};
  ${media.mobile`
      ${props =>
        props.deviceHorizontalRule &&
        props.device &&
        `
          display:none;
        `}
    `};
`;

export default TileContent;
