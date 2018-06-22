import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import styled from 'styled-components'

import { TileGroup, Tile } from 'vz-odt-modules/Tile'
import SectionHeader from 'vz-odt-components/Header/SectionHeader'
import { FadeInTransition } from '../Transitions'

const QuickUpdates = ({ quickUpdateTiles, visible, isFetching }) => {
  const updateHeaderText = 'Quick update'
  const animatedIn = true
  const tileGroupComp = quickUpdateTiles.map((tile, index) => {
    return (
      <Tile
        key={'tile' + index}
        overline={_.get(tile, 'tileCategory')}
        headline={_.get(tile, 'tileSectionTop.tileHeader[0]')}
        subheader={''}
        ctaBtnText={''}
        ctaClick={() => {
          if (_.has(tile, 'tileSectionBottom.tileLink')) {
            window.location.href = _.get(tile, 'tileSectionBottom.tileLink')
          }
        }}
        alertMode={tile.alertMode}
        loading={isFetching}
        icon={undefined}
        trendingMode={false}
        animatedIn={animatedIn}
        animationDelay={index / 2 + 's'}
        image={undefined}
        barValue={tile.barValue}
        barBaseValue={tile.barBaseValue}
        barLabelText={tile.barLabelText}
        lightMode={tile.lightMode}
        fullscreenImage={tile.fullscreenImage}
      >
        {_.get(tile, 'tileSectionBottom.tileText') &&
          _.get(tile, 'tileSectionBottom.tileText').map(function(item, key) {
            return (
              <span key={key}>
                {item}
                <br />
              </span>
            )
          })}
      </Tile>
    )
  })

  return (
    <QuickUpdatesSection id="quickUpdatesSection">
      <FadeInTransition in={visible} duration={300} delay={300}>
        <div>
          <SectionHeader>{updateHeaderText}</SectionHeader>
          <TileGroup isCarousel={true}>{tileGroupComp}</TileGroup>
        </div>
      </FadeInTransition>
    </QuickUpdatesSection>
  )
}

const QuickUpdatesSection = styled.section`
  min-height: 460px;
`

export default QuickUpdates
