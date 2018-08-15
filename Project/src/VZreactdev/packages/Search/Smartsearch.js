import React, { Component } from "react";
import PropTypes from "prop-types";

import Autosuggest from "react-autosuggest";
import match from "autosuggest-highlight/match";
import parse from "autosuggest-highlight/parse";

//import Typist from 'react-typist';
import Typist from "../Typist/Typist";

import "./Search.css";
import { ICONS } from "../Icon/Icon-assets";
import Icon from "../Icon/Icon";
import { media, isMobile } from "../../util/style";
import styled, { css, keyframes } from "styled-components";

import classNames from "classnames";
import AnimationTextRise from "../../util/AnimationTextRise";

// https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Regular_Expressions#Using_Special_Characters
function escapeRegexCharacters(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

const getSuggestions = (value, suggList) => {
  i = 0;
  const escapedValue = escapeRegexCharacters(value.trim());

  if (escapedValue === "") {
    return [];
  }

  const regex = new RegExp("^" + escapedValue, "i");

  return suggList.filter(suggestItem => regex.test(suggestItem));
};

const getSuggestionValue = suggestion => {
  return suggestion;
};

let i = 0;
const renderSuggestion = (suggestion, { query }) => {
  const matches = match(suggestion, query);
  const parts = parse(suggestion, matches);
  i++;

  return (
    <AnimationTextRise customDelay={i / 20}>
      <span>
        {parts.map((part, index) => {
          const className = part.highlight
            ? "react-autosuggest__suggestion-match"
            : null;
          return (
            <span className={className} key={index}>
              {part.text}
            </span>
          );
        })}
      </span>
    </AnimationTextRise>
  );
};

export default class Smartsearch extends Component {
  constructor() {
    super();

    this.state = {
      value: "",
      suggestions: [],
      buildState: true,
      inFocus: false,
      suggestionsVisible: false
    };
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ suggestionsVisible: nextProps.suggestionsVisible });
  }

  static propTypes = {
    placeHolderText: PropTypes.string,
    suggestionsList: PropTypes.array,
    id: PropTypes.string,
    onChange: PropTypes.func,
    onSubmit: PropTypes.func
  };

  static defaultProps = {
    placeHolderText: "",
    onChange: () => {},
    onSubmit: () => {},
    onFocus: () => {},
    suggestionsList: []
  };

  handleFocus = event => {
    this.props.onFocus(event);
  };

  handleChange = (event, { newValue, method }) => {
    this.setState({
      value: newValue
    });
    i = 0;

    this.input_bottomline.innerText = newValue;
    //if (!this.suggestionSelected && method !== 'click')
    this.props.onChange(newValue);
  };

  onSuggestionSelected = (
    event,
    { suggestion, suggestionValue, suggestionIndex, sectionIndex, method }
  ) => {
    this.suggestionSelected = true;

    this.props.onSubmit(suggestion);
  };

  onSuggestionsFetchRequested = ({ value }) => {
    //console.log('list : ' + this.props.suggestionsList);
    this.setState({
      suggestions: getSuggestions(value, this.props.suggestionsList)
    });
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  handleClear = () => {
    this.input_bottomline.innerText = this.autoSuggest.input.value = "";
    this.handleChange(null, { newValue: "" });
  };

  handleTypingDone = event => {
    this.setState({
      buildState: false
    });
    i = 0;
  };

  handleKeyup = event => {
    //console.log('keyup : ' + event.keyCode);
    if (event.keyCode == "13" && this.state.value) {
      this.props.onSubmit(this.state.value);
      i = 0;
    }
    this.setState({ suggestionsVisible: false });
  };

  handleIconClick = () => {
    if (this.state.value) {
      this.props.onSubmit(this.state.value);
      i = 0;
    }
    this.setState({ suggestionsVisible: false });
  };
  render() {
    //accessibility add react-autosuggestion id
    setTimeout(function() {
      document
        .querySelectorAll(".react-autosuggest__container")[0]
        .setAttribute("id", "autosuggestion");
    }, 1);

    const { value, suggestions } = this.state;

    const {
      id,
      placeHolderText,
      suggestionsList,
      isActive,
      suggestionsVisible,
      ...other
    } = this.props;

    const inputProps = {
      placeholder: "",
      "aria-label": this.props.placeHolderText,
      value,
      onChange: this.handleChange,
      onFocus: this.handleFocus,
      onKeyDown: this.handleKeyup
    };

    const micButton = (
      <button
        className="vz-odt--smartsearch-chat"
        onClick={this.handleIconClick}
        aria-label="search button"
        role="search"
      >
        <Icon
          icon={ICONS.MAGNIFIER}
          className="vz-odt--smartsearch-chat__icon"
        />
      </button>
    );
    const shouldRenderSuggestions = () => {
      return this.state.suggestionsVisible && this.state.value.length > 2;
    };

    //Set clear button class based on input value
    const clearBtnClasses = classNames({
      "vz-odt--search-clear": true,
      "is-visible": value != ""
    });

    const clearButton = (
      <button
        className={clearBtnClasses}
        type="button"
        onClick={this.handleClear}
      >
        <Icon icon={ICONS.CANCEL} className="vz-odt--search-clear__icon" />
      </button>
    );

    const autoSuggest = this.state.buildState ? (
      ""
    ) : (
      <div>
        <label
          for="autosuggestion"
          htmlFor="autosuggestion"
          className="AutoSuggesthidden"
        >
          Ask your question here
        </label>
        <Autosuggest
          name="autosuggestion"
          suggestions={suggestionsList}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          onSuggestionSelected={this.onSuggestionSelected}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          inputProps={inputProps}
          focusInputOnSuggestionClick={false}
          shouldRenderSuggestions={shouldRenderSuggestions}
          ref={Autosuggest => {
            this.autoSuggest = Autosuggest;
          }}
        />
      </div>
    );

    const typist = (
      <TypistContainer inFocus={this.props.isActive}>
        <Typist
          className={
            this.props.isActive
              ? classNames("vz-odt--smartsearch__input__typist")
              : reactGlobals.discoverHubHeader
                ? classNames(
                    "vz-odt--smartsearch__input__typist vz-odt--smartsearch__input__typist_mobile_header"
                  )
                : classNames(
                    "vz-odt--smartsearch__input__typist vz-odt--smartsearch__input__typist_mobile_noheader"
                  )
          }
          //avgTypingDelay={30}
          typingSpeed={200}
          startDelay={1}
          onTypingDone={this.handleTypingDone}
          key={placeHolderText}
        >
          {placeHolderText}
        </Typist>
      </TypistContainer>
    );

    return (
      <div className="vz-odt--smartsearch">
        <Baseline
          inFocus={isActive}
          value={this.state.value}
          aria-label="How can we help you?"
        />
        <span
          contentEditable
          className="vz-odt--search-input-bottomline_highlight"
          disabled
          tabIndex="-1"
          aria-hidden="true"
          ref={span => {
            this.input_bottomline = span;
          }}
        />
        {autoSuggest}
        {typist}
        {isMobile ? !isActive && micButton : micButton}
        {clearButton}
      </div>
    );
  }
}

const TypistContainer = styled.div`
    ${props =>
      props.inFocus &&
      media.mobile`
      padding-left: 20px !important;
    `};}
`;

const Baseline = styled.input.attrs({
  disabled: "true"
})`
  animation-name: increaseWidth;
  animation-duration: 0.7s;
  animation-timing-function: ease-out;
  animation-delay: 0.3s;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
  position: absolute;
  top: 2px;
  border-bottom-color: #000000;
  color: #ffffff;
  ${props =>
    props.inFocus &&
    !props.value &&
    media.desktop`
      border-bottom-color: #D52B1E !important;
    `};
  ${props =>
    props.inFocus &&
    !props.value &&
    media.mobile`
      border-bottom-color:#D52B1E !important;
        border-width: 0 0 1px 0 !important;
    `};
  border-bottom-style: solid;
  width: 0%;
  border-width: 0 0 2px 0;
  background: transparent;
  height: 4.5rem;
  ${media.mobile`
    height:2.75rem;
   /* border-bottom-color: grey !important;*/
        border-width: 0 0 1px 0 !important;
  `};
  background: transparent;
  overflow: hidden;
`;
