import { css } from "styled-components";

export const desktop_min = 1272;
export const tablet_min = 481;
export const mobile_max = 480;
export const media = {
  desktop: (...args) => css`
    @media only screen and (min-width: ${desktop_min}px) {
      ${css(...args)};
    }
  `,
  tablet: (...args) => css`
    @media only screen and (min-width: ${tablet_min}px) {
      ${css(...args)};
    }
  `,
  mobile: (...args) => css`
    @media only screen and (max-width: ${mobile_max}px) {
      ${css(...args)};
    }
  `
};
/** if device needs to be checked in javascript, use these functions */
export const isMobile =
  Math.max(document.documentElement.clientWidth, window.innerWidth || 0) <
  mobile_max + 1;
export const isTablet =
  Math.max(document.documentElement.clientWidth, window.innerWidth || 0) >
    mobile_max - 1 &&
  Math.max(document.documentElement.clientWidth, window.innerWidth || 0) <
    desktop_min + 1;
export const isDesktop =
  Math.max(document.documentElement.clientWidth, window.innerWidth || 0) >
  desktop_min - 1;
