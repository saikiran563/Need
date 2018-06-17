import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import './Button.css'
import Icon from '../Icon/Icon'
import { ICONS } from '../Icon/Icon-assets'
import styled from 'styled-components'
import { media } from '../../util/style'

class Button extends Component {
  constructor(props) {
    super(props)
  }

  static BUTTON_TYPE = {
    PRIMARY: 'primary',
    SECONDARY: 'secondary',
    CHEVRON_CTA: 'chevron-cta',
    TEXT_CHEVRON_CTA: 'tex-chevron-cta',
    CHEVRON_NAV: 'chevron-nav',
    GLOBAL_NAV_MAIN: 'global-nav-main',
    GLOBAL_NAV_SUB: 'global-nav-sub',
    NAV_MAIN: 'nav-main',
  }

  render() {
    const {
      kind,
      onClick,
      disabled,
      inverted,
      className,
      icon,
      iconDescription,
      tapIndex,
      chevonCTAIcon,
      type,
      ...other
    } = this.props

    const buttonClass = classNames({
      'vz-odt--btn': true,
      'vz-odt--btn__round':
        kind === Button.BUTTON_TYPE.PRIMARY ||
        kind === Button.BUTTON_TYPE.SECONDARY,
      'vz-odt--btn--primary': kind === Button.BUTTON_TYPE.PRIMARY,
      'vz-odt--btn--secondary': kind === Button.BUTTON_TYPE.SECONDARY,
      'vz-odt--btn--cta__chevron': kind === Button.BUTTON_TYPE.CHEVRON_CTA,
      'vz-odt--btn--cta__text_chevron':
        kind === Button.BUTTON_TYPE.TEXT_CHEVRON_CTA,
      'vz-odt--btn--nav__main': kind === Button.BUTTON_TYPE.NAV_MAIN,
      'is-inverted': inverted,
      [this.props.className]: this.props.className,
    })

    const chevronCTA =
      kind === Button.BUTTON_TYPE.CHEVRON_CTA ||
      kind === Button.BUTTON_TYPE.TEXT_CHEVRON_CTA ? (
        <Icon
          icon={ICONS.CHEVRON_RIGHT}
          className={classNames({
            'vz-odt--btn--cta__chevron__icon': true,
            'no-label': !this.props.children,
          })}
          ref={Icon => {
            this.chevonCTAIcon = Icon
          }}
          fill={inverted ? '#fff' : '#000'}
        />
      ) : (
        ''
      )

    return (
      <StyledButton
        className={buttonClass}
        onClick={onClick}
        disabled={disabled}
        type={type}
        {...other}
      >
        {this.props.children}
        {chevronCTA}
      </StyledButton>
    )
  }
}

Button.propTypes = {
  children: PropTypes.string,
  onClick: PropTypes.func,
}

Button.defaultProps = {
  disabled: false,
  inverted: false,
  kind: Button.BUTTON_TYPE.PRIMARY,
  type: 'button',
  tapIndex: 0,
  iconDescription: '! icon descption !',
}

export default Button

const StyledButton = styled.button`
  ${props =>
    props.type === 'LIVE_TILE' &&
    `
      height: 2.625rem;
      width: 9.6875rem !important;
    `};
  ${media.mobile`
    ${props =>
      props.type === 'sm' &&
      `
        font-size: 0.625rem !important;
        height: 19px;
        padding: 0px !important;
        width: 4.375rem !important;
      `};
    ${props =>
      props.type === 'md' &&
      `
        font-size: 0.75rem !important;
        height: 2.25rem;
        width: 10.1875rem !important;
      `};
    ${props =>
      props.type === 'lg' &&
      `
        font-size: 0.75rem !important;
        height: 2.25rem;
        width: 21.4375rem !important;
      `};
  `};
`
