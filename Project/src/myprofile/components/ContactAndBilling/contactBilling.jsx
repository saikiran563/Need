import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import EmailBlock from './emailBlock';
import PrimaryPhoneBlock from './primaryPhoneBlock';
import BillingAddressBlock from './billingAddressBlock';
import ServiceAddressBlock from './serviceAddressBlock';

import * as actions from './actions';
import VerifyAddressPopup from  './verifyAddressPopup';
import './style.css'
require('../../../assets/css/main.css');
require('../../../assets/css/my-profile.css');
require('../../../assets/css/oneD-Global.css');
require('../../../assets/css/phoenixGlobal.css');

class ContactAndBilling extends Component {
   constructor(props) {
    super(props)
    this.state= {
      showEmailEdit: true,
      userEditMode: true,
      primaryPhoneEditMode: true,
      showPrimaryPhoneEdit: true,
      showBillingEdit: true,
      billingAddressEditMode: true,
      showServiceAddress: true,
      serviceAddressEditMode: true,
      emailSaved: false,
      phoneSaved: false,
      billingAddressSaved: false,
      serviceAddressSaved: false
    }
  }
  componentDidMount() {
    this.props.actions.fetchContactAndBilling();

    const URL_MAP = this.props.match.url.split("/");
    const type = URL_MAP[URL_MAP.length-1];
    type?this.handleEditCancel(type+"Block"):"";
  }

    handleEditCancel = (type) =>  {
    switch(type) {
      case 'emailBlock':
      this.setState({ 
            showEmailEdit: false,
            showPrimaryPhoneEdit: false, 
            primaryPhoneEditMode: false, 
            userEditMode: true,
            billingAddressEditMode: false, 
            showBillingEdit: false,
            showServiceAddress: false,
            serviceAddressEditMode: false,
            emailSaved: false,
            phoneSaved: false,
            billingAddressSaved: false,
            serviceAddressSaved: false
          });
          this.props.history.push('/contactbilling/email');
      break;
      case 'primaryPhoneBlock':
      this.setState({ 
            showEmailEdit: false, 
            showPrimaryPhoneEdit: false, 
            primaryPhoneEditMode: true,
            userEditMode: false, 
            billingAddressEditMode: false, 
            showBillingEdit: false,
            showServiceAddress: false,
            serviceAddressEditMode: false,
            emailSaved: false,
            phoneSaved: false,
            billingAddressSaved: false,
            serviceAddressSaved: false
      });
      this.props.history.push('/contactbilling/primaryPhone');
      break;
      case 'billingAddressBlock':
      this.setState({
           showEmailEdit: false, 
           showPrimaryPhoneEdit: false,
           primaryPhoneEditMode: false, 
           showBillingEdit: false, 
           userEditMode: false, 
           billingAddressEditMode: true,
           showServiceAddress: false,
           serviceAddressEditMode: false,
           emailSaved: false,
           phoneSaved: false,
           billingAddressSaved: false,
           serviceAddressSaved: false
          });
          this.props.history.push('/contactbilling/billingAddress');
      break;
      case 'serviceAddressBlock':
      this.setState({
          showEmailEdit: false, 
          showPrimaryPhoneEdit: false, 
          primaryPhoneEditMode: false, 
          showBillingEdit: false, 
          userEditMode: false, 
          billingAddressEditMode: false,
          showServiceAddress: false,
          serviceAddressEditMode: true,
          emailSaved: false,
          phoneSaved: false,
          billingAddressSaved: false,
          serviceAddressSaved: false
        });
        break;
      default:
      this.props.history.push('/contactbilling');
       this.setState({ 
         showEmailEdit: true, 
         showPrimaryPhoneEdit: true,  
         userEditMode: true, 
         primaryPhoneEditMode: true, 
         billingAddressEditMode: true, 
         showBillingEdit: true,
         showServiceAddress: true,
         serviceAddressEditMode: true,
         emailSaved: false,
         phoneSaved: false,
         billingAddressSaved: false,
         serviceAddressSaved: false
     });
    }
  }

  handleSave = (formId, formData, event) => {
    // through an API call.
    event.preventDefault();
     switch(formId) {
      case 'emailBlock':
      console.log(`${formId} '------' ${formData}`);
      this.props.actions.setEmailId(formData);
      this.setState({emailSaved: true, showEmailEdit: true, 
         showPrimaryPhoneEdit: true,  
         userEditMode: true, 
         primaryPhoneEditMode: true, 
         billingAddressEditMode: true, 
         showBillingEdit: true,
         showServiceAddress: true,
         serviceAddressEditMode: true});
      break;
      case 'primaryPhoneBlock':
      console.log(`${formId} '------' ${formData}`);
      this.props.actions.setPrimaryPhone(formData);
       this.setState({phoneSaved: true, showEmailEdit: true, 
         showPrimaryPhoneEdit: true,  
         userEditMode: true, 
         primaryPhoneEditMode: true, 
         billingAddressEditMode: true, 
         showBillingEdit: true,
         showServiceAddress: true,
         serviceAddressEditMode: true});
      break;
      case 'billingAddressBlock':
      console.log(`${formId} '------' ${formData}`);
      this.props.actions.setBillingAddress(formData)
      //this.props.actions.showModalPopup();
      break;
    }
  }

  render() {
       const { contactDetails } = this.props;
       const { emailSaved, phoneSaved, billingAddressSaved, serviceAddressSaved } = this.state;

     return (
       
        <div>
       <h1 className="title title--lg">Contact & Billing</h1>
       {
        contactDetails && <div className="col-xs-12">
       
           <EmailBlock userEmailInfo={contactDetails} handleEditCancel={(type) => this.handleEditCancel(type)} handleSave={(type, data, e) => this.handleSave(type, data, e)} emailSaved={emailSaved} {...this.state} />
           <PrimaryPhoneBlock userPrimaryPhoneInfo={contactDetails} handleEditCancel={(type) => this.handleEditCancel(type)} handleSave={(type, data, e) => this.handleSave(type, data, e)} phoneSaved={phoneSaved} {...this.state}/>
           <BillingAddressBlock userBillingInfo={contactDetails} handleEditCancel={(type) => this.handleEditCancel(type)} handleSave={(type, data, e) => this.handleSave(type, data, e)} billingAddressSaved={billingAddressSaved} {...this.state}/>
           <ServiceAddressBlock userServiceAddressInfo={contactDetails.userServiceAddressInfo} handleEditCancel={(type) => this.handleEditCancel(type)} handleSave={(type, data, e) => this.handleSave(type, data, e)} serviceAddressSaved={serviceAddressSaved} {...this.state}/>

           <VerifyAddressPopup />
           </div>
       }
  
    </div>
   
      
    )
  }
}

          

//<ServiceAddressBlock userServiceAddressInfo={contactDetails.userServiceAddressInfo} handleEditCancel={(type) => this.handleEditCancel(type)} handleSave={(type, data, e) => this.handleSave(type, data, e)} serviceAddressSaved={serviceAddressSaved} {...this.state}/>
//<BillingAddressBlock userBillingInfo={contactDetails} handleEditCancel={(type) => this.handleEditCancel(type)} handleSave={(type, data, e) => this.handleSave(type, data, e)} billingAddressSaved={billingAddressSaved} {...this.state}/>
       
const mapStateToProps = state => {
  console.log('mapStateToProps; ', state);
  return {
    contactDetails : state.contactDetails.list
  }
}

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actions, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(ContactAndBilling)
