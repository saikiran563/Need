import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import styled from 'styled-components'

import { TileGroup, Tile } from 'vz-odt-modules/Tile'
import Button from 'vz-odt-components/Button/Button'

const AnswerTileGroup = ({
  answerTiles,
  isOpen,
  herosearchChanged,
  herosearchFocused,
}) => {
  return (
    <React.Fragment>
      {herosearchFocused &&
        isOpen &&
        !herosearchChanged && (
          <React.Fragment>
            <TileGroup
              isCarousel={false}
              style={{ zIndex: 9000 }}
              isAnswerTile={true}
              >
              <AnswerTileList answerTiles={answerTiles} />
            </TileGroup>
            {answerTiles && (
              <MoreResultsButtonContainer>
                <MoreResultsButton kind={Button.BUTTON_TYPE.SECONDARY}>
                  See more results
                </MoreResultsButton>
              </MoreResultsButtonContainer>
            )}
          </React.Fragment>
        )}
    </React.Fragment>
  )
}

const AnswerTileList = ({ answerTiles }) => {
  const animatedIn = true
  return answerTiles
    ? answerTiles.map((tile, index) => {
      return (
        <Tile
          key={'tile' + index}
          overline={tile.overline}
          headline={tile.headline}
          subheader={tile.subheader}
          ctaBtnText={tile.ctaBtnText}
          ctaClick={() => {
            if (tile.link) {
              window.location.href = tile.link
            }
          } }
          alertMode={tile.alertMode}
          icon={tile.icon}
          trendingMode={tile.trendingMode}
          animatedIn={animatedIn}
          animationDelay={index / 8 + 's'}
          image={tile.image}
          barValue={tile.barValue}
          barBaseValue={tile.barBaseValue}
          barLabelText={tile.barLabelText}
          lightMode={tile.lightMode}
          fullscreenImage={tile.fullscreenImage}
          isAnswerTile={true}
          >
          {tile.content}
        </Tile>
      )
    })
    : null
}

const MoreResultsButtonContainer = styled.div`
  position: relative;
  max-width: 79.5rem;
  margin: 0 auto 0 auto;
`

const MoreResultsButton = styled(Button) `
  position: relative;
  z-index: 9020;
  margin-left: 1.25rem;
  margin-bottom: 2rem;
`

export default AnswerTileGroup
