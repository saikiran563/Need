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

const BrowsePopular = ({ profile, popularTiles, visible }) => {
  const headerText = 'Browse popular'
  const animatedIn = true

  const tileGroupComp = popularTiles.map((item, index) => {
    return (
      <div
        style={{
          height: '160px',
          border: '1px solid lightgray',
          borderRight:
            (index + 1) % 3 === 0 || popularTiles.length === index + 1
              ? '1px solid lightgray'
              : 'none',
          borderTop: index > 2 ? 'none' : '1px solid lightgray',
          padding: '20px 16px',
          width: '33.33%',
          fontFamily: 'NHaasGroteskDSStd-75Bd", Arial, Helvetica, sans-serif',
        }}
      >
        <div>
          <a
            href={item.tileLink}
            style={{
              color: 'black',
              textDecoration: 'none',
              fontFamily: 'NHaasGroteskDSStd-75Bd',
              fontSize: '2rem',
              fontWeight: '400',
            }}
          >
            {item.heading}
          </a>
        </div>
        <div style={{ paddingTop: '3rem', position: 'relative', left: '95%' }}>
          <a href={item.tileLink}>
            <Button kind={Button.BUTTON_TYPE.CHEVRON_CTA} />
          </a>
        </div>
      </div>
    )
  })

  /*const tileGroupComp = popularTiles.map((tile, index) => {
    return (
      <Tile
        key={'tile' + index}
        overline={tile.overline}
        headline={tile.headline}
        subheader={tile.subheader}
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
    );
  }); */

  return (
    <section id="browsePopularSection">
      <FadeInTransition in={visible} duration={300} delay={50}>
        <div>
          <SectionHeader>{headerText}</SectionHeader>
          <TileGroup
            isCarousel={true}
            style={{ flexWrap: 'wrap', overflowX: 'hidden' }}
          >
            {tileGroupComp}
          </TileGroup>
        </div>
      </FadeInTransition>
    </section>
  )
}

export default withScrollAnimation({
  triggerId: 'browsePopularSection',
})(BrowsePopular)
