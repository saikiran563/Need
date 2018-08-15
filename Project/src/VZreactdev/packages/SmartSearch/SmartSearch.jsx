import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { debounce } from "lodash";
import styled, { css } from "styled-components";

import HeroSearch from "vz-odt-modules/Search/HeroSearch";
import Tile from "vz-odt-modules/Tile/Tile";
import Button from "vz-odt-components/Button/Button";
import Icon from "vz-odt-components/Icon/Icon";
import { ICONS } from "vz-odt-components/Icon/Icon-assets";

import "vz-odt-components/Modal/Modal.css";

import SearchModal from "./SmartSearchModal.jsx";
import TrendingTileGroup from "./TrendingTileGroup.jsx";
import AnswerTileGroup from "./AnswerTileGroup.jsx";

import { desktop_min, media, isMobile, isDesktop } from "../../util/style.js";

export default class SmartSearch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      herosearchSubmitted: false,
      herosearchFocused: false,
      herosearchChanged: false,
      isOpen: false,
      searchEntered: "",
      isDevice: false,
      textRotator: undefined,
      placeHolderText: "How can we help you?"
    };

    this.requestSuggestionsFetch = debounce(this.requestSuggestionsFetch, 2000);
  }

  static propTypes = {
    profile: PropTypes.object,
    suggestions: PropTypes.array,
    onFetchSuggestions: PropTypes.func.isRequired,
    trendingTiles: PropTypes.array,
    answerTiles: PropTypes.array,
    small: PropTypes.bool,
    conversationToken: PropTypes.string
  };
  pageLength = undefined;
  /**temp solution for july er, searhc modal should become an atual react router page */
  reducePageLength = () => {
    //debugger;
    if (jQuery && !this.pageLength) {
      let $page = jQuery("#app");
      let $search = jQuery("#smartSearchSection");
      jQuery("#vzw-gf").hide();
      if (isMobile) {
        jQuery("#vzw-gn").hide();
        jQuery("#notifbar").hide();
      }
      this.pageLength = $page.height();
      let btmSearch = isDesktop ? 582 : 1144;
      /** 
        $search.position().top +
        (isDesktop ? 200 : 140) +//height of search container
        (isDesktop ? 160 : 120) + //gnav**
        (isDesktop ? 320 : 808) + //height of tiles +
        (isDesktop ? 132 - 70 : 232); //height below last tile
        **/
      $page.height(btmSearch).css("overflow", "hidden");
    }
  };
  revertPageLength = pageLength => {
    //debugger;
    console.log("reverting page length to:" + pageLength);
    if (jQuery) {
      jQuery("#app")
        .css("overflow", "initial")
        .height(pageLength);
      jQuery("#vzw-gn").show();
      jQuery("#notifbar").show();
      jQuery("#vzw-gf").show();
      this.pageLength = undefined;
    }
  };

  setTextRotationInterval = () => {
    let rotTexts = reactGlobals.rotatingTextArr;
    if (isMobile && rotTexts && reactGlobals.greetingName) {
      rotTexts = [
        "Hey, " + reactGlobals.greetingName + ".",
        ...reactGlobals.rotatingTextArr
      ];
    }

    if (Array.isArray(rotTexts) && rotTexts.length > 0) {
      let index = 0;
      let textRotationInterval = setInterval(() => {
        if (index < rotTexts.length) {
          index = index + 1;
        } else {
          index = 0;
        }

        this.setState({
          placeHolderText: rotTexts[index]
        });
      }, 4000);
      this.setState({ textRotator: textRotationInterval });
    }
  };
  clearTextRotationInterval = () => {
    clearInterval(this.state.textRotator);
    this.setState({ textRotator: undefined });
  };

  componentWillMount() {
    this.setTextRotationInterval();
  }

  componentWillUnmount() {
    this.requestSuggestionsFetch.cancel();
  }

  handleHeroSearchFocus = event => {
    this.reducePageLength();
    this.props.onFetchToken();

    this.setState({
      isOpen: true,
      herosearchFocused: true
    });
    this.clearTextRotationInterval();

    /*accessibiltiy*/
    setTimeout(() => {
      const modal = document.querySelector("#smartSearchSection");
      const focusableElements = modal.querySelectorAll(
        'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable]'
      );
      const firstItemTrap = document.querySelector(
        ".react-autosuggest__input--focused"
      );
      const lastItemTrap = document.querySelector(
        ".vz-odt--herosearch--modal-close"
      );

      firstItemTrap.focus();
      modal.addEventListener("keydown", trapTabKey);
      function trapTabKey(event) {
        if (event.keyCode === 9) {
          // Shift Tab
          if (event.shiftKey) {
            if (document.activeElement === firstItemTrap) {
              event.preventDefault();
              lastItemTrap.focus();
            }
            // Tab
          } else {
            if (document.activeElement === lastItemTrap) {
              event.preventDefault();
              firstItemTrap.focus();
            }
          }
        } else if (event.keyCode === 27) {
          handleClose = () => {
            this.setState({
              isOpen: false,
              isDevice: false,
              herosearchChanged: false
            });
            this.setTextRotationInterval();
            window.scrollTo(0, 0);
          };
        }
      }
    }, 1);
    /*accessibiltiy*/
  };

  handleHeroSearchChange = searchVal => {
    this.setState({
      herosearchSubmitted: false,
      searchEntered: searchVal,
      herosearchChanged: true,
      placeHolderText: ""
    });

    searchVal && searchVal.trim() && this.requestSuggestionsFetch(searchVal); // debounced
    if (searchVal.length === 0) {
      this.setState({ placeHolderText: "How can we help you?" });
    }
  };

  requestSuggestionsFetch = searchVal => {
    if (searchVal.length > 2) this.props.onFetchSuggestions(searchVal);
  };

  requestAnswersFetch = (submittedVal, conversationToken) => {
    /**if (submittedVal.length > 2)**/
    this.props.onFetchAnswers("search", submittedVal, conversationToken);
  };

  handleHeroSearchSubmit = submittedVal => {
    this.setState({
      herosearchSubmitted: true,
      searchEntered: submittedVal,
      herosearchChanged: false,
      isDevice: true,
      herosearchFocused: false
    });

    submittedVal &&
      submittedVal.trim() &&
      this.requestAnswersFetch(submittedVal, this.props.conversationToken);
  };

  handleClose = () => {
    this.revertPageLength(this.pageLength);
    this.setState({
      isOpen: false,
      isDevice: false,
      herosearchChanged: false
    });
    this.setTextRotationInterval();
    document.querySelector(".vz-odt--header__section").focus();
    window.scrollTo(0, 0);
  };

  render() {
    const {
      profile,
      suggestions,
      trendingTiles,
      answerTiles,
      isFetching,
      suggestionsVisible,
      small
    } = this.props;

    const heroSearchId = "smartSearch";
    const placeHolderText = "How can we help you?";
    const chatNowCTAtext = "Chat Now";
    return (
      <span>
        {small &&
          !this.state.isOpen && (
            <React.Fragment>
              <div
                onClick={window.reactGlobals.openSearch}
                Style="margin-bottom:2rem;"
              >
                <SmallSearchBar>
                  <SmallSearchBarInput>
                    How can we help you?
                    <SmallSearchBarIcon>
                      <Icon
                        icon={ICONS.MAGNIFIER}
                      className={isMobile?"vz-odt--smartsearch-chat__iconsmall":"vz-odt--smartsearch-chat__icon"}
                        aria-label="chat icon"
                        role="chat"
                      />
                    </SmallSearchBarIcon>
                  </SmallSearchBarInput>
                </SmallSearchBar>
              </div>
            </React.Fragment>
          )}
        <SmartSearchSection
          small={small}
          modalVisible={this.state.isOpen}
          id="smartSearchSection"
        >
          <SearchModal visible={this.state.isOpen} className="searchModalCtr" />
          {profile && (
            <HeroSearch
              className={classNames({ "is-active": this.state.isOpen })}
              username={window.reactGlobals.greetingName}
              chatNowCTAtext={chatNowCTAtext}
              placeHolderText={this.state.placeHolderText}
              suggestionsList={suggestions}
              id={heroSearchId}
              onChange={this.handleHeroSearchChange}
              onSubmit={this.handleHeroSearchSubmit}
              onFocus={this.handleHeroSearchFocus}
              onRequestClose={this.handleClose}
              isFetching={isFetching}
              suggestionsVisible={suggestionsVisible}
            />
          )}
          <div className="trendingTileGroupCtr">
            <TrendingTileGroup
              trendingTiles={trendingTiles}
              mobileHeadLineStack={true}
              herosearchFocused={this.state.herosearchFocused}
              isOpen={this.state.isOpen && !this.state.isDevice}
              herosearchChanged={this.state.herosearchChanged}
              herosearchValue={
                this.state.searchEntered ? this.state.searchEntered : ""
              }
            />
          </div>
          <AnswerTileGroup
            answerTiles={answerTiles}
            herosearchFocused={this.state.herosearchFocused}
            isOpen={this.state.isOpen && this.state.isDevice}
            herosearchChanged={this.state.herosearchChanged}
            herosearchValue={
              this.state.searchEntered ? this.state.searchEntered : ""
            }
          />
        </SmartSearchSection>
      </span>
    );
  }
}

const SmartSearchSection = styled.section`
  outline: none;
  ${props => SmartSearchSectionHidden(props)};
`;

const SmartSearchSectionHidden = props => {
  if (!props.small || (props.small && props.modalVisible)) {
    return css`
      ${media.desktop`
        min-height: 200px;
      `};
    `;
  } else {
    return css`
      min-height: 0px;
      height: 0px;
      overflow: hidden;
    `;
  }
};

const SmallSearchBar = styled.div`
  height: 60px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-left: 16px;
  padding-right: 16px;
  cursor: auto;
  ${media.mobile`
    height:40px;
  `};
`;

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
  cursor: pointer;
  ${media.mobile`
    font-size: 12px;
    line-height: 0.92;
  `};
`;

const SmallSearchBarIcon = styled.div`
  margin-left: auto;
  ${media.mobile`
      height: 1.25rem;
    `};
`;
