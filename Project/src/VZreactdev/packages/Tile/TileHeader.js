import React from "react";
import styled, { css } from "styled-components";
import NewlineBreak from "../../util/NewlineBreak";
import { media, isMobile } from "../../util/style";
import Shiitake from "shiitake";

const TileHeader = ({
  alertMode,
  device,
  deviceSubheaderMTN,
  suspend,
  lightMode,
  overline,
  overline2,
  image,
  headline,
  subheader,
  subheaderline2,
  barExplain,
  contentExplain,
  dataUsed,
  dataUsedInfo,
  alertCopyHeading,
  icon,
  video,
  numSlides,
  isCarousel,
  isAnswerTile,
  trendingMode,
  background,
  headerClick,
  siteCatPerContentImp,
  deviceHorizontalRule,
  type
}) => {
  const overlineComp = overline ? (
    <TitleDiv
      alertMode={alertMode}
      lightMode={lightMode}
      isCarousel={isCarousel}
      device={device}
      deviceSubheaderMTN={deviceSubheaderMTN}
      suspend={suspend}
      deviceHorizontalRule={deviceHorizontalRule}
      background={background}
      device={device}
    >
      {device ? (
        NewlineBreak(overline)
      ) : (
        <Shiitake lines={1}>
          {trendingMode && isMobile
            ? NewlineBreak(headline)
            : NewlineBreak(overline)}
        </Shiitake>
      )}
    </TitleDiv>
  ) : null;
  const overline2Comp = overline2 ? (
    <H5
      alertMode={alertMode}
      lightMode={lightMode}
      isCarousel={isCarousel}
      device={device}
      deviceSubheaderMTN={deviceSubheaderMTN}
      suspend={suspend}
      background={background}
    >
      {NewlineBreak(overline2)}
    </H5>
  ) : null;
  const headlineCompClick =
    headline && headerClick ? (
      <H2
        alertMode={alertMode}
        device={device}
        siteCatPerContentImp={siteCatPerContentImp}
        image={typeof image !== "undefined"}
        lightMode={lightMode}
        onClick={headerClick}
        numSlides={numSlides}
        isAnswerTile={isAnswerTile}
        trendingMode={trendingMode}
        background={background}
        sitecatpage={siteCatPerContentImp && siteCatPerContentImp.split(":")[0]}
        sitecatlevel={
          siteCatPerContentImp && siteCatPerContentImp.split(":")[1]
        }
        sitecatposition={
          siteCatPerContentImp && siteCatPerContentImp.split(":")[2]
        }
        sitecatcategory={
          siteCatPerContentImp && siteCatPerContentImp.split(":")[3]
        }
        sitecatkey={siteCatPerContentImp && siteCatPerContentImp.split(":")[4]}
        sitecatcta={siteCatPerContentImp && siteCatPerContentImp.split(":")[5]}
        type={type}
      >
        <Shiitake lines={3} className="shiitake_div">
          {NewlineBreak(headline)}
        </Shiitake>
      </H2>
    ) : null;

  const headlineComp =
    headline && (headerClick == null || !siteCatPerContentImp == null) ? (
      <H3body
        alertMode={alertMode}
        device={device}
        image={typeof image !== "undefined"}
        lightMode={lightMode}
        numSlides={numSlides}
        isAnswerTile={isAnswerTile}
        trendingMode={trendingMode}
        background={background}
        type={type}
        sitecatpage={siteCatPerContentImp && siteCatPerContentImp.split(":")[0]}
        sitecatlevel={
          siteCatPerContentImp && siteCatPerContentImp.split(":")[1]
        }
        sitecatposition={
          siteCatPerContentImp && siteCatPerContentImp.split(":")[2]
        }
        sitecatcategory={
          siteCatPerContentImp && siteCatPerContentImp.split(":")[3]
        }
        sitecatkey={siteCatPerContentImp && siteCatPerContentImp.split(":")[4]}
        sitecatcta={siteCatPerContentImp && siteCatPerContentImp.split(":")[5]}
      >
        <Shiitake lines={3} className="shiitake_div">
          {NewlineBreak(headline)}
        </Shiitake>
      </H3body>
    ) : null;

  const subheaderComp = subheader ? (
    <H5
      alertMode={alertMode}
      lightMode={lightMode}
      video={video}
      isAnswerTile={isAnswerTile}
      trendingMode={trendingMode}
      device={device}
      deviceSubheaderMTN={deviceSubheaderMTN}
      background={background}
      suspend={suspend}
      subheaderline2={subheaderline2}
    >
      {type === "search" ? (
        <Shiitake lines={3}>{NewlineBreak(subheader)}</Shiitake>
      ) : (
        NewlineBreak(subheader)
      )}
    </H5>
  ) : null;

  const suspendCommonetComp = suspend ? (
    <H5suspend device={device} suspend={suspend}>
      {NewlineBreak("Suspended")}
    </H5suspend>
  ) : null;
  const suspendSeperCommonetComp = suspend ? (
    <H5suspendSeper device={device} suspend={suspend}>
      {NewlineBreak("-")}
    </H5suspendSeper>
  ) : null;

  const subheaderComp2 = subheaderline2 ? (
    <P
      alertMode={alertMode}
      lightMode={lightMode}
      video={video}
      device={device}
      subheaderline2={subheaderline2}
      isAnswerTile={isAnswerTile}
      trendingMode={trendingMode}
      deviceSubheaderMTN={deviceSubheaderMTN}
    >
      {NewlineBreak(subheaderline2)}
    </P>
  ) : null;

  const barExplainComp = barExplain ? (
    <H4
      alertMode={alertMode}
      lightMode={lightMode}
      video={video}
      isAnswerTile={isAnswerTile}
      trendingMode={trendingMode}
      device={device}
      suspend={suspend}
      deviceSubheaderMTN={deviceSubheaderMTN}
    >
      <Shiitake lines={2}>{NewlineBreak(barExplain)}</Shiitake>
    </H4>
  ) : null;

  const contentExplainComp = contentExplain ? (
    <H4
      alertMode={alertMode}
      lightMode={lightMode}
      video={video}
      isAnswerTile={isAnswerTile}
      trendingMode={trendingMode}
      device={device}
      suspend={suspend}
    >
      {NewlineBreak(contentExplain)}
    </H4>
  ) : null;

  const alertCopyHeadingComp = alertCopyHeading ? (
    <P alertMode={alertMode} lightMode={lightMode}>
      {NewlineBreak(alertCopyHeading)}
    </P>
  ) : null;

  const iconComp = icon ? (
    <Icon
      icon={this.props.icon}
      className={classNames({
        "vz-odt--tile__icon": true,
        "alert-mode": alertMode
      })}
    />
  ) : null;

  return (
    <StyledTileHeader>
      {overlineComp}
      {overline2Comp}
      {headlineComp}
      {headlineCompClick}
      {subheaderComp}
      {suspendCommonetComp}
      {suspendSeperCommonetComp}
      {barExplainComp}
      {contentExplainComp}
      {subheaderComp2}
      {iconComp}
    </StyledTileHeader>
  );
};

const StyledTileHeader = styled.div`
  margin-bottom: 0rem;
  color: #000000;
  padding: 0;
  ${media.mobile`
    max-width: 16.56rem;
  `};
`;

const H2 = styled.h2.attrs({
  "sitecat-page": props => props.sitecatpage,
  "sitecat-level": props => props.sitecatlevel,
  "sitecat-position": props => props.sitecatposition,
  "sitecat-category": props => props.sitecatcategory,
  "sitecat-cta": props => props.sitecatcta,
  "sitecat-key": props => props.sitecatkey
})`
  margin-bottom: 1.25rem;
  object-fit: contain;
  font-family: NHaasGroteskDSStd-75Bd;
  font-size: 2.125rem;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: 0.95;
  letter-spacing: normal;
  text-align: left;
  color: #000000;
  aria-label='title';
  tabindex = "0";
  ${media.mobile`
  ${props =>
    props.trendingMode &&
    `
      font-family: NHaasGroteskDSStd-55Rg;
    `};
  ${props =>
    props.isAnswerTile &&
    !props.trendingMode &&
    `
      font-family: NHaasGroteskDSStd-75Bd;
    `};
    ${props =>
      props.type === "browsePopular" &&
      `
        font-size: 1rem;
        margin-bottom: 0rem;
        font-family: NHaasGroteskDSStd-55Rg;
      `};
  `}
  ${media.tablet`
    font-size: ${props =>
      (props.numSlides === 3 || props.isAnswerTile) && !props.device === true
        ? "2.75rem"
        : "2rem"};
  `}; 
  ${props =>
    props.device &&
    `
    margin-bottom: 0rem;
    font-size: 1.2rem;
    `};
     ${props =>
       props.siteCatPerContentImp &&
       `   cursor:pointer;
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
          font-size: 2.5rem;
          margin-bottom: 1.25rem;
    `};
  ${props =>
    props.image &&
    `
        line-height: 0.95;
        font-size: 2.125rem;
    `};
  ${props =>
    props.lightMode &&
    `
        color: #ffffff;
    `};
    ${media.mobile`
      ${props =>
        props.isAnswerTile &&
        `
          font-size: 1.5625rem;
        `};
  `}; 
  ${props =>
    props.background === "black" &&
    `
      color: white;
    `};
    ${props =>
      props.headerClick !== null &&
      `   cursor:pointer;
   `};
`;

const H4 = styled.h4`
  height: 3rem;
  width: 13.8125rem;
  font-family: "NHaasGroteskDSStd-55Rg";
  font-size: 1.25rem;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.2;
  letter-spacing: normal;
  margin-top: 0.5125rem;
  deviceSubheaderMTN
  ${props =>
    props.deviceSubheaderMTN &&
    `
      white-space: normal;
      overflow: hidden;
      text-overflow: ellipsis;
      width: 13.8125rem;
      height: 3rem;
      object-fit: contain;
      color: #000;
    `};
  ${media.mobile`
    font-size: 1rem;
    ${props =>
      props.deviceSubheaderMTN &&
      `
      width: 15.3125rem;
      height: 1.8rem;
      object-fit: contain;
      font-size: 0.75rem;
      color: #000;
      text-overflow: ellipsis;
      margin-top:0rem;
      `};
  `};
`;

const H5 = styled.h5`
  height: 1.5rem;
  object-fit: contain;
  font-family: NHaasGroteskDSStd-55Rg;
  font-size: 1.25rem;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.2;
  letter-spacing: normal;
  text-align: left;
  color: #000;
  margin-bottom: 1.25rem;
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

  ${media.desktop`
    ${props =>
      props.alertMode &&
      !props.isCarousel &&
      `
        font-size: 1.25rem;
      `};
  `};
  ${props =>
    props.lightMode &&
    `
      color: #ffffff;
    `};
  ${media.mobile`
    font-size: 1rem;
    ${props =>
      props.device &&
      `
      width: 15.3125rem;
      height: 1.1875rem;
      font-size: 1.25rem;
      `};
      ${props =>
        props.deviceHorizontalRule &&
        `
        font-family: NHaasGroteskDSStd-55Rg;
        font-size: 16px;
        height: 10px;
        font-weight: normal;
        font-style: normal;
        font-stretch: normal;
        letter-spacing: normal;
        `}
  `};
  ${props =>
    props.device &&
    `
    width: 13.9rem;
    height: 1.9rem;
    font-family: 'NHaasGroteskDSStd-75Bd';
    font-size: 2rem;
    line-height: 0.95;
    letter-spacing: normal;
    color: #000;
    margin-bottom:0;
    object-fit: none;
    `};
  ${props =>
    props.suspend &&
    `
    color: #747676;
  `};

  ${props =>
    props.background === "black" &&
    `
      color: white;
    `};
  ${props =>
    props.isAnswerTile &&
    `
      font-size: 0.875rem;
    `} ${props =>
    props.subheaderline2 &&
    `
      margin-bottom: 0rem;
    `};
  ${props =>
    props.device &&
    !props.deviceSubheaderMTN &&
    !props.deviceHorizontalRule &&
    `
          width:24.0625rem;
          height: 3.8rem;
        `};
  ${props =>
    props.device &&
    props.deviceSubheaderMTN &&
    !props.deviceHorizontalRule &&
    `
        width:13.9rem;
        height: 1.9rem;
      `};
  ${media.mobile`
      ${props =>
        props.device &&
        !props.deviceSubheaderMTN &&
        !props.deviceHorizontalRule &&
        `
        width:12.3125rem;
        height: 3.5625rem;
        `};
    `};
  ${props =>
    props.device &&
    !props.deviceSubheaderMTN &&
    props.deviceHorizontalRule &&
    `
      width:12rem;
      height: 3.8rem;
    `};
  ${media.mobile`
    ${props =>
      props.device &&
      !props.deviceSubheaderMTN &&
      props.deviceHorizontalRule &&
      `
      width:21.4375rem;
      height: 1.9rem;
      `};
  `};
`;

const P = styled.p`
  font-family: "NeueHaasGroteskTextBold", Arial, Helvetica, sans-serif;
  font-style: normal;
  line-height: 1.2;
  font-size: 1.25rem;
  color: #000000;
  ${props =>
    props.alertMode &&
    `
      color: #ffffff;
    `};
  ${props =>
    props.alertMode &&
    !props.isCarousel &&
    `
      font-size: 1rem;
    `};
  ${props =>
    props.lightMode &&
    `
      color: #ffffff;
    `};
  ${props =>
    props.video &&
    `
      font-family: 'NeueHaasGroteskTextBold', Arial, Helvetica, sans-serif;
      font-size: 1.25rem;
      font-weight: 200;
      color: #000000;
      margin-top: 0.725rem;
    `};
  ${props =>
    props.isAnswerTile === true &&
    `
      font-size: 0.875rem;
    `};

  ${props =>
    props.device &&
    `
    width: 13.8125rem;
    height: 1.9rem;
    font-family: 'NHaasGroteskDSStd-75Bd';
    font-size: 2rem;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: 0.95;
    letter-spacing: normal;
    color: #000;
    `};
  ${props =>
    props.background === "black" &&
    `
      color: white;
    `};
  ${props =>
    props.isAnswerTile &&
    props.subheaderline2 &&
    `
      color: gray;
      padding-top: 0px;
    `};
`;

const H5suspend = styled.h5`
  height: 1.5rem;
  object-fit: contain;
  font-family: NHaasGroteskDSStd-55Rg;
  font-size: 1.25rem;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.2;
  letter-spacing: normal;
  text-align: left;
  color: #000;
  margin-bottom: 1.25rem;

  ${media.mobile`
  font-size: 1rem;
  ${props =>
    props.device &&
    `
    width: 15.3125rem;
    height: 0rem;
    font-size: 1.25rem;
    position: relative;
    left: 130px;
    bottom: 20px;
    `};
`};
  ${props =>
    props.device &&
    `
  width: 13.8125rem;
  height: 1.9rem;
  font-family: 'NHaasGroteskDSStd-75Bd';
  font-size: 2rem;
  line-height: 0.95;
  letter-spacing: normal;
  color: #000;
  margin-bottom:0;
  `};
  ${props =>
    props.suspend &&
    `
  color: #747676;
`};
`;

const H5suspendSeper = styled.h5`
  height: 1.5rem;
  object-fit: contain;
  font-family: NHaasGroteskDSStd-55Rg;
  font-size: 1.25rem;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.2;
  letter-spacing: normal;
  text-align: left;
  color: #000;
  margin-bottom: 1.25rem;
  display: none;
  ${media.mobile`
  font-size: 1rem;
  ${props =>
    props.device &&
    `
    width: 15.3125rem;
    height: 0rem;
    font-size: 1.25rem;
    position: relative;
    left: 123px;
    bottom: 21px;
    display: block;
    `};
`};
  ${props =>
    props.device &&
    `
  width: 13.8125rem;
  height: 1.9rem;
  font-family: 'NHaasGroteskDSStd-75Bd';
  font-size: 2rem;
  line-height: 0.95;
  letter-spacing: normal;
  color: #000;
  margin-bottom:0;
  `};
  ${props =>
    props.suspend &&
    `
  color: #747676;
`};
`;

const TitleDiv = styled.div`
  height: 1.5rem;
  object-fit: contain;
  font-family: NHaasGroteskDSStd-55Rg;
  font-size: 1.25rem;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.2;
  letter-spacing: normal;
  text-align: left;
  color: #000;
  margin-bottom: 1.25rem;
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
  ${media.desktop`
    ${props =>
      props.alertMode &&
      !props.isCarousel &&
      `
        font-size: 1.25rem;
    `};
  `} ${props =>
    props.lightMode &&
    `
      color: #ffffff;
    `};
  ${media.mobile`
    font-size: 1rem;
    ${props =>
      props.device &&
      `
      width: 15.3125rem;
      height: 1.1875rem;
      font-size: 1.25rem;
      `};
      ${props =>
        props.deviceHorizontalRule &&
        `
        font-family: NHaasGroteskDSStd-55Rg;
        font-size: 16px;
        height: 10px;
        font-weight: normal;
        font-style: normal;
        font-stretch: normal;
        letter-spacing: normal;
        `}
  `};
  ${props =>
    props.device &&
    `
    width: 13.9rem;
    height: 1.9rem;
    font-family: 'NHaasGroteskDSStd-75Bd';
    font-size: 2rem;
    line-height: 0.95;
    letter-spacing: normal;
    color: #000;
    margin-bottom:0;
    object-fit: none;
    `};
  ${props =>
    props.suspend &&
    `
    color: #747676;
  `};

  ${props =>
    props.background === "black" &&
    `
      color: white;
    `};
  ${props =>
    props.isAnswerTile &&
    `
      font-size: 0.875rem;
    `} ${props =>
    props.subheaderline2 &&
    `
      margin-bottom: 0rem;
    `};
  ${props =>
    props.device &&
    !props.deviceSubheaderMTN &&
    !props.deviceHorizontalRule &&
    `
          width:24.0625rem;
          height: 3.8rem;
        `};
  ${props =>
    props.device &&
    props.deviceSubheaderMTN &&
    !props.deviceHorizontalRule &&
    `
        width:250px;
        height: 1.9rem;
      `};
  ${media.mobile`
      ${props =>
        props.device &&
        !props.deviceSubheaderMTN &&
        !props.deviceHorizontalRule &&
        `
        width:12.3125rem;
        height: 3.5625rem;
        `};
    `};
  ${props =>
    props.device &&
    !props.deviceSubheaderMTN &&
    props.deviceHorizontalRule &&
    `
      width:12rem;
      height: 3.8rem;
    `};
  ${media.mobile`
    ${props =>
      props.device &&
      !props.deviceSubheaderMTN &&
      props.deviceHorizontalRule &&
      `
      width:21.4375rem;
      height: 1.9rem;
      `};
  `};
`;

const H3body = styled.h3.attrs({
  "sitecat-page": props => props.sitecatpage,
  "sitecat-level": props => props.sitecatlevel,
  "sitecat-position": props => props.sitecatposition,
  "sitecat-category": props => props.sitecatcategory,
  "sitecat-cta": props => props.sitecatcta,
  "sitecat-key": props => props.sitecatkey
})`
  margin-bottom: 1.25rem;
  object-fit: contain;
  font-family: NHaasGroteskDSStd-75Bd;
  font-size: 2.125rem;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: 0.95;
  letter-spacing: normal;
  text-align: left;
  color: #000000;
  aria-label='title';
  tabindex = "0";
  ${media.mobile`
  ${props =>
    props.trendingMode &&
    `
      font-family: NHaasGroteskDSStd-55Rg;
    `};
  ${props =>
    props.isAnswerTile &&
    !props.trendingMode &&
    `
      font-family: NHaasGroteskDSStd-75Bd;
    `};
    ${props =>
      props.type === "browsePopular" &&
      `
        font-size: 1rem;
        margin-bottom: 0rem;
        font-family: NHaasGroteskDSStd-55Rg;
      `};
  `}
  ${media.tablet`
    font-size: ${props =>
      (props.numSlides === 3 || props.isAnswerTile) && !props.device === true
        ? "2.75rem"
        : "2rem"};
  `}; 
  ${props =>
    props.device &&
    `
    margin-bottom: 0rem;
    font-size: 1.2rem;
    `};
     ${props =>
       props.siteCatPerContentImp &&
       `   cursor:pointer;
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
          font-size: 2.5rem;
          margin-bottom: 1.25rem;
    `};
  ${props =>
    props.image &&
    `
        line-height: 0.95;
        font-size: 2.125rem;
    `};
  ${props =>
    props.lightMode &&
    `
        color: #ffffff;
    `};
    ${media.mobile`
      ${props =>
        props.isAnswerTile &&
        `
          font-size: 1.5625rem;
        `};
  `}; 
  ${props =>
    props.background === "black" &&
    `
      color: white;
    `};
`;

export default TileHeader;
