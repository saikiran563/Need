import React, { Component } from "react";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import EmailBlock from "./emailBlock";
import PrimaryPhoneBlock from "./primaryPhoneBlock";
import BillingAddressBlock from "./billingAddressBlock";
import ServiceAddressBlock from "./serviceAddressBlock";
import Spinner from "../Spinner/Spinner";
import VerifyModal from "./verifyModal";

import * as actions from "./actions";

import "./style.css";
require("../../../assets/css/main.css");
require("../../../assets/css/my-profile.css");
require("../../../assets/css/oneD-Global.css");
require("../../../assets/css/phoenixGlobal.css");

class ContactAndBilling extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showEmailEdit: true,
      userEditMode: true,
      primaryPhoneEditMode: true,
      showPrimaryPhoneEdit: true,
      showBillingEdit: true,
      billingAddressEditMode: true,
      showServiceAddress: true,
      serviceAddressEditMode: true,
      serviceAddressSaved: false,
      showVerifyModal: false,
      emailOkContinue: false
    };
  }
  componentDidMount() {

    if(!this.props.contactDetails)
    this.props.actions.fetchContactAndBilling();

    const URL_MAP = this.props.match.url.split("/");
    const type = URL_MAP[URL_MAP.length - 1];
    type ? this.handleEditCancel(type + "Block") : "";
  }

  hideVerifyModal = () => {
    this.setState({
      showVerifyModal: false
    });
  };

  handleVerifyModalSave = () => {
    this.setState({
      showVerifyModal: false,
      emailOkContinue: true
    });
  };

  resetStatus() {
    this.props.actions.resetEmailStatus(null);
    this.props.actions.resetPrimaryPhoneStatus(null);
    this.props.actions.resetBillingAddressStatus(null);
    //this.props.actions.resetServiceAddressStatus(null);
  }

  handleEditCancel = type => {
    switch (type) {
      case "emailBlock":
        this.setState({
          showEmailEdit: false,
          showPrimaryPhoneEdit: false,
          primaryPhoneEditMode: false,
          userEditMode: true,
          billingAddressEditMode: false,
          showBillingEdit: false,
          showServiceAddress: false,
          serviceAddressEditMode: false
        });
        this.props.history.push("/contactbilling/email");
        this.resetStatus();
        break;
      case "primaryPhoneBlock":
        this.setState({
          showEmailEdit: false,
          showPrimaryPhoneEdit: false,
          primaryPhoneEditMode: true,
          userEditMode: false,
          billingAddressEditMode: false,
          showBillingEdit: false,
          showServiceAddress: false,
          serviceAddressEditMode: false
        });
        this.resetStatus();
        this.props.history.push("/contactbilling/primaryPhone");
        break;
      case "billingAddressBlock":
        this.setState({
          showEmailEdit: false,
          showPrimaryPhoneEdit: false,
          primaryPhoneEditMode: false,
          showBillingEdit: false,
          userEditMode: false,
          billingAddressEditMode: true,
          showServiceAddress: false,
          serviceAddressEditMode: false
        });
        this.resetStatus();
        this.props.history.push("/contactbilling/billingAddress");
        break;
      case "serviceAddressBlock":
        this.setState({
          showEmailEdit: false,
          showPrimaryPhoneEdit: false,
          primaryPhoneEditMode: false,
          showBillingEdit: false,
          userEditMode: false,
          billingAddressEditMode: false,
          showServiceAddress: true,
          serviceAddressEditMode: true
        });
        this.props.history.push("/contactbilling/serviceAddress");
        break;
      default:
        this.props.history.push("/contactbilling");
        this.setState({
          showEmailEdit: true,
          showPrimaryPhoneEdit: true,
          userEditMode: true,
          primaryPhoneEditMode: true,
          billingAddressEditMode: true,
          showBillingEdit: true,
          showServiceAddress: true,
          serviceAddressEditMode: true
        });
    }
  };

  handleSave = (formId, formData, event) => {
    // through an API call.
    event.preventDefault();
    switch (formId) {
      case "emailBlock":
        this.props.actions.setEmailId(formData);
        this.setState({
          showVerifyModal: true,
          showEmailEdit: true,
          showPrimaryPhoneEdit: true,
          userEditMode: true,
          primaryPhoneEditMode: true,
          billingAddressEditMode: true,
          showBillingEdit: true,
          showServiceAddress: true,
          serviceAddressEditMode: true
        });
        break;
      case "primaryPhoneBlock":
        this.props.actions.setPrimaryPhone(formData);
        this.setState({
          phoneSaved: true,
          showEmailEdit: true,
          showPrimaryPhoneEdit: true,
          userEditMode: true,
          primaryPhoneEditMode: true,
          billingAddressEditMode: true,
          showBillingEdit: true,
          showServiceAddress: true,
          serviceAddressEditMode: true
        });
        break;
      case "billingAddressBlock":
        this.props.actions.updateBillingAddress(formData);
        this.setState({
          showEmailEdit: true,
          showPrimaryPhoneEdit: true,
          userEditMode: true,
          primaryPhoneEditMode: true,
          billingAddressEditMode: true,
          billingAddressSaved: true,
          showBillingEdit: true,
          showServiceAddress: true,
          serviceAddressEditMode: true
        });
        //this.props.actions.showModalPopup();
        break;
      case "serviceAddressBlock":
        this.props.actions.updateServiceAddress(formData);
        break;
    }
    //To remove saved after 20 sec
    setTimeout(() => {
     this.resetStatus()
    }, 20000);
  };

  render() {
    const {
      contactDetails,
      showSpinner,
      emailStatus,
      primaryPhoneStatus,
      billingAddressStatus,
      serviceAddressStatus
    } = this.props;

    let acctHolder =
      reactGlobals.mdnRole.toLocaleLowerCase() == "accountholder";

    let acctManger =
      reactGlobals.mdnRole.toLocaleLowerCase() == "accountmanager";

    return (
      <div className="aMyProfile__CB">
        {!contactDetails ? <Spinner /> : null}
        <h1 className="title title--lg">Contact & Billing</h1>
        {contactDetails && (
          <div className="col-xs-12">
            <EmailBlock
              userEmailInfo={contactDetails}
              handleEditCancel={type => this.handleEditCancel(type)}
              handleSave={(type, data, e) => this.handleSave(type, data, e)}
              emailStatus={emailStatus}
              {...this.state}
            />
            <PrimaryPhoneBlock
              userPrimaryPhoneInfo={contactDetails}
              handleEditCancel={type => this.handleEditCancel(type)}
              handleSave={(type, data, e) => this.handleSave(type, data, e)}
              primaryPhoneStatus={primaryPhoneStatus}
              {...this.state}
            />
            {(acctHolder || acctManger) && (
              <BillingAddressBlock
                userBillingInfo={contactDetails.billingAddress}
                handleEditCancel={type => this.handleEditCancel(type)}
                handleSave={(type, data, e) => this.handleSave(type, data, e)}
                billingAddressStatus={billingAddressStatus}
                {...this.state}
              />
            )}
            {(acctHolder || acctManger) && (
              <ServiceAddressBlock
                userServiceAddressInfo={contactDetails.userServiceAddressInfo}
                handleSave={(type, data, e) => this.handleSave(type, data, e)}
                addressListOnAccount={contactDetails.addressListOnAccount}
                handleEditCancel={type => this.handleEditCancel(type)}
                editAddressClicked={this.props.editAddressOrLineClicked}
                serviceAddressStatus={serviceAddressStatus}
                {...this.state}
              />
            )}
          </div>
        )}

        {this.state.showVerifyModal ? (
          <VerifyModal
            showPopup={this.state.showVerifyModal}
            hideVerifyModal={() => this.hideVerifyModal()}
            details={contactDetails}
            onSave={() => this.handleVerifyModalSave()}
          />
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    contactDetails: state.contactDetails.list,
    showSpinner: state.contactDetails.isFetching,
    emailStatus: state.contactDetails.emailStatus,
    primaryPhoneStatus: state.contactDetails.primaryPhoneStatus,
    billingAddressStatus: state.contactDetails.billingAddressStatus,
    serviceAddressStatus: state.contactDetails.serviceAddressStatus,
    editAddressOrLineClicked: state.contactDetails.editAddressOrLineClicked
  };
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContactAndBilling);
