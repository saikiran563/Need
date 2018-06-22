import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import './Modal.css'
import Icon from '../Icon/Icon'

import { ICONS } from '../Icon/Icon-assets'
import Button from '../Button/Button'

export default class Modal extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    passiveModal: PropTypes.bool,
    onRequestClose: PropTypes.func,
    id: PropTypes.string,
    modalHeading: PropTypes.string,
    modalLabel: PropTypes.string,
    secondaryButtonText: PropTypes.string,
    primaryButtonText: PropTypes.string,
    open: PropTypes.bool,
    onRequestSubmit: PropTypes.func,
    onKeyDown: PropTypes.func,
    primaryButtonDisabled: PropTypes.bool,
    onSecondarySubmit: PropTypes.func,
  }

  static defaultProps = {
    onRequestClose: () => {},
    onRequestSubmit: () => {},
    primaryButtonDisabled: false,
    onKeyDown: () => {},
    passiveModal: false,
    modalHeading: '',
  }

  handleKeyDown = event => {
    if (event.which === 27) {
      this.props.onRequestClose()
    }
  }

  handleClick = event => {
    //Send close modal request
    //when click outside of the modal container
    if (this.innerModal && !this.innerModal.contains(event.target)) {
      this.props.onRequestClose()
    }
  }

  render() {
    const {
      modalHeading,
      passiveModal,
      secondaryButtonText,
      primaryButtonText,
      open,
      onRequestClose,
      onRequestSubmit,
      onSecondarySubmit,
      primaryButtonDisabled,
      ...other
    } = this.props

    const onSecondaryButtonClick = onSecondarySubmit
      ? onSecondarySubmit
      : onRequestClose

    const modalClasses = classNames({
      'vz-odt--modal': true,
      'is-visible': open,
      [this.props.className]: this.props.className,
    })

    const closeBtn = (
      <button className="vz-odt--modal-close" onClick={onRequestClose}>
        <Icon icon={ICONS.CROSS} className="vz-odt--modal-close__icon" />
      </button>
    )

    const modalBody = (
      <div
        ref={modal => {
          this.innerModal = modal
        }}
        className="vz-odt--modal-container"
      >
        <div className="vz-odt--modal-header">
          {closeBtn}
          <h2 className="vz-odt--modal-header__heading">{modalHeading}</h2>
        </div>
        <div className="vz-odt--modal-content">{this.props.children}</div>
        {!passiveModal && (
          <div className="vz-odt--modal-footer">
            <div className="vz-odt--modal__buttons-container">
              <Button kind="secondary" onClick={onSecondaryButtonClick}>
                {secondaryButtonText}
              </Button>
              <Button
                kind="primary"
                disabled={primaryButtonDisabled}
                onClick={onRequestSubmit}
              >
                {primaryButtonText}
              </Button>
            </div>
          </div>
        )}
      </div>
    )

    return (
      <div
        {...other}
        onKeyDown={this.handleKeyDown}
        onClick={this.handleClick}
        className={modalClasses}
        role="presentation"
        tabIndex={-1}
      >
        {modalBody}
      </div>
    )
  }
}
