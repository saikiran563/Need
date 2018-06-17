import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './Search.css'
import Button from '../Button/Button'
import SmartSearch from './Smartsearch'
import Icon from '../Icon/Icon'
import AnimationTextWave from '../../util/AnimationTextWave'
import { ICONS } from '../Icon/Icon-assets'
import styled, { css, keyframes } from 'styled-components'

import classNames from 'classnames'

export default class HeroSearch extends Component {
  constructor() {
    super()

    this.state = {
      value: '',
      isInputFocused: false,
    }
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
    onRequestClose: PropTypes.func,
  }

  static defaultProps = {
    username: 'Michelle',
    chatNowCTAtext: 'Chat Now',
    placeHolderText: 'How can we help you?',
    id: 'hero-search-1',
    onChange: () => {},
    onSubmit: () => {},
    onFocus: () => {},
  }

  componentWillMount() {
    window.reactGlobals.openSearch = () => {
      this.handleInputFocus()
    }
    window.reactGlobals.closeSearch = () => {
      this.handleCloseRequest()
    }
  }

  handleChange = val => {
    this.setState({
      value: val,
    })
    console.log('value = ' + this.state.value)
    this.props.onChange(val)
  }

  handleSubmit = val => {
    this.props.onSubmit(val)
  }

  handleInputFocus = event => {
    this.setState({
      isInputFocused: true,
    })
    this.props.onFocus(event)
  }

  handleCloseRequest = event => {
    this.setState({
      isInputFocused: false,
    })

    this.smartSearch.handleClear()
    this.props.onRequestClose(event)
  }

  render() {
    const { value } = this.state

    const {
      chatNowCTAtext,
      username,
      placeHolderText,
      suggestionsList,
      id,
      ...other
    } = this.props

    const props = {
      isInputFocused: this.state.isInputFocused,
    }

    const heroSearchClass = classNames({
      'vz-odt--herosearch': true,
      [this.props.className]: this.props.className,
    })

    const greetingClassName = classNames({
      'vz-odt--herosearch--greeting': true,
      'is-inactive': this.state.isInputFocused /**value != ''**/,
    })

    const closeBtn = (
      <button
        aria-label="Close overlay"
        className={classNames({
          'vz-odt--herosearch--modal-close': true,
          'is-active': props.isInputFocused,
        })}
        onClick={this.handleCloseRequest}
      >
        <Icon icon={ICONS.CROSS} className="vz-odt--modal-close__icon" />
      </button>
    )

    return (
      <div className={heroSearchClass}>
        <div
          ref={div => {
            this.greeting = div
          }}
          className={greetingClassName}
        >
          <AnimationTextWave>Hey, {username}</AnimationTextWave>
        </div>
        <SmartSearch
          ref={SmartSearch => {
            this.smartSearch = SmartSearch
          }}
          placeHolderText={placeHolderText}
          suggestionsList={suggestionsList}
          onChange={this.handleChange}
          onSubmit={this.props.onSubmit}
          onFocus={this.handleInputFocus}
          isActive={this.state.isInputFocused}
          id={id}
        />
        {/*<Button
          className="vz-odt--herosearch--CTA-button"
          kind={Button.BUTTON_TYPE.TEXT_CHEVRON_CTA}
        >
          {chatNowCTAtext}
        </Button>*/}
        {closeBtn}
      </div>
    )
  }
}
