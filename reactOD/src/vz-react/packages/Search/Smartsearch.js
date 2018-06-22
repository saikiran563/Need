import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Autosuggest from 'react-autosuggest'
import match from 'autosuggest-highlight/match'
import parse from 'autosuggest-highlight/parse'

//import Typist from 'react-typist';
import Typist from '../Typist/Typist'

import './Search.css'
import { ICONS } from '../Icon/Icon-assets'
import Icon from '../Icon/Icon'
import { media } from '../../util/style'
import styled, { css, keyframes } from 'styled-components'

import classNames from 'classnames'

// https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Regular_Expressions#Using_Special_Characters
function escapeRegexCharacters(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function getSuggestions(value, suggList) {
  const escapedValue = escapeRegexCharacters(value.trim())

  if (escapedValue === '') {
    return []
  }

  const regex = new RegExp('^' + escapedValue, 'i')

  return suggList.filter(suggestItem => regex.test(suggestItem))
}

function getSuggestionValue(suggestion) {
  return suggestion
}

function renderSuggestion(suggestion, { query }) {
  const matches = match(suggestion, query)
  const parts = parse(suggestion, matches)

  return (
    <span>
      {parts.map((part, index) => {
        const className = part.highlight
          ? 'react-autosuggest__suggestion-match'
          : null
        return (
          <span className={className} key={index}>
            {part.text}
          </span>
        )
      })}
    </span>
  )
}

export default class Smartsearch extends Component {
  constructor() {
    super()

    this.state = {
      value: '',
      suggestions: [],
      buildState: true,
      inFocus: false,
    }
  }

  static propTypes = {
    placeHolderText: PropTypes.string,
    suggestionsList: PropTypes.array,
    id: PropTypes.string,
    onChange: PropTypes.func,
    onSubmit: PropTypes.func,
  }

  static defaultProps = {
    placeHolderText: '',
    onChange: () => {},
    onSubmit: () => {},
    onFocus: () => {},
    suggestionsList: [],
  }

  handleFocus = event => {
    this.props.onFocus(event)
  }

  handleChange = (event, { newValue, method }) => {
    this.setState({
      value: newValue,
    })

    console.log('onChange method = ' + method)

    this.input_bottomline.innerText = newValue
    if (!this.suggestionSelected && method !== 'click')
      this.props.onChange(newValue)
  }

  onSuggestionSelected = (
    event,
    { suggestion, suggestionValue, suggestionIndex, sectionIndex, method }
  ) => {
    this.suggestionSelected = true
    console.log('suggestion selected')
    this.props.onSubmit(suggestion)
  }

  onSuggestionsFetchRequested = ({ value }) => {
    //console.log('list : ' + this.props.suggestionsList);
    this.setState({
      suggestions: getSuggestions(value, this.props.suggestionsList),
    })
  }

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: [],
    })
  }

  handleClear = () => {
    this.input_bottomline.innerText = this.autoSuggest.input.value = ''
    this.handleChange(null, { newValue: '' })
  }

  handleTypingDone = event => {
    this.setState({
      buildState: false,
    })
  }

  handleKeyup = event => {
    //console.log('keyup : ' + event.keyCode);
    if (event.keyCode == '13') {
      this.props.onSubmit(this.state.value)
    }
  }

  render() {
    const { value, suggestions } = this.state

    const {
      id,
      placeHolderText,
      suggestionsList,
      isActive,
      ...other
    } = this.props

    const inputProps = {
      placeholder: '',
      'aria-label': this.props.placeHolderText,
      value,
      onChange: this.handleChange,
      onFocus: this.handleFocus,
      onKeyDown: this.handleKeyup,
    }

    const micButton = (
      <button className="vz-odt--smartsearch-chat">
        <Icon icon={ICONS.CHAT} className="vz-odt--smartsearch-chat__icon" />
      </button>
    )

    //Set clear button class based on input value
    const clearBtnClasses = classNames({
      'vz-odt--search-clear': true,
      'is-visible': value != '',
    })

    const clearButton = (
      <button
        className={clearBtnClasses}
        type="button"
        onClick={this.handleClear}
      >
        <Icon icon={ICONS.CANCEL} className="vz-odt--search-clear__icon" />
      </button>
    )

    const autoSuggest = this.state.buildState ? (
      ''
    ) : (
      <Autosuggest
        suggestions={suggestionsList}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        onSuggestionSelected={this.onSuggestionSelected}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
        ref={Autosuggest => {
          this.autoSuggest = Autosuggest
        }}
      />
    )

    const typist = (
      <Typist
        className={classNames('vz-odt--smartsearch__input__typist')}
        //avgTypingDelay={30}
        typingSpeed={200}
        startDelay={200}
        onTypingDone={this.handleTypingDone}
        key={placeHolderText}
      >
        {placeHolderText}
      </Typist>
    )

    return (
      <div className="vz-odt--smartsearch">
        <Baseline inFocus={isActive} value={this.state.value} />
        <span
          contentEditable
          className="vz-odt--search-input-bottomline_highlight"
          disabled
          tabIndex="-1"
          aria-hidden="true"
          ref={span => {
            this.input_bottomline = span
          }}
        />
        {autoSuggest}
        {typist}
        {micButton}
        {clearButton}
      </div>
    )
  }
}
const Baseline = styled.input.attrs({
  disabled: 'true',
})`
  animation: 1s ease-out 0s 1 increaseWidth;
  position: absolute;
  top: 2px;
  border-bottom-color: #000000;
  color: #ffffff;
  ${props =>
    props.inFocus &&
    !props.value &&
    `
      border-bottom-color: #D52B1E !important;
    `};
  border-bottom-style: solid;
  border-width: 0 0 2px 0;
  width: 100%;
  background: transparent;
  height: 4.5rem;
  ${media.mobile`
    height:2.75rem;
  `};
  background: transparent;
  overflow: hidden;
`
