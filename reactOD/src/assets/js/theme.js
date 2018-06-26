const breakPoints = {
  jumbo: { minWidth: '1020px', maxWidth: '' },
  large: { minWidth: '970px', maxWidth: '1019px' },
  medium: { minWidth: '421px', maxWidth: '969px' },
  small: { minWidth: '', maxWidth: '420px' },
}

const style = {
  breakPoints,
  mediaQueries: {
    jumbo: `(min-width: ${breakPoints.jumbo.minWidth})`,
    large: `(min-width: ${breakPoints.large.minWidth}) and (max-width: ${
      breakPoints.large.maxWidth
    })`,
    medium: `(min-width: ${breakPoints.medium.minWidth}) and (max-width: ${
      breakPoints.medium.maxWidth
    })`,
    small: `(max-width: ${breakPoints.small.maxWidth})`,
  },
}

export default style
