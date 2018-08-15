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
              {address.address.city} {address.address.state}
              {address.address.zip}
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
          />
        </div>
        <div className="serviceline-phone-edit description_box__edit description_box__edit_section">
          <a
            className="btn btn-anchor description_box__btn-edit"
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
              Edit Line
            </a>
          ) : (
            <a
              style={{ textAlign: "right",display: this.props.editLineClicked ? "none" : "block" }}
              className="btn btn-anchor description_box__btn-edit"
              onClick={this.handleEditAddressClick}
              role="button"
              analyticstrack="serviceLine-editaddress"
            >
              Edit Address
            </a>
          )}
        </div>
      </div>
    );
  };

  renderLineRead = line => {
    return <p>{line} [Device Nickname] </p>;
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

//  {this.props.addressListOnAccount.userServiceAddressInfo.serviceAddresses.map(item => <div>{item.address.addressLine1s}</div> )}
  render() {
    console.log("rendered", this.props)
    const { editLine, serviceLine, serviceAddress } = this.state;
    return (
      <div className="serviceLine_templ">
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
    editLineClicked: state.contactDetails.editAddressOrLineClicked
  }
}

export default connect(mapStateToProps, {editAddressOrLineClicked, cancelButtonClicked})(ServiceLine);
