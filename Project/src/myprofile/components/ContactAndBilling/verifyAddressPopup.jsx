import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import  * as actions from './actions';

import './style.css'

class VerifyAddressPopup extends Component {
constructor(props, context){
    super(props, context);
    this.state = {
      addressChecked: this.props.popupContents.addressEntered
    };
    this.closepop=this.closepop.bind(this);

}
closepop(){
     this.props.actions.hideModalPopup(); /* calling to action */
}

 handleAddressChange(e){
    this.setState({
      addressChecked: JSON.parse(e.target.value)
    });
  }

    render() {
        const {popupContents} = this.props; 
        const renderAddress = (address) => {
                return (
                    <div className="description_box__details" key={address.apartment}>
                    
                        <div className="description_box__read">
                            <label className="radio-inline">

                            <input type="radio" value={JSON.stringify(address)} name="optradio" onChange={this.handleAddressChange.bind(this)}/>
                                  <div className="suggested-address">
                                    <p>{address.address} {address.apartment}</p>
                                    <p>{address.city} {address.state} {address.zip}</p>
                                  </div>
                            </label>  
                        </div>
                    </div>
                )
            }  
        return (

        
         <div id="overlayContainer" className={this.props.showPopup?'visible':'hidden'}>
            <div id="overlayBackground"></div>
            <div id="overlayFrame" className="animated fadeIn a-fast">
              <span className="close-wrapper"><a id="overlayClose" onClick={this.closepop} role="button"><span className="a-sr a-sr-fix" aria-hidden="false">Close</span><span className="a-icon-overlay-close" aria-hidden="true"></span></a></span>
              <div>
                <div id="verify-address-modal" className="aMyProfile aMyProfile__modal overlay-content">
                <h1 className="title">{popupContents.header}</h1>
                <h1 className="title">{popupContents.error}</h1>
<div className="description_box__details">..
                  <div className="description_box__read">
                      <div className="row">
                          <div className="col-md-6 address-entered">
                                <p>{popupContents.addressEntered.address}</p>
                                <p>{popupContents.addressEntered.apartment}</p>
                                <p>{`${popupContents.addressEntered.city} ${popupContents.addressEntered.state} ${popupContents.addressEntered.zip}`}</p>
                          </div>
                          <div className="col-md-6">
                            <div className="description_box__edit description_box__edit_section">
                              <a className="btn btn-anchor edit-address" onClick={this.closepop} role="button">Edit</a>
                            </div>
                          </div> 
                      </div>
                </div>   
              </div>
              <br/>
              <h1 className="title">Did you mean:</h1><br />
                <div className="address-suggested">
                  {popupContents.addressSuggessions.map(renderAddress)}
                  <div className="description_box__details">
            
                  <div className="description_box__read">
                      <label className="radio-inline"><input type="radio" value={JSON.stringify(popupContents.addressEntered)} onChange={this.handleAddressChange.bind(this)} name="optradio"/>
                          <div className="suggested-address">
                            <p>Use my address exactly as entered</p>
                           </div>
                      </label>  
                   </div>
              </div>
              <div className="footer address-modal-footer col-xs-12">
                <button className="btn btn--round" onClick={this.closepop}>Save</button>
              </div>

            </div>
                </div>
                </div>
                </div>
         </div>
  )
    }
}


const mapStateToProps = state => {
  //console.log('mapStateToProps; ', state);
  return {
    isFetching: state.contactDetails.isFetching,
    showPopup: state.contactDetails.showPopup,
    popupContents: state.contactDetails.popupContents
 
  }
}

const mapDispatchToProps = dispatch => ({
 actions: bindActionCreators(actions, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(VerifyAddressPopup)