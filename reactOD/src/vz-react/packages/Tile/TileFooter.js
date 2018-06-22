import React from 'react'
import styled, { css } from 'styled-components'
import Button from '../Button/Button'
import BarGraph from '../Graph/BarGraph'

const TileFooter = ({
  ctaBtnText,
  ctaBtnText2,
  image,
  video,
  fullscreenImage,
  ctaClick,
  alertMode,
  barValue,
  barBaseValue,
  barLabelText,
  barValueExplain,
  headline,
}) => {
  const CATcomp = !ctaBtnText ? (
    <Button
      onClick={ctaClick}
      kind={Button.BUTTON_TYPE.CHEVRON_CTA}
      inverted={alertMode}
      aria-label={headline}
      role={'link'}
    />
  ) : (
    <Button
      onClick={ctaClick}
      kind={Button.BUTTON_TYPE.PRIMARY}
      inverted={alertMode}
      type={'LIVE_TILE'}
    >
      {ctaBtnText}
    </Button>
  )

  const CATcomp2 = ctaBtnText2 && (
    <Button
      onClick={ctaClick}
      kind={Button.BUTTON_TYPE.SECONDARY}
      inverted={alertMode}
    >
      {ctaBtnText2}
    </Button>
  )
  const bargraph =
    barValue && barBaseValue ? (
      <BarGraph
        barValue={barValue}
        barBaseValue={barBaseValue}
        barLabelText={barLabelText}
        barValueExplain={barValueExplain}
      />
    ) : null
  return (
    <StyledTileFooter ctaBtnText={ctaBtnText} image={image}>
      {!image && !video && !fullscreenImage ? CATcomp : null}
      <StyledCATcomp2>
        {!image && !video && !fullscreenImage ? CATcomp2 : null}
      </StyledCATcomp2>
      {bargraph}
    </StyledTileFooter>
  )
}

const StyledCATcomp2 = styled.span`
  margin-left: 20px;
`
const StyledTileFooter = styled.div`
  position: absolute;
  width: 100%;
  right: 0;
  bottom: 0;
  padding: 0;
  text-align: ${props => (props.ctaBtnText ? 'left' : 'right')};
  ${props =>
    props.image &&
    `
      margin-bottom: 1.875rem;
    `};
`

export default TileFooter
