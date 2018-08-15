import React from "react";
import styled, { keyframes, css } from "styled-components";

export const FadeInAnimation = animationDelay => {
  return css`
    animation-name: ${FadeInKeyframes};
    animation-duration 800ms;
    animation-fill-mode: both, both;
    transition-timing-function: linear, ease-out;
  animation-delay: ${animationDelay};
  `;
};

export const FadeOutAnimation = ({ animationDelay }) => {
  return css`
    animation-name: ${FadeOutKeyframes};
    animation-duration 800ms;
    animation-fill-mode: both, both;
    transition-timing-function: linear, ease-out;
    animation-delay: ${animationDelay};
  `;
};
export const ScaleDownFadeInAnimation = () => {
  return css`
    animation: ${ScaleDownFadeInKeyframes} 0.6s 0.05s forwards;
  `;
};

const FadeInKeyframes = keyframes`
    from  {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0px);
    }
  `;

const FadeOutKeyframes = keyframes`
    from  {
      opacity: 1;
      top: 0;
    }
    to {
      opacity: 0;
      top: 60%
    }
  `;
const ScaleDownFadeInKeyframes = keyframes`
    from {transform: scale(1.3); opacity: 0;}
    to {transform: scale(1); opacity: 1;}
`;
