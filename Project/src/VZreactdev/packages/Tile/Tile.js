import React, { Component } from "react";
import PropTypes from "prop-types";
import styled, { css, keyframes } from "styled-components";

import IsInViewport from "../../util/InViewport";

import TileHeader from "./TileHeader";
import HorizontalRule from "./HorizontalRule";
import TileContent from "./TileContent";
import TileFooter from "./TileFooter";
import TileImage from "./TileImage";
import TileVideo from "./TileVideo";
import TileReduced from "./TileReduced";
import FullScreenImage from "./FullScreenImage";
import { FadeInAnimation } from "./TileAnimations";
import { media } from "../../util/style";

export default class Tile extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    overline: PropTypes.string,
    overline2: PropTypes.string,
    headline: PropTypes.string,
    subheader: PropTypes.string,
    suspend: PropTypes.bool,
    deviceSubheaderMTN: PropTypes.bool,
    contentExplain: PropTypes.string,
    barExplain: PropTypes.string,
    dataUsed: PropTypes.string,
    dataUsedInfo: PropTypes.string,
    alertMode: PropTypes.bool,
    trendingMode: PropTypes.bool,
    ctaBtnText: PropTypes.object,
    ctaBtnText2: PropTypes.object,
    ctaBtnLink: PropTypes.string,
    ctaClick: PropTypes.func,
    icon: PropTypes.object,
    singleTile: PropTypes.bool,
    image: PropTypes.string,
    video: PropTypes.string,
    fullscreenImage: PropTypes.string,
    lightMode: PropTypes.bool,
    barValue: PropTypes.number,
    barBaseValue: PropTypes.number,
    barLabelText: PropTypes.string,
    barValueExplain: PropTypes.string,
    active: PropTypes.bool,
    collapsed: PropTypes.bool,
    isparentscrolling: PropTypes.bool,
    isCarousel: PropTypes.bool,
    numColumns: PropTypes.number,
    animatedIn: PropTypes.bool,
    animationDelay: PropTypes.string,
    reduced: PropTypes.bool,
    numSlides: PropTypes.number,
    device: PropTypes.bool,
    hideHorizontalRule: PropTypes.bool,
    isAnswerTile: PropTypes.bool,
    background: PropTypes.string,
    contractType: PropTypes.string,
    encryptedMtn: PropTypes.string,
    graphBarColor: PropTypes.string
  };

  static defaultProps = {
    alertMode: false,
    trendingMode: false,
    singleTile: false,
    background: "white",
    lightMode: false,
    active: true,
    collapsed: false,
    isparentscrolling: false,
    isCarousel: false,
    numColumns: 6,
    animatedIn: false,
    animationDelay: "0s",
    reduced: false,
    numSlides: 0,
    hideHorizontalRule: false,
    isAnswerTile: false,
    device: false,
    encryptedMtn: ""
  };

  state = {
    visible: false,
    active: this.props.active || true,
    collapsed: this.props.collapsed || false,
    isparentscrolling: this.props.isparentscrolling || false,
    loading: true
  };

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
    this.handleScroll();
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  componentWillReceiveProps(props) {
    if (props.isparentscrolling) {
      this.handleScroll();
    }

    this.setState({
      active: props.active,
      collapsed: props.collapsed,
      loading: props.loading
    });
  }

  handleScroll = event => {
    if (!this.state.visible) {
      if (IsInViewport(this.tileElem)) {
        this.setState({
          visible: true
        });
      }
    }
  };
  handleTileClick = () => {
    return false;
  };

  render() {
    const {
      device,
      deviceSubheaderMTN,
      needHiddenDevice,
      hideBeyondTile,
      suspend,
      image,
      upgradeUrl,
      upgradeEligible,
      byodDevice,
      video,
      isCarousel,
      alertCopy,
      fullscreenImage,
      animatedIn,
      animationDelay,
      numColumns,
      reduced,
      numSlides,
      alertMode,
      hideHorizontalRule,
      deviceHorizontalRule,
      hidealldeviceCAT,
      isAnswerTile,
      trendingMode,
      secondLineBorder,
      background,
      ctaBtn,
      ctaBtn2,
      ctaClick,
      type,
      id,
      barChartData,
      barLabelPrefix,
      barChartHeight,
      siteCatPerContentImp,
      quickUpdates,
      encryptedMtn,
      promoTile,
      ...other
    } = this.props;
    const containsImage = typeof image !== "undefined";
    const containsVideo = typeof video !== "undefined";
    const { visible, active, collapsed, loading } = this.state;
    return (
      <TileContainer
        id={id}
        collapsed={collapsed}
        isCarousel={isCarousel}
        alertMode={alertMode}
        isAnswerTile={isAnswerTile}
        device={device}
        secondLineBorder={secondLineBorder}
        needHiddenDevice={needHiddenDevice}
        hideBeyondTile={hideBeyondTile}
        deviceSubheaderMTN={deviceSubheaderMTN}
        deviceHorizontalRule={deviceHorizontalRule}
        type={type}
        promoTile={promoTile}
        fullscreenImage={fullscreenImage}
      >
        {reduced && (
          <a href="#">
            <TileReduced
              inneRef={div => {
                this.tileElem = div;
              }}
              {...other}
            />
          </a>
        )}
        <StyledTile
          innerRef={div => {
            this.tileElem = div;
          }}
          alertMode={alertMode}
          image={containsImage}
          video={containsVideo}
          numColumns={numColumns}
          numSlides={numSlides}
          reduced={reduced}
          device={device}
          deviceSubheaderMTN={deviceSubheaderMTN}
          deviceHorizontalRule={deviceHorizontalRule}
          suspend={suspend}
          fullscreenImage={fullscreenImage}
          secondLineBorder={secondLineBorder}
          isAnswerTile={isAnswerTile}
          background={background}
          type={type}
          promoTile={promoTile}
          {...other}
        >
          <AnimatedConatiner
            key={loading}
            animatedIn={animatedIn}
            animationDelay={animationDelay}
          >
            {
              <FullScreenImage
                fullscreenImage={fullscreenImage}
                loading={loading}
                device={device}
                promoTile={promoTile}
              />
            }
            {!loading && (
              <TextContainer
                image={containsImage}
                isAnswerTile={isAnswerTile}
                device={device}
                isTileClickable={type && type == "search" && ctaClick}
                deviceSubheaderMTN={deviceSubheaderMTN}
                suspend={suspend}
                onClick={
                  type &&
                  type == "search" &&
                  (!ctaBtn && !ctaBtn2 && ctaClick ? ctaClick : null)
                }
              >
                <TileHeader
                  alertMode={alertMode}
                  image={containsImage}
                  video={containsVideo}
                  device={device}
                  deviceSubheaderMTN={deviceSubheaderMTN}
                  deviceHorizontalRule={deviceHorizontalRule}
                  suspend={suspend}
                  numSlides={numSlides}
                  isCarousel={isCarousel}
                  isAnswerTile={isAnswerTile}
                  trendingMode={trendingMode}
                  background={background}
                  type={type}
                  siteCatPerContentImp={siteCatPerContentImp}
                  {...other}
                  headerClick={
                    !ctaBtn && !ctaBtn2 && ctaClick ? ctaClick : null
                  }
                />
                <HorizontalRule
                  alertMode={alertMode}
                  image={containsImage}
                  video={containsVideo}
                  device={device}
                  background={background}
                  fullscreenImage={fullscreenImage}
                  hideHorizontalRule={hideHorizontalRule}
                  deviceHorizontalRule={deviceHorizontalRule}
                  isAnswerTile={isAnswerTile}
                  type={type}
                  {...other}
                  barChartData={barChartData}
                />
                {alertCopy}
                <TileContent
                  image={containsImage}
                  alertMode={alertMode}
                  isCarousel={isCarousel}
                  device={device}
                  background={background}
                  deviceSubheaderMTN={deviceSubheaderMTN}
                  deviceHorizontalRule={deviceHorizontalRule}
                  barChartData={barChartData}
                  {...other}
                />
                <TileFooter
                  alertMode={alertMode}
                  image={containsImage}
                  video={containsVideo}
                  fullscreenImage={fullscreenImage}
                  device={device}
                  background={background}
                  deviceSubheaderMTN={deviceSubheaderMTN}
                  deviceHorizontalRule={deviceHorizontalRule}
                  hidealldeviceCAT={hidealldeviceCAT}
                  upgradeUrl={upgradeUrl}
                  upgradeEligible={upgradeEligible}
                  byodDevice={byodDevice}
                  type={type}
                  ctaBtn={ctaBtn}
                  ctaBtn2={ctaBtn2}
                  barChartData={barChartData}
                  barLabelPrefix={barLabelPrefix}
                  barChartHeight={barChartHeight}
                  siteCatPerContentImp={siteCatPerContentImp}
                  ctaClick={ctaClick}
                  quickUpdates={quickUpdates}
                  encryptedMtn={encryptedMtn}
                  {...other}
                />
              </TextContainer>
            )}
          </AnimatedConatiner>
          {!loading && (
            <TileImage
              image={image}
              visible={visible}
              device={device}
              deviceSubheaderMTN={deviceSubheaderMTN}
              isAnswerTile={isAnswerTile}
            />
          )}
          {!loading && <TileVideo video={video} />}
        </StyledTile>
      </TileContainer>
    );
  }
}

const AnimatedConatiner = styled.div`
  position: relative;
  z-index: 10000;
  display: flex;
  padding: 0px;
  flex-direction: row;
  -ms-flex-direction: row;
  width: 100%;
  ${props => props.animatedIn && FadeInAnimation(props)};
`;

const StyledTile = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  -ms-flex-direction: row;
  justify-content: space-between;
  width: 100%;
  height: 100%; /*make IE clear*/
  min-width: 20.44rem; /* min 328px on mobile, narrower than stand 375px to show part of next tile in carousel mode */
  width: expression(
    document.body.clientWidth < 20.44? "20.44rem": "auto"
  ); /* min 328px on mobile, narrower than stand 375px to show part of next tile in carousel mode */
  min-height: 23.75rem; /* min 380px on mobile */
  background-color: #ffffff;
  border-style: solid;
  border: 1px solid #d8dada;
  padding: 1.25rem 1.25rem;
  opacity: 0.6;

  ${props =>
    props.device &&
    !props.promoTile &&
    `
      padding: 17px 20px 20px 20px !important;
    `};
  ${props =>
    props.promoTile &&
    `
      padding: 0px !important;
    `};
  ${props =>
    props.device &&
    props.secondLineBorder &&
    `
    border: none;
    border-left: 1px solid #d8dada;
      `};
  ${props =>
    props.device &&
    !props.secondLineBorder &&
    `
      border: none;
    `};

  ${media.mobile`
    padding: 1.25rem 1rem;
    ${props =>
      props.device &&
      `
      width: 23.4375rem;
      height: 9.875rem;
      min-height: 9.875rem;
      opacity: 1;
      width:100%;
      `};
      ${props =>
        props.device &&
        !props.promoTile &&
        `
          padding: 20px 16px 20px 16px !important;
        `};
    ${props =>
      props.deviceHorizontalRule &&
      `
        padding-top:24px !important;
        height: 118px
        min-height: 118px;
        border: none;
      `};
    ${props =>
      props.isAnswerTile === true &&
      `
        height: 12.625rem;
        min-height: 12.625rem;
        max-height: 12.625rem;
        padding: 1rem;
      `}
    ${props =>
      props.isAnswerTile &&
      props.image &&
      `
        flex-direction: row;
      `};
    ${props =>
      props.type === "browsePopular" &&
      `
        border: none;
        border-bottom: 1px solid gray;
        height: unset;
        max-height: none;
        min-height: 2rem;
        margin-left 1rem;
        margin-right: 1rem;
        opacity: 1;
        padding: 1rem 0 1rem 0;
        width: unset;
      `};
    `};
  ${media.tablet`
    min-width: 16.25rem;
    min-height: ${props =>
      props.numSlides === 3 && !props.device ? "30rem" : "20rem"};
    height: 100%; /* IE fix */
    opacity: 1;
  `};
  ${media.desktop`
    ${props =>
      props.isAnswerTile &&
      props.image &&
      `
        flex-direction: column;
      `}
    ${props =>
      props.type === "browsePopular" &&
      `
        height: 10rem;
        min-height: 10rem;
      `};
  `};
  ${props =>
    props.collapsed &&
    `
      ${media.tablet`
        display: flex;
      `};
      @keyframes alertCollapseLastStyledTile {
        from {
          flex: 1;
        }
        to {
          min-width: 0px;
        }
      }
      animation-name: alertCollapseLastStyledTile;
      animation-duration: 2s;
    `};
  ${props =>
    props.active &&
    `
      opacity: 1;
    `};
  ${props =>
    props.isCarousel &&
    `
      min-height: 22.5rem;
    `};
  ${props =>
    props.alertMode &&
    `
      animation-fill-mode: forwards;
      font-size:1.25rem;
      ${media.tablet`
        min-width: 16.25rem;
        /**max-width: 40rem;**/
      `};
      @keyframes alertBackgroundColor {
        from {
          background-color:#FFFFFF;
        }
        to {
          background-color:#000000;
          border: 0;
        }
      }
      animation-name: alertBackgroundColor;
      animation-duration: 2s;
      animation-delay: 2s;
    `};
  ${props =>
    props.alertCopy &&
    `
      color: #fff;

    `};
  ${props =>
    props.lightMode &&
    `
      background-color: #000;
    `};
  ${props =>
    props.trendingMode &&
    `
      min-height: 23.75rem;
      ${media.tablet`
        min-width: 16.25rem;
        max-width: 40rem;
        min-height: 20rem;
      `}
    `};
  ${props =>
    props.image &&
    !props.isAnswerTile &&
    `
      padding: 1.25rem 0 1.25rem 1rem;
    `};
  ${props =>
    props.video &&
    `
      ${media.tablet`
        min-height: 22.5rem;
      `}
    `};
  ${props =>
    props.singleTile &&
    `
      ${media.tablet`
        max-width: 40rem;
      `}
    `};
  ${props =>
    props.reduced &&
    `
      display: none;
    `};
  ${props =>
    props.isAnswerTile &&
    props.image &&
    `
      max-height: 20rem;
    `};
  ${props =>
    props.device &&
    !props.deviceSubheaderMTN &&
    !props.deviceHorizontalRule &&
    `
      background-color: #F6F6F6;
    `};
  background-color: ${props => props.background};
  ${props =>
    props.type === "browsePopular" &&
    `
      min-height: 0rem;
      max-height: 0rem;
      height: 10rem;
    `};
`;

const TextContainer = styled.div`
  position: relative;
  display: flex;
  text-decoration: none;
  flex-direction: column;
  -ms-flex-direction: column;
  width: 100%;
  z-index: 1;
  cursor: ${props => (props.isTileClickable ? "pointer" : "default")};
  ${props =>
    props.image &&
    `
      width: 50%;
    `};
  ${props =>
    props.device &&
    `
        width: 100%; 
      `};
  ${media.mobile`    
      ${props =>
        props.isAnswerTile === true &&
        `
          width: 100%;
        `}
    `};
  ${props =>
    props.isAnswerTile &&
    props.image &&
    `
      width: 100%;
    `};
`;

const TileContainer = styled.div`
  position: relative;
  width: 100%;
  padding: 0;
  tabindex="0";
  overflow-x: hidden;
  overflow-y: hidden;
  min-width: 19.92rem;
  width:expression(document.body.clientWidth < 19.92? "19.92rem": "auto" ); 
  ~ div {
    margin-top: -1px;
  }
  flex:1;
  ${props =>
    props.type === "QuickUpdates" &&
    `
      min-width: 382px;
    `};
  ${props =>
    props.needHiddenDevice &&
    `
      display:none;
    `};
  ${props =>
    props.hideBeyondTile &&
    `
      display:none;
    `};
  ${props =>
    props.device &&
    `
    height: 20rem;
    min-height: 20rem;
    min-width:423px;
    max-width: 425px;
    max-height:20rem;
    border: 1px solid #d8dada;
    `};
  ${props =>
    props.device &&
    media.mobile`
      height: 9.875rem;
      min-height: 9.875rem;
      width: 100%;
      min-width: 375px !important;
    `};
  ${media.desktop`
    ${props =>
      props.type === "browsePopular" &&
      `
        min-width: 33%;
        margin-left: 0 !important;
      `}
  `};
  ${media.mobile`
    min-width: 20.438rem;
    ${props =>
      props.type === "browsePopular" &&
      `
        margin-top: 0 !important;
      `};
    ${props =>
      props.type === "QuickUpdates" &&
      `
      min-width: 382px;
      `};
    ${props =>
      props.isAnswerTile === true &&
      `
        height: 12.625rem;
      `}
  ${props =>
    props.device &&
    props.deviceHorizontalRule &&
    `
    border-right:none;
    border-bottom: none;
    border-left: none;
    min-height: 68px;
    height: 68px;
    `};
  `}
  ${media.tablet`
    ~ div {
        margin-left: -1px;
        margin-top: 0;
    }
    ${props =>
      props.type === "QuickUpdates" &&
      `
      min-width: 390px;
      `};
  `}
  ${props =>
    props.isCarousel &&
    `
      ~ div {
        margin-top: 0;
      }
    `}
  ${props =>
    props.collapsed &&
    ` 
      animation-fill-mode: forwards;
      ${media.tablet`
        padding: 0;
      `};
      -ms-flex: 0;
      @keyframes alertCollapseLastTile1 {
        from{
          flex: 1;
        }
        to {
          margin: 0px; 
          min-width:0px;
          flex: 0;   
        }         
      }
        animation-name: alertCollapseLastTile1;
        animation-duration: 2s;
        animation-delay: 2s;
    `}
    ${props =>
      props.reduced &&
      `
        padding: 0 !important;
      ${media.tablet`
          padding: 0;
        `};
      `}
  ${props =>
    props.alertMode &&
    `
    animation-fill-mode: forwards;
    -ms-flex: 2;
    @keyframes alertExpansion {
      from {
        flex:1;
      }
      to {
    flex:2;
      }
      }
      animation-name: alertExpansion;
      animation-duration: 2s;
      animation-delay: 2s;
    `}
  ${props =>
    !props.alertMode &&
    !props.collapsed &&
    `
      flex: 1;
    `}
`;
