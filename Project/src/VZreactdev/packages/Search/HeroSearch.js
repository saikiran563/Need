import React, { Component } from "react";
import PropTypes from "prop-types";
import "./Search.css";
import Button from "../Button/Button";
import SmartSearch from "./Smartsearch";
import Icon from "../Icon/Icon";
import AnimationTextWave from "../../util/AnimationTextWave";
import { ICONS } from "../Icon/Icon-assets";
import styled, { css, keyframes } from "styled-components";
import ReactHtmlParser from "react-html-parser";
import { desktop_min, media, isMobile, isDesktop } from "../../util/style.js";
import classNames from "classnames";

export default class HeroSearch extends Component {
  constructor() {
    super();

    this.state = {
      value: "",
      isInputFocused: false
    };
  }

  static propTypes = {
    chatNowCTAtext: PropTypes.string,
    username: PropTypes.string,
    placeHolderText: PropTypes.string,
    suggestionsList: PropTypes.array,
    id: PropTypes.string,
    onChange: PropTypes.func,
    onSubmit: PropTypes.func,
    onFocus: PropTypes.func,
    className: PropTypes.string,
    onRequestClose: PropTypes.func
  };

  static defaultProps = {
    username: "",
    chatNowCTAtext: "Chat Now",
    placeHolderText: "How can we help you?",
    id: "hero-search-1",
    onChange: () => {},
    onSubmit: () => {},
    onFocus: () => {}
  };

  componentWillMount() {
    window.reactGlobals.openSearch = () => {
      this.handleInputFocus();
    };
    window.reactGlobals.closeSearch = () => {
      this.handleCloseRequest();
    };
  }

  handleChange = val => {
    this.setState({
      value: val
    });

    this.props.onChange(val);
  };

  handleSubmit = val => {
    this.props.onSubmit(val);
  };

  handleInputFocus = event => {
    this.setState({
      isInputFocused: true
    });
    this.props.onFocus(event);
  };

  handleCloseRequest = event => {
    this.setState({
      isInputFocused: false
    });

    this.smartSearch.handleClear();
    this.props.onRequestClose(event);
  };

  handleKeyPress = event => {
    if (event.keyCode === 27) {
      this.setState({
        isInputFocused: false
      });

      this.smartSearch.handleClear();
      this.props.onRequestClose(event);
    }
  };

  render() {
    const { value } = this.state;

    const {
      chatNowCTAtext,
      username,
      placeHolderText,
      suggestionsList,
      isFetching,
      suggestionsVisible,
      id,
      ...other
    } = this.props;

    const props = {
      isInputFocused: this.state.isInputFocused
    };

    const heroSearchClass = classNames({
      "vz-odt--herosearch": true,
      [this.props.className]: this.props.className
    });

    const greetingClassName = classNames({
      "vz-odt--herosearch--greeting": true,
      "is-inactive": this.state.isInputFocused /**value != ''**/
    });

    const closeBtn = (
      <button
        aria-label="Close overlay"
        className={classNames({
          "vz-odt--herosearch--modal-close": true,
          "is-active": props.isInputFocused
        })}
        onClick={this.handleCloseRequest}
        onKeyDown={this.handleKeyPress}
      >
        <Icon icon={ICONS.CROSS} className="vz-odt--modal-close__icon" />
      </button>
    );

    return (
      <VzSearch inFocus={this.state.isInputFocused} className={heroSearchClass}>
        <div
          ref={div => {
            this.greeting = div;
          }}
          className={greetingClassName}
        >
          <SearchH1Header>
            <AnimationTextWave>
              {!reactGlobals.flowTypeNm &&
                (reactGlobals.discoverHubHeader
                  ? reactGlobals.discoverHubHeader
                  : isMobile
                    ? " "
                    : username
                      ? `Hey, ${username}.`
                      : `Hey`)}
            </AnimationTextWave>
          </SearchH1Header>
        </div>
        <SmartSearch
          ref={SmartSearch => {
            this.smartSearch = SmartSearch;
          }}
          placeHolderText={placeHolderText}
          suggestionsList={suggestionsList}
          onChange={this.handleChange}
          onSubmit={this.props.onSubmit}
          onFocus={this.handleInputFocus}
          isActive={this.state.isInputFocused}
          id={id}
          isFetching={isFetching}
          suggestionsVisible={suggestionsVisible}
        />
        {/*<Button
          className="vz-odt--herosearch--CTA-button"
          kind={Button.BUTTON_TYPE.TEXT_CHEVRON_CTA}
        >
          {chatNowCTAtext}
        </Button>*/}
        {closeBtn}
      </VzSearch>
    );
  }
}
const VzSearch = styled.div`
    ${props =>
      !props.inFocus &&
      media.mobile`
      padding-left: 20px !important;
      padding-right: 20px !important;
    `};}
`;
const SearchH1Header = styled.h2`
  font-family: "NeueHaasGroteskDisplayBold", Arial, Helvetica, sans-serif;
  color: #000000;
  font-size: 4rem;
  ${media.mobile`
    font-size:1.56rem;
    `};
  line-height: 4rem;
  letter-spacing: 0.0625rem;
  margin: 0 0 1.5rem 0;
`;

