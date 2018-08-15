import React, { Component } from 'react';

import Modal from '../Modal/modal'

import AccessRoles from '../Popup/AccessRoles'

class HeaderContent extends Component {
state= {
  modalStatus: false,
}
 openPopup =() =>{
  this.setState({modalStatus:true});
//  this.props.actions.show_popup("my data sample"); /* calling to action */
}

closeModal =() => {
  this.setState({modalStatus:false});
}

    render() {
     let amRole = reactGlobals.mdnRole.toLocaleLowerCase()=="accountholder" ? "Account Owner" : "Account Manager";

     let acctNumber = (reactGlobals.accountNumber || "").substr(0, 10) +" - "+ (reactGlobals.accountNumber || "").substr(10)

        return (
         <div className="headercontent__wrapper">
                    <h1 className="title title--lg hidden-xs hidden-sm">My Profile</h1>
                  { reactGlobals.mdnRole.toLocaleLowerCase()=="accountholder" || reactGlobals.mdnRole.toLocaleLowerCase()=="accountmanager" ? 
                  (<p>You are the {amRole}. <br className="visible-xs" /> <a href="#" className="dlink"
                   onClick={this.openPopup}>What does this mean?</a></p>) : (<p>You are the Account Member. <br className="visible-xs" />
                        <a href="#" className="dlink" onClick={this.openPopup}>What does this mean?</a></p>) }
                  <p>Account Number: [{acctNumber}]</p>
                    <h2 className="title title--sm top-divider">Quick Links</h2>
                    <p>A few common settings to get you started.</p>
                

           <Modal 
              modalStatus={this.state.modalStatus}
              closeModal={this.closeModal}
              tagId="quicklinks-accessroles"> <AccessRoles/> </Modal>
</div>
                 )
            
                 }
    }




export default HeaderContent;