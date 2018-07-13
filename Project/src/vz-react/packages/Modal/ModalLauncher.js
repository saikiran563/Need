import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Button from '../Button/Button'
import Modal from '../Modal/Modal'

export default class ModalLauncher extends Component {
  static propTypes = {
    children: PropTypes.node,
    passiveModal: PropTypes.bool,
    onRequestClose: PropTypes.func,
    id: PropTypes.string,
    launchButtonText: PropTypes.string,
    modalHeading: PropTypes.string,
    modalLabel: PropTypes.string,
    secondaryButtonText: PropTypes.string,
    primaryButtonText: PropTypes.string,
    launchButtonKind: PropTypes.oneOf(['primary', 'secondary']),
    handleSubmit: PropTypes.func,
  }

  static defaultProps = {
    primaryButtonText: 'Confirm',
    secondaryButtonText: 'Cancel',
    launchButtonKind: 'primary',
  }

  state = {
    isOpen: false,
  }

  handleOpen = () => {
    this.setState({
      isOpen: true,
    })
  }

  handleClose = () => {
    this.setState({
      isOpen: false,
    })
  }

  handleSubmitRquest = () => {
    const { handleSubmit } = this.props

    if (handleSubmit()) {
      this.handleClose()
    }
  }

  render() {
    const {
      id,
      launchButtonText,
      launchButtonKind,
      modalHeading,
      passiveModal,
      primaryButtonText,
      secondaryButtonText,
    } = this.props

    const props = {
      id,
      modalHeading,
      passiveModal,
      primaryButtonText,
      secondaryButtonText,
      open: this.state.isOpen,
      onRequestClose: this.handleClose,
      onRequestSubmit: this.handleSubmitRquest,
    }

    return (
      <div
        onKeyDown={event => {
          if (event.which === 27) {
            this.handleClose()
            this.props.onKeyDown(event)
          }
        }}
      >
        <Button kind={launchButtonKind} onClick={this.handleOpen}>
          {launchButtonText}
        </Button>
        <Modal {...props}>{this.props.children}</Modal>
      </div>
    )
  }
}
