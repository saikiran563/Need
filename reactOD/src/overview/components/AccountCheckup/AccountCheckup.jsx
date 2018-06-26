import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import styled from 'styled-components'

import SectionHeader from 'vz-odt-components/Header/SectionHeader'
import { TileGroup, Tile } from 'vz-odt-modules/Tile'
import Button from 'vz-odt-components/Button/Button'

import Loader from '../Loader'
import withScrollAnimation from '../withScrollAnimation'
import { FadeInTransition } from '../Transitions'

const AccountCheckup = ({ profile, accountTiles, visible, onComplete }) => {
  //console.log('**** Devices: ', show);
  const headerText = 'Account checkup'
  const animatedIn = true

  const tileGroupComp = accountTiles.map((tile, index) => {
    return (
      <Tile
        key={'tile' + index}
        overline={tile.overline}
        headline={tile.headline}
        subheader={tile.subheader}
        ctaBtnText={tile.ctaBtnText}
        ctaClick={() => handleClickComplete(tile)}
        alertMode={tile.alertMode}
        icon={tile.icon}
        trendingMode={tile.trendingMode}
        animatedIn={animatedIn}
        animationDelay={index / 8 + 's'}
        barValue={tile.barValue}
        barBaseValue={tile.barBaseValue}
        barLabelText={tile.barLabelText}
        lightMode={tile.lightMode}
        fullscreenImage={tile.fullscreenImage}
      >
        {tile.content}
      </Tile>
    )
  })

  const handleClickComplete = tile => {
    //console.log('handleClickComplete: ', tile);
    onComplete(tile)
  }

  return (
    <AccountCheckupSection id="accountCheckupSection">
      <FadeInTransition in={visible} duration={300} delay={50}>
        <div>
          <SectionHeader>{headerText}</SectionHeader>
          <TileGroup isCarousel={true}>{tileGroupComp}</TileGroup>
        </div>
      </FadeInTransition>
    </AccountCheckupSection>
  )
}

const AccountCheckupSection = styled.section`
  /*opacity: ${props => (props.visible ? 1 : 0)};*/
`

export default withScrollAnimation({
  triggerId: 'accountCheckupSection',
})(AccountCheckup)
