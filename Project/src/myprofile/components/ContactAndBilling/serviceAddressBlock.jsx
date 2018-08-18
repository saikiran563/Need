import React, { Component } from "react";
import InputField from "../FormElements/InputComponent";
import "./style.css";

import { connect } from "react-redux";

import ServiceLine from "./serviceLine";

import Modal from "../Modal/modal";
import SecurePin from "../SecurePin/SecurePin";

import {
  getSecretPinStatus,
  getListOfUserNumbers,
  sendSecurePinToPhone,
  confirmSecurePinCode
} from "../Security/actions/fetchSecurities";

class ServiceAddressBlock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      requiredError: true,
      isValid: "",
      istouched: false,
      serviceAddressInvalidMessages: [
        { name: "6-60 characters", error: false, type: "character" }
      ]
    };
  }

  handleServiceLineEditMode = () => {
    console.log("Inside handle edit mode");
  };
  handleOnEditCancel = type => {
    //this.setState({
    // address: this.props.userServiceAddressInfo.address
    //});
    this.props.handleEditCancel(type);
  };

  getUSAStates = selectedVal => {
    return (
      <select
        className="state-select"
        name="USA State"
        onChange={this.onUSstateChange}
        defaultValue={selectedVal}
      >
        <option value="AA">AA</option>
        <option value="AE">AE</option>
        <option value="AL">AL</option>
        <option value="AK">AK</option>
        <option value="AP">AP</option>
        <option value="AS">AS</option>
        <option value="AZ">AZ</option>
        <option value="AR">AR</option>
        <option value="CA">CA</option>
        <option value="CO">CO</option>
        <option value="CT">CT</option>
        <option value="DE">DE</option>
        <option value="DC">DC</option>
        <option value="FM">FM</option>
        <option value="FL">FL</option>
        <option value="GA">GA</option>
        <option value="GU">GU</option>
        <option value="HI">HI</option>
        <option value="ID">ID</option>
        <option value="IL">IL</option>
        <option value="IN">IN</option>
        <option value="IA">IA</option>
        <option value="KS">KS</option>
        <option value="KY">KY</option>
        <option value="LA">LA</option>
        <option value="ME">ME</option>
        <option value="MH">MH</option>
        <option value="MD">MD</option>
        <option value="MA">MA</option>
        <option value="MI">MI</option>
        <option value="MN">MN</option>
        <option value="MS">MS</option>
        <option value="MO">MO</option>
        <option value="MT">MT</option>
        <option value="NE">NE</option>
        <option value="NV">NV</option>
        <option value="NH">NH</option>
        <option value="NJ">NJ</option>
        <option value="NM">NM</option>
        <option value="NY">NY</option>
        <option value="NC">NC</option>
        <option value="ND">ND</option>
        <option value="MP">MP</option>
        <option value="OH">OH</option>
        <option value="OK">OK</option>
        <option value="OR">OR</option>
        <option value="PW">PW</option>
        <option value="PA">PA</option>
        <option value="PR">PR</option>
        <option value="RI">RI</option>
        <option value="SC">SC</option>
        <option value="SD">SD</option>
        <option value="TN">TN</option>
        <option value="TX">TX</option>
        <option value="UT">UT</option>
        <option value="VT">VT</option>
        <option value="VI">VI</option>
        <option value="VA">VA</option>
        <option value="WA">WA</option>
        <option value="WV">WV</option>
        <option value="WI">WI</option>
        <option value="WY">WY</option>
      </select>
    );
  };

  render() {
    const { serviceAddressInvalidMessages, requiredError } = this.state;
    const {
      userServiceAddressInfo,
      showServiceAddress,
      serviceAddressEditMode,
      serviceAddressStatus
    } = this.props;
    const isValid = !serviceAddressInvalidMessages.find(
      address => address.error
    );
    const editableClassName = serviceAddressEditMode
      ? ""
      : "description_box_disabled";
const savedSectionStyle = {
      "display": "inline",
      "marginTop": "10px",
      "paddingTop": "10px"
    };
    const renderServiceLines = serviceLine => {
      return (
        <div
          className="description_box__read description_box__read_service_line"
          key={serviceLine}
        >
          <ServiceLine
            serviceLine={serviceLine}
            serviceAddress={null}
            handleSave={this.props.handleSave}
            addressListOnAccount={this.props.addressListOnAccount}
            handleEditMode={this.handleServiceLineEditMode}
            serviceAddressEditMode={this.props.serviceAddressEditMode}
            editMode="true"
          />
        </div>
      );
    };
    const serviceAddressWithEdit = addr => {
      return (
        <div className="description_box__read description_box__read_service_line">
          <ServiceLine
            serviceLine={null}
            serviceAddressEditMode={this.props.serviceAddressEditMode}
            serviceAddress={addr}
            handleSave={this.props.handleSave}
            addressListOnAccount={this.props.addressListOnAccount}
          />
        </div>
      );
    };
    const renderEachAddressBlock = addr => {
      return (
        <div
          className="description_box__read service-address-sub-block"
          key={addr}
        >
          <div className="description_box__details">
            {addr.billingAddress ? (
              <p>
                <strong>Same as billing address</strong>
              </p>
            ) : (
              serviceAddressWithEdit(addr)
            )}
          </div>
          <div className="service-lines">
            {addr.serviceLines.line.map(renderServiceLines)}
          </div>
        </div>
      );
    };

    return (
      <div className={`row description_box ${editableClassName}`}>
        <div className="clearfix" />
        <div className="body">
          <div className="col-xs-12 col-sm-4 description_box__header">
            <h4 tabIndex="0">Service Addresses</h4>
            <p>
              Tell us where you use the service so we can calculate the right
              taxes and surcharges
            </p>
          </div>
          {
                serviceAddressStatus == '0' && <span className="text-success fa fa-check-circle col-xs-12 section-saved section-saved_block" tabIndex="0" style={savedSectionStyle}>
                &nbsp;Saved
                 </span>
               } 
          <div className="col-xs-12 col-sm-8 description_box__large-container">
            <div className="service-address-list">
              <div className="description_box__details">
                {/* {
                      !(!showServiceAddress && serviceAddressEditMode) &&  userServiceAddressInfo.serviceAddresses.sort((x, y) => (x.billingAddress === y.billingAddress)? 0 : x? 1 : -1).map(renderEachAddressBlock)
                   } */}
                {!(!showServiceAddress && serviceAddressEditMode)
                  ? userServiceAddressInfo.serviceAddresses
                      .sort((a, b) => b.billingAddress - a.billingAddress)
                      .map(renderEachAddressBlock)
                  : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log("STATEEEE", state);
  return {
    securePin: state.security.secretPin,
    isSecurePinValidated: state.security.isSecurePinValidated
  };
};

export default connect(
  mapStateToProps,
  { getSecretPinStatus, getListOfUserNumbers }
)(ServiceAddressBlock);
