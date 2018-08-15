import React from "react";
import styled, { css } from "styled-components";
import { media } from "../../util/style";
import Button from "../Button/Button";
const TileImage = ({
  image,
  visible,
  device,
  deviceSubheaderMTN,
  deviceHorizontalRule,
  isAnswerTile,
  alertMode,
  ctaClick,
  headline
}) => {
  const button = isAnswerTile ? (
    <Button
      onClick={ctaClick}
      kind={Button.BUTTON_TYPE.CHEVRON_CTA}
      inverted={alertMode}
      aria-label={headline}
      role={"link"}
    />
  ) : null;

  const imageComp = image ? (
    <React.Fragment>
      <ImageWrapper
        device={device}
        isAnswerTile={isAnswerTile}
        id={device ? (deviceSubheaderMTN ? "deviceIETileImage" : null) : null}
      >
        <Image
          src={image}
          visible={visible}
          device={device}
          deviceSubheaderMTN={deviceSubheaderMTN}
          deviceHorizontalRule={deviceHorizontalRule}
          isAnswerTile={isAnswerTile}
          id={
            device ? (deviceSubheaderMTN ? null : "deviceIEPromoImage") : null
          }
        />
      </ImageWrapper>
      <StyledDiv>{button}</StyledDiv>
    </React.Fragment>
  ) : null;
  return imageComp;
};

const ImageWrapper = styled.figure`
  height: 100%;
  margin: auto 0 auto 1.25rem;

  ${media.mobile`
    ${props =>
      props.isAnswerTile &&
      `
        height: 100%;
        padding: 1rem 2rem 1rem 1rem;
      `};
  `};
  ${props =>
    props.device &&
    `
   margin:0;
   padding:0;
   overflow:none;
   margin-right: 30px;
   margin-bottom: 71px;
    `};
  ${media.mobile`
    ${props =>
      props.device &&
      `
        margin-right:3px;
        margin-left:1rem;
        width: auto;
        max-width: 5.125rem;
        max-height: 7.375rem;
      `};
  `};
  ${props =>
    props.isAnswerTile &&
    `
    height: 0;
    flex: 1;
    margin: 0;
    margin-top: 1.25rem; 
    `};
`;
const Image = styled.img`
  margin-right: -1.5625rem;
  height: 21.1875rem;
  transition-duration: 600ms;
  transition-timing-function: ease-in-out;
  max-height: 19.0625rem;
  ${media.mobile`
    ${props =>
      props.isAnswerTile &&
      `
        height: 100%;
        margin-right: 0rem;
        max-height: -webkit-fill-available;
      `};
  `}
  ${props =>
    props.device &&
    `
    width:auto;
    height:auto;
    max-width:100%;
    max-height:100%;
    margin-left: auto;
    margin-right: auto;
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
  ${props =>
    props.isAnswerTile &&
    `
    height: auto;
    max-height: max-content;
    `}
  ${props =>
    props.device &&
    !props.deviceSubheaderMTN &&
    `
      position: relative;
      right: 28.125rem;
      top: 6.25rem;
      max-width: 21.875rem;
      max-height: 21.875rem;
    `}
  ${props =>
    props.device &&
    props.deviceSubheaderMTN &&
    `
      max-width:110%;
      max-height:110%;
    `}
    ${media.mobile`
    ${props =>
      props.device &&
      !props.deviceSubheaderMTN &&
      !props.deviceHorizontalRule &&
      `
      position: relative;
      right: 1.125rem;
      top: 2.25rem;
      max-width: 9.875rem;
      max-height: 9.875rem;
      transform:rotate(-50deg);
      -ms-transform:rotate(-50deg); /* Internet Explorer */
      -moz-transform:rotate(-50deg); /* Firefox */
      -webkit-transform:rotate(-50deg); /* SafariChrome */
      -o-transform:rotate(-50deg); /* Opera */
      `};
  `};
`;

const StyledDiv = styled.div`
  position: absolute;
  right: 20px;
  bottom: 20px;
`;
export default TileImage;
