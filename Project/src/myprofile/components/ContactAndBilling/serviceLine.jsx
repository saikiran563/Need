import React, { Component } from "react";
import InputField from "../FormElements/InputComponent";
import EditService from "./editService";

import { connect } from "react-redux"
import {editAddressOrLineClicked,cancelButtonClicked} from "./actions/setServiceAddress"

class ServiceLine extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editLine: false,
      serviceLine: this.props.serviceLine,
      serviceAddress: this.props.serviceAddress
    };
  }

  handleOnChange = e => {
    this.setState({ serviceLine: e.target.value });
  };

  handleCancelClick = () => {
    this.props.cancelButtonClicked()
    this.setState({
      editLine: false
    });
    // this.props.handleEditMode();
  };
  handleEditAddressClick = () => {
    this.props.editAddressOrLineClicked()
    this.setState({
      editLine: true
    });
  };

  renderAddressRead = address => {
    return (
      <div>
        <p>
          <div>
            <strong>
              {address.address.addressLine1}
              {address.address.addressLine2}
            </strong>
          </div>
          <div>
            <strong>
              {address.address.city} {address.address.state} {address.address.zip}
            </strong>
          </div>
        </p>
      </div>
    );
  };

  renderServiceLineEdit = line => {
    let editType = this.state.serviceLine
      ? "serviceLineEdit"
      : "serviceAddressEdit";
    return (
      <div className="row">
        <div className="form-group phone-block-input col-xs-12 col-sm-10 description_box__details">
          <div>
            {this.state.serviceLine
              ? this.renderLineRead(line)
              : this.renderAddressRead(line)}
          </div>
          <EditService
            line={line}
            editType={editType}
            handleSave={this.props.handleSave}
            onCancel={this.handleCancelClick}
            addressListOnAccount={this.props.addressListOnAccount}
            serviceAddressStatus={this.props.serviceAddressStatus}
          />
        </div>
        <div className="serviceline-phone-edit description_box__edit description_box__edit_section serviceAddress_cancel">
          <a
            className="btn btn-anchor description_box__btn-edit cancel"
            onClick={this.handleCancelClick}
            role="button"
            analyticstrack="serviceLine-cancel"
          >
            Cancel
          </a>
        </div>
      </div>
    );
  };

  renderServiceLineRead = line => {
    return (
      <div className="row">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            width: "100%"
          }}
          className="service-line col-xs-12 col-sm-8 description_box__details"
        >
          <div>
            {this.state.serviceLine
              ? this.renderLineRead(line)
              : this.renderAddressRead(line)}
          </div>
          {this.state.serviceLine ? (
            <a
              style={{
                textAlign: "right",
                display: this.props.editLineClicked ? "none" : "block"
              }}
              className={`btn btn-anchor description_box__btn-edit`}
              onClick={this.handleEditAddressClick}
              role="button"
              analyticstrack="serviceLine-editline"
            >
              {this.props.serviceAddressEditMode ? 'Edit Line' : '' }
            </a>
          ) : (
            <a
              style={{ textAlign: "right",display: this.props.editLineClicked ? "none" : "block" }}
              className="btn btn-anchor description_box__btn-edit"
              onClick={this.handleEditAddressClick}
              role="button"
              analyticstrack="serviceLine-editaddress"
            >
              {this.props.serviceAddressEditMode ? 'Edit Address' : '' }
            </a>
          )}
        </div>
      </div>
    );
  };

  

  renderLineRead = line => {
    return <p>{this.convertPhoneToUSAFormat(line)} </p>;
  };

  // renderAddressItems = () => {
  //   if (!this.state.editLine) {
  //     if (this.props.addressListOnAccount.userServiceAddressInfo) {
  //       this.props.addressListOnAccount.userServiceAddressInfo.serviceAddresses.map(
  //         item => {
  //           if(!item.billingAddress){
  //             return (
  //               <div>
  //                 <p>
  //                   <strong>{item.address.addressLine1}</strong>
  //                 </p>
  //               </div>
  //             )
  //           }
  //         }
  //       );
  //     }
  //   }
  // };

  convertPhoneToUSAFormat = (line) => {
      let x = line.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
      return !x[2] ? x[1] : '' + x[1] + '.' + x[2] + (x[3] ? '.' + x[3] : '');
   }

//  {this.props.addressListOnAccount.userServiceAddressInfo.serviceAddresses.map(item => <div>{item.address.addressLine1s}</div> )}
  render() {
    const { editLine, serviceLine, serviceAddress } = this.state;
    const { serviceAddressStatus } = this.props;
    const savedSectionStyle = {
      "display": "inline",
      "marginTop": "10px",
      "paddingTop": "10px"
    };
    return (
      <div className="serviceLine_templ">
      {/*
        serviceAddressStatus == '0' && <span className="text-success fa fa-check-circle col-xs-12 section-saved section-saved_block" tabIndex="0" style={savedSectionStyle}>
                &nbsp;Saved
                 </span>
      */}
        {editLine
          ? this.renderServiceLineEdit(
              serviceLine ? serviceLine : this.state.serviceAddress
            )
          : this.renderServiceLineRead(
              serviceLine ? serviceLine : this.state.serviceAddress
            )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  // console.log(state)
  return {
    editLineClicked: state.contactDetails.editAddressOrLineClicked,
    serviceAddressStatus: state.contactDetails.serviceAddressStatus
  }
}

export default connect(mapStateToProps, {editAddressOrLineClicked, cancelButtonClicked})(ServiceLine);
