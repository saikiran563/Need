import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { debounce } from 'lodash'
import styled, { css } from 'styled-components'

import HeroSearch from 'vz-odt-modules/Search/HeroSearch'
import Tile from 'vz-odt-modules/Tile/Tile'
import Button from 'vz-odt-components/Button/Button'
import Icon from 'vz-odt-components/Icon/Icon'
import { ICONS } from 'vz-odt-components/Icon/Icon-assets'

import 'vz-odt-components/Modal/Modal.css'

import SearchModal from './SmartSearchModal'
import TrendingTileGroup from './TrendingTileGroup'
import AnswerTileGroup from './AnswerTileGroup'

import { desktop_min, media } from '../../../vz-react/util/style.js'

export default class SmartSearch extends Component {
  constructor(props) {
    super(props)

    this.state = {
      herosearchSubmitted: false,
      herosearchFocused: false,
      herosearchChanged: false,
      isOpen: false,
      searchEntered: '',
      isDevice: false,
      textRotator: undefined,
      placeHolderText: 'How can we help you?',
    }

    this.requestSuggestionsFetch = debounce(this.requestSuggestionsFetch, 2000)
  }

  static propTypes = {
    profile: PropTypes.object,
    suggestions: PropTypes.array,
    onFetchSuggestions: PropTypes.func.isRequired,
    trendingTiles: PropTypes.array,
    answerTiles: PropTypes.array,
    small: PropTypes.bool,
  }

  setTextRotationInterval = () => {
    if (
      Array.isArray(reactGlobals.rotatingTextArr) &&
      reactGlobals.rotatingTextArr.length > 0
    ) {
      let index = 0
      let textRotationInterval = setInterval(() => {
        if (index < reactGlobals.rotatingTextArr.length) {
          index = index + 1
        } else {
          index = 0
        }
        console.log(reactGlobals.rotatingTextArr[index])
        this.setState({
          placeHolderText: reactGlobals.rotatingTextArr[index],
        })
      }, 4000)
      this.setState({ textRotator: textRotationInterval })
    }
  }
  clearTextRotationInterval = () => {
    clearInterval(this.state.textRotator)
    this.setState({ textRotator: undefined })
  }

  componentWillMount() {
    this.setTextRotationInterval()
  }

  componentWillUnmount() {
    this.requestSuggestionsFetch.cancel()
  }

  handleHeroSearchFocus = event => {
    console.log('handleHeroSearchFocus')
    this.setState({
      isOpen: true,
      herosearchFocused: true,
    })
    this.clearTextRotationInterval()

    /*accessibiltiy*/
    setTimeout(() => {
      const modal = document.querySelector('#smartSearchSection')
      const focusableElements = modal.querySelectorAll(
        'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable]'
      )
      const firstItemTrap = focusableElements[1]
      const lastItemTrap = focusableElements[focusableElements.length - 1]

      firstItemTrap.focus()
      modal.addEventListener('keydown', trapTabKey)
      function trapTabKey(event) {
        if (event.keyCode === 9) {
          // Shift Tab
          if (event.shiftKey) {
            if (document.activeElement === firstItemTrap) {
              event.preventDefault()
              lastItemTrap.focus()
            }
            // Tab
          } else {
            if (document.activeElement === lastItemTrap) {
              event.preventDefault()
              firstItemTrap.focus()
            }
          }
        } else if (event.keyCode === 27) {
          handleClose = () => {
            this.setState({
              isOpen: false,
              isDevice: false,
              herosearchChanged: false,
            })
            this.setTextRotationInterval()
          }
        }
      }
    }, 1)
    /*accessibiltiy*/
  }

  handleHeroSearchChange = searchVal => {
    this.setState({
      herosearchSubmitted: false,
      searchEntered: searchVal,
      herosearchChanged: true,
      placeHolderText: '',
    })
    //console.log('handleHeroSearchChange: ', searchVal);
    searchVal && searchVal.trim() && this.requestSuggestionsFetch(searchVal) // debounced
    if (searchVal.length === 0) {
      this.setState({ placeHolderText: 'How can we help you?' })
    }
  }

  requestSuggestionsFetch = searchVal => {
    //console.log('*** requestSuggestionsFetch: ', searchVal);
    if (searchVal.length > 2) this.props.onFetchSuggestions(searchVal)
  }

  requestAnswersFetch = submittedVal => {
    if (submittedVal.length > 2)
      this.props.onFetchAnswers('search', submittedVal)
  }

  handleHeroSearchSubmit = submittedVal => {
    this.setState({
      herosearchSubmitted: true,
      searchEntered: submittedVal,
      herosearchChanged: false,
      isDevice: true,
    })
    //this.randomAlertModeSet = false;
    console.log('handleHeroSearchSubmit:', submittedVal)
    submittedVal &&
      submittedVal.trim() &&
      this.requestAnswersFetch(submittedVal)
  }

  handleClose = () => {
    this.setState({
      isOpen: false,
      isDevice: false,
      herosearchChanged: false,
    })
    this.setTextRotationInterval()
    document.querySelector('.vz-odt--header__section').focus()
  }

  render() {
    const {
      profile,
      suggestions,
      trendingTiles,
      answerTiles,
      isFetching,
      small,
    } = this.props
    //console.log('suggestions: ', suggestions);
    const heroSearchId = 'smartSearch'
    const placeHolderText = 'How can we help you?'
    const chatNowCTAtext = 'Chat Now'
    return (
      <span>
        {small && (
          <div onClick={window.reactGlobals.openSearch}>
            <SmallSearchBar>
              <SmallSearchBarInput>
                How can we help you?
                <SmallSearchBarIcon>
                  <Icon
                    icon={ICONS.CHAT}
                    className="vz-odt--smartsearch-chat__icon"
                  />
                </SmallSearchBarIcon>
              </SmallSearchBarInput>
            </SmallSearchBar>
          </div>
        )}
        <SmartSearchSection
          small={small}
          modalVisible={this.state.isOpen}
          id="smartSearchSection"
        >
          <SearchModal visible={this.state.isOpen} className="searchModalCtr" />
          {profile && (
            <HeroSearch
              className={classNames({ 'is-active': this.state.isOpen })}
              username={window.reactGlobals.greetingName}
              chatNowCTAtext={chatNowCTAtext}
              placeHolderText={this.state.placeHolderText}
              suggestionsList={suggestions}
              id={heroSearchId}
              onChange={this.handleHeroSearchChange}
              onSubmit={this.handleHeroSearchSubmit}
              onFocus={this.handleHeroSearchFocus}
              onRequestClose={this.handleClose}
            />
          )}
          <div className="trendingTileGroupCtr">
            <TrendingTileGroup
              trendingTiles={trendingTiles}
              mobileHeadLineStack={true}
              herosearchFocused={this.state.herosearchFocused}
              isOpen={this.state.isOpen && !this.state.isDevice}
              herosearchChanged={this.state.herosearchChanged}
            />
          </div>
          <AnswerTileGroup
            answerTiles={answerTiles}
            herosearchFocused={this.state.herosearchFocused}
            isOpen={this.state.isOpen && this.state.isDevice}
            herosearchChanged={this.state.herosearchChanged}
          />
        </SmartSearchSection>
      </span>
    )
  }
}

const SmartSearchSection = styled.section`
  outline: none;
  ${props => SmartSearchSectionHidden(props)};
`

const SmartSearchSectionHidden = props => {
  if (!props.small || (props.small && props.modalVisible)) {
    return css`
      min-height: 200px;
    `
  } else {
    return css`
      min-height: 0px;
      height: 0px;
      overflow: hidden;
    `
  }
}

const SmallSearchBar = styled.div`
  height: 60px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-left: 16px;
  padding-right: 16px;
  ${media.mobile`
    height:40px;
  `};
`

const SmallSearchBarInput = styled.div`
  border-bottom: 1px solid black;
  height: 100%;
  max-width: ${desktop_min - 32}px;
  width: 100%;
  display: flex;
  align-items: center;
  font-family: NHaasGroteskDSStd-75Bd;
  font-size: 24px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #747676;
  ${media.mobile`
    font-size: 12px;
    line-height: 0.92;
  `};
`

const SmallSearchBarIcon = styled.div`
  margin-left: auto;
  ${media.mobile`
      height: 1.25rem;
    `};
`
