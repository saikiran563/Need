import React from 'react'
import styled, { css } from 'styled-components'
import NewlineBreak from '../../util/NewlineBreak'
import { media } from '../../util/style'

const TileHeader = ({
  alertMode,
  device,
  lightMode,
  overline,
  image,
  headline,
  subheader,
  subheaderline2,
  barExplain,
  dataUsed,
  dataUsedInfo,
  alertCopyHeading,
  icon,
  video,
  numSlides,
  isCarousel,
  isAnswerTile,
}) => {
  const overlineComp = overline ? (
    <H5
      alertMode={alertMode}
      lightMode={lightMode}
      isCarousel={isCarousel}
      device={device}
    >
      {overline}
    </H5>
  ) : null

  const headlineComp = headline ? (
    <H2
      alertMode={alertMode}
      device={device}
      image={typeof image !== 'undefined'}
      lightMode={lightMode}
      numSlides={numSlides}
      isAnswerTile={isAnswerTile}
    >
      {NewlineBreak(headline)}
    </H2>
  ) : null

  const subheaderComp = subheader ? (
    <P
      alertMode={alertMode}
      lightMode={lightMode}
      video={video}
      isAnswerTile={isAnswerTile}
      device={device}
    >
      {NewlineBreak(subheader)}
    </P>
  ) : null

  const subheaderComp2 = subheaderline2 ? (
    <P
      alertMode={alertMode}
      lightMode={lightMode}
      video={video}
      device={device}
    >
      {NewlineBreak(subheaderline2)}
    </P>
  ) : null

  const barExplainComp = barExplain ? (
    <H4
      alertMode={alertMode}
      lightMode={lightMode}
      video={video}
      isAnswerTile={isAnswerTile}
      device={device}
    >
      {NewlineBreak(barExplain)}
    </H4>
  ) : null

  const alertCopyHeadingComp = alertCopyHeading ? (
    <P alertMode={alertMode} lightMode={lightMode}>
      {NewlineBreak(alertCopyHeading)}
    </P>
  ) : null

  const iconComp = icon ? (
    <Icon
      icon={this.props.icon}
      className={classNames({
        'vz-odt--tile__icon': true,
        'alert-mode': alertMode,
      })}
    />
  ) : null

  return (
    <div>
    <StyledTileHeader>
      {overlineComp}
      {headlineComp}
      {subheaderComp}
      {barExplainComp}
      {subheaderComp2}
      {iconComp}
    </StyledTileHeader>

<styledT>

</styledT>

    </div>
  )
}

const StyledTileHeader = styled.div`
  margin-bottom: 0rem;
  color: #000000;
  padding: 0;
`

const styledT = styled.div`
  margin-bottom: 12px;
  color: #000000;
  padding: 0;
  font-size: 14px;
`



const H2 = styled.h2`
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
  ${media.tablet`
    font-size: ${props =>
      (props.numSlides === 3 || props.isAnswerTile) && !props.device === true
        ? '2.75rem'
        : '2rem'};
  `}; 
  ${props =>
    props.device &&
    `
    margin-bottom: 0rem;
    font-size: 1.2rem;
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
          height: 4.1875rem;
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
`

const H4 = styled.h4`
  height: 1.5rem;
  object-fit: contain;
  font-family: NHaasGroteskDSStd-55Rg;
  font-size: 0.9rem;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.2;
  letter-spacing: normal;
  text-align: left;
  margin-top: 1.25rem;
  text-decoration: underline;
`

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
  color: #000000;
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
  ${props =>
    props.lightMode &&
    `
      color: #ffffff;
    `};
  ${media.mobile`
    font-size: 1rem;
  `};
  ${props =>
    props.device &&
    `
    margin-bottom: 0.8rem;
    object-fit: contain;
    font-family: NHaasGroteskDSStd-75Bd;
    font-size: 2.125rem;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: 0.95;
    letter-spacing: normal;
    text-align: left;
    color: #000;
    `};
`

const P = styled.p`
  font-family: 'NeueHaasGroteskText', Arial, Helvetica, sans-serif;
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
      font-family: 'NeueHaasGroteskText', Arial;
      color: #000;
      font-size: 14px;
      font-weight: 0;
      padding-top: 120px;
      

    `};
`

export default TileHeader
