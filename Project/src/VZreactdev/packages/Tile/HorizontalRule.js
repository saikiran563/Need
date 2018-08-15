import React from "react";
import styled, { css } from "styled-components";

const HorizontalRule = ({
  device,
  deviceHorizontalRule,
  image,
  background,
  video,
  fullscreenImage,
  trendingMode,
  alertMode,
  hideHorizontalRule,
  isAnswerTile,
  type,
  barChartData
}) => {
  const horizontalRulComp =
    (!barChartData && !hideHorizontalRule && !device && !video && !fullscreenImage) ||
    (device && deviceHorizontalRule) ? (      
      <HR
        trendingMode={trendingMode}
        alertMode={alertMode}
        image={image}
        background={background}
        isAnswerTile={isAnswerTile}
        deviceHorizontalRule={deviceHorizontalRule}
        type={type}
      />      
    ) : null;
  return horizontalRulComp;
};

const HR = styled.hr`
  display: block;
  margin: 0;
  padding: 0;
  border: 0;
  height: 1px;
  position: absolute;
  top: 50%;
  width: 100%;
  border-top: 1px solid #000;
 
  ${props => 
    props.background === 'black' &&
    `
         border-top: 1px solid #FFF;
    `
  };
  ${props => 
    !props.background &&
    `
       border-top: 1px solid #000;
    `
  };
  ${props => 
    props.type === 'browsePopular' &&
    `
      display: none;
    `
  };
  ${props =>
    props.trendingMode &&
    `
      display: none;
    `};
  ${props =>
    props.isAnswerTile &&
    `
      display: none;
    `};
  ${props =>
    props.alertMode &&
    `
      animation-fill-mode: forwards;
      @keyframes alertHRColor {
        from {
          border-color: #000000;
        }
        to {
          border-color: #FFFFFF;
        }
      }
      animation-name: alertHRColor;
      animation-duration: 2s;
      animation-delay: 2s;
    `};
  ${props =>
    props.image &&
    `
      border-color: #cccccc;
    `};
  ${props =>
    props.deviceHorizontalRule &&
    `
      border-color: #000; 
      width: 100%;
    `};
`;

export default HorizontalRule;
