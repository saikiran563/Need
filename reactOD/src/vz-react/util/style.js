import { css } from 'styled-components'

export const desktop_min = 1272
export const tablet_min = 481
export const mobile_max = 480
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
  `,
}
