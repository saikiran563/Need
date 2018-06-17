import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import styled from 'styled-components'

import SectionHeader from 'vz-odt-components/Header/SectionHeader'
import { TileGroup, Tile } from 'vz-odt-modules/Tile'
import Button from 'vz-odt-components/Button/Button'
import NewlineBreak from '../../../vz-react/util/NewlineBreak'

import Loader from '../Loader'
import withScrollAnimation from '../withScrollAnimation'
import { FadeInTransition } from '../Transitions'

const Devices = ({ profile, deviceTiles, visible, isFetching }) => {
  const devicesHeaderText = 'Your devices'
  const deviceTilesGroupCTAtext = 'My Profile'
  const animatedIn = true

  const tileGroupComp = deviceTiles.map((tile, index) => {
    /*const headlineFormat = (str) => {
      if(str&&((typeof str) == "string")){
        if( str.includes("Samsung Gusto")){str="Gusto 3"};
        if( str.includes("Galaxy")){ str='Galaxy S6'};
        if( str.includes("DROID TURBO")){ str='Droid Turbo'};
        if( str.includes("iPad")){ str='iPad 3'};
        if( str.includes("iPhone&reg; 6s")){ str='iPhone 6s'};
        if( str.includes("iPhone&reg; X")){ str='iPhone X'};
        if( str.includes("IPAD PRO")){ str='iPad Pro'};
        if( str.includes("iPhone&reg; 7 Plus")){ str='iPhone 7s'};
        if( str.charAt(0) =='V') { str ='Ellipsis 8'};
        return str
      }else{
        str='';
        return str;
      }
    } */
    const contentFormat = str => {
      if (str && typeof str == 'string') {
        str = str.replace(/\w\S*/g, function(txt) {
          return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
        })
        str = str.replace(/Gb/g, 'GB')
        str = str.split('#')
        return str
      } else {
        str = ''
        return str
      }
    }
    function toTitleCase(str, strhead) {
      if (str == '') {
        if (strhead.includes('Need to')) {
          return (str = 'Change Email Address')
        }
        if (strhead.includes('The perfect complement')) {
          return (str = 'Change Password')
        }
      }
      if (str && typeof str == 'string') {
        str = str.replace(/\w\S*/g, function(txt) {
          return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
        })
        console.log('-------------header---------------------------')
        console.log(strhead)
        console.log('-------------header---------------------------')
        var words = str.split(' ')
        str = words[0]
        return str
      } else {
        str = 'Need to add \n a device'
        return str
      }
    }
    const alertMode = tile.alertMode

    //const deviceCondition = ()=> {if(index ===(deviceTiles.length-1)){return false}else{return true}}
    const secondLineFTBorderCondition = index => {
      if (index === 3) {
        return true
      } else {
        return false
      }
    }
    const deviceHorizontalRuleCondition = str => {
      if (str && typeof str == 'string') {
        if (str.includes('Change') || str.includes('Manage') || str.includes('Account')) {
          return true
        } else {
          return false
        }
      } else return false
    }
    const sideImageCondition = index => {
      if (index === 2) {
        tile.fullscreenImage = tile.image
        tile.image = ''
        return true
      }
      if (index === 4) {
        if (tile.subheader) {
          return false
        } else {
          tile.fullscreenImage = tile.image
          tile.image = ''
          return true
        }
      }
    }
    const dataUsedCondition = dataUsed => {
      if (dataUsed) {
        dataUsed = parseFloat(dataUsed)
        dataUsed = dataUsed.toFixed(1).toString()
        return dataUsed + ' GB Data Used'
      } else if (dataUsed === '0.000GB') {
        return '0 GB Data Used'
      } else {
        dataUsed = ''
        return dataUsed
      }
    }

    const barLabelTextCondition = str => {
      if (str && typeof str == 'string') {
        var words = str.split('#')
        str = words[1]
        return str
      } else {
        str = ''
        return str
      }
    }
    const barValueExplainCondition = str => {
      if (str && typeof str == 'string') {
        var words = str.split('#')
        str = words[0]
        return str
      } else {
        str = ''
        return str
      }
    }

    return (
      <Tile
        device={true}
        // secondLineBorder={secondLineFTBorderCondition(index)}
        deviceHorizontalRule={deviceHorizontalRuleCondition(tile.overline)}
        // sideImageShow={sideImageCondition(index)}
        key={'tile' + index}
        overline={tile.overline}
        // headline={headlineFormat(tile.headline)}
        subheader={_.get(tile, 'subheader')}
        //  barExplain={barValueExplainCondition(tile.barLabelText)}
        // ctaBtnText={_.get(tile, 'ctaBtnText')}
        ctaClick={_.get(tile, 'ctaClick')}
        // alertMode={(tile.alertMode = false)}
        // icon={_.get(tile, 'icon')}
        // trendingMode={_.get(tile, 'trendingMode')}
        // animatedIn={animatedIn}
        // animationDelay={index / 2 + 's'}
        // dataUsed={dataUsedCondition(tile.dataUsed)}
        // image={_.get(tile, 'image')}
        barValue={_.get(tile, 'barValue')}
        // barBaseValue={_.get(tile, 'barBaseValue')}
        // barLabelText={barLabelTextCondition(tile.barLabelText)}
        //barValueExplain={barValueExplainCondition(tile.barLabelText)}
        lightMode={_.get(tile, 'lightMode')}
        fullscreenImage={_.get(tile, 'fullscreenImage')}
        loading={isFetching}
      >
        {/* NewlineBreak(contentFormat(tile.addOnPackages)) */}
      </Tile>
    )
  })

  return (
    <DevicesSection id="devicesSection">
      <FadeInTransition in={visible} duration={100} delay={100}>
        <div>
      
          <TileGroup
            isCarousel={true}
            device={true}
            onClick={() => {
              window.location.href = reactGlobals.deviceLandingUrl
            }}
          >
            {tileGroupComp}
          </TileGroup>
          <div style={{ textAlign: 'center' }}>
              
          </div>
        </div>
      </FadeInTransition>
    </DevicesSection>
  )
}

const DevicesSection = styled.section`
/*opacity: ${props => (props.visible ? 1 : 0)};*/
margin-bottom: 3.0rem;
`

export default withScrollAnimation({
  triggerId: 'devicesSection',
})(Devices)
