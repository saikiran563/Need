import React, { Component } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from './actions'

import './style.css'

class VZModal extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      show: false,
      addressChecked: this.props.modalContent.addressEntered
    };
  }

  handleClose() {
   // this.setState({ show: false });
   this.props.actions.setBillingAddress(this.state.addressChecked);
  }

  handleShow() {
    //this.setState({ show: true });
     this.props.actions.showModalPopup();
  }

  handleAddressChange(e){
    this.setState({
      addressChecked: JSON.parse(e.target.value)
    });
  }

  render() {
    const {modalContent} = this.props;
    const renderAddress = (address) => {
          return (
            <div className="col-xs-12 col-sm-10 description_box__details" key={address.apartment}>
            
                  <div className="description_box__read">
                      <label className="radio-inline"><input type="radio" value={JSON.stringify(address)} name="optradio" onChange={this.handleAddressChange.bind(this)}/>
                           <p>{address.address} {address.apartment}</p>
                            <p>{address.city} {address.state} {address.zip}</p>
                      </label>  
                   </div>
              </div>
          )
    }
    return (
      <div className="aMyProfile">
        <Modal show={this.props.showModal} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{modalContent.header}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <div className="modal-contents">
            <h4>{modalContent.error}</h4>
            <br/>
              <div className="description_box__details">
                  <div className="description_box__read">
                      <div className="row">
                          <div className="col-md-6">
                                <p>{modalContent.addressEntered.address}</p>
                                <p>{modalContent.addressEntered.apartment}</p>
                                <p>{`${modalContent.addressEntered.city} ${modalContent.addressEntered.state} ${modalContent.addressEntered.zip}`}</p>
                          </div>
                          <div className="col-md-6">
                            <div className="description_box__edit description_box__edit_section">
                              <a className="btn btn-anchor edit-address" onClick={this.handleClose} role="button">Edit</a>
                            </div>
                          </div> 
                      </div>
                </div>   
              </div>
              <br/>
              <h4>Did you mean:</h4><br />
                <div className="address-suggested">
                  {modalContent.addressSuggessions.map(renderAddress)}
                  <div className="col-xs-12 col-sm-10 description_box__details">
            
                  <div className="description_box__read">
                      <label className="radio-inline"><input type="radio" value={JSON.stringify(modalContent.addressEntered)} onChange={this.handleAddressChange.bind(this)} name="optradio"/>
                           <p>Use my address exactly as entered</p>
                      </label>  
                   </div>
              </div>
                </div>
              </div>
          </Modal.Body>
          <Modal.Footer>

              <div className="footer address-modal-footer col-xs-12">
                <button className="btn btn--round" onClick={this.handleClose}>Save</button>
              </div>

          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    showModal: state.vzModal.showModal,
    modalContent: state.vzModal.modalContent
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(VZModal)