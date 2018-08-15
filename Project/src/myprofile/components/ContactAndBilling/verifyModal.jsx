import React, { Component } from 'react';

import './style.css'

class VerifyModal extends Component {
    constructor(props, context){
        super(props, context);
        this.closepop=this.closepop.bind(this);

    }

    closepop(){
        this.props.hideVerifyModal();
    }

    handleSave(){
    
    this.props.onSave();
    }
  

    render() {
        
        let modalDetails = this.props.details;      
        return (
         <div id="overlayContainer" className={this.props.showPopup?'visible':'hidden'}>
            <div id="overlayBackground"></div>

             <div id="overlayFrame" className="animated fadeIn a-fast VerifyModalFrame">
                    <span className="close-wrapper">
                        <a id="overlayClose" role="button">
                            <span className="a-sr a-sr-fix" aria-hidden="false" onClick={() => this.closepop()}>Close</span>
                            <span className="a-icon-overlay-close" aria-hidden="true"onClick={() => this.closepop()}></span>
                        </a>
                    </span>
                    <div className="aMyProfile aMyProfile__modal verify__modal overlay-content">
                <h1 className="title title--lg">There's just one more step.</h1>
                <h2 className="title title--lg">Please verify your email address.</h2>
                <p className="modal__divider remove-desc">
                    <strong>{modalDetails ? modalDetails.emailID : ''}</strong><br/>
                    <br aria-hidden="true"/>
                    
                    We've sent you an email. When you receive it, open it and click the "verify" button to confirm your email address.
                    <br aria-hidden="true"/><br aria-hidden="true"/><br aria-hidden="true"/>It's important to complete this step in order to protect the privacy of your account to make sure we're sending information to the right place.
                </p>
                <br aria-hidden="true"/>
                <div className="rol-permissions__buttons row">
                    <div className="col-xs-12 ">
                        <a className="btn btn--round" role="button" onClick={() => this.handleSave()}>Ok, continue</a>
                    </div>
                </div>
            </div>
            </div>
  
            </div>
                );
    }
    
}

export default VerifyModal;