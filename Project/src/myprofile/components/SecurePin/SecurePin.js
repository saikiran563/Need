import React, { Component } from "react";
import { connect } from "react-redux";
import {
  sendSecurePinToPhone,
  getSecretPinStatus,
  getListOfUserNumbers,
  confirmSecurePinCode
} from "../Security/actions/fetchSecurities";
import { getErrorMsgByCode } from "../../../utils/config";

class SecurePin extends Component {
  state = {
    selectedPhone: null,
    listOfAccountNumbersModal: false,
    authorizationCodeModal: false,
    authorizationCode: "",
    finalAuthorizationModal: false,
    wrongCodeErrorMessage: "",
    afterGetRequest: []
  };

  componentDidUpdate(prevProps) {
    if (prevProps.listOfUserNumbers !== this.props.listOfUserNumbers) {
      this.setState({
        afterGetRequest: this.props.listOfUserNumbers,
        listOfAccountNumbersModal: true
      });
    }
  }

  sendCodeToPhoneHandler = () => {
    this.props
      .sendSecurePinToPhone(
        this.state.selectedPhone.mtn,
        reactGlobals.accountNumber
      )
      .then(() => {
        if (!this.props.sendSecurePinError) {
          this.setState({
            listOfAccountNumbersModal: false,
            authorizationCodeModal: true
          });
        }
      });
  };

  authorizationCodeConformation = event => {
    event.persist()
    this.props
      .confirmSecurePinCode(
        this.state.selectedPhone.mtn,
        reactGlobals.accountNumber,
        this.state.authorizationCode
      )
      .then(() => {
        if (!this.props.confirmSecurePinError) {
          this.props.handleSave(
            this.props.handleSaveType,
            this.props.handleSaveData,
            event
          );
          this.setState({
            authorizationCodeModal: false,
            listOfAccountNumbersModal: false,
            finalAuthorizationModal: true
          });
        }
      });
  };

  handleAuthCodeChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleRadioInputChange = event => {
    const afterGetRequest = this.state.afterGetRequest.map(el => {
      if (el.formattedMtn == event.target.name) {
        this.setState({ selectedPhone: el });
        return Object.assign({}, el, { picked: true });
      } else {
        return Object.assign({}, el, { picked: false });
      }
    });
    this.setState({ afterGetRequest });
  };

  renderModalContent() {
    // if (!this.props.error) {
    if (this.state.listOfAccountNumbersModal) {
      return (
        <div>
          <h1 className="title title--lg">
            Which device should we send the code to?
          </h1>
          <p>
            For the security of your account, we ask that you complete an online
            authorization step before you continue with your request.
          </p>
          <p>
            Select the device where we can send you the online authorization
            code.
          </p>
          {this.state.afterGetRequest.map(item => {
            if (item.securePinEligible) {
              return (
                <p key={item.formattedMtn}>
                  <input
                    type="radio"
                    value={item.picked || false}
                    onChange={this.handleRadioInputChange}
                    name={item.formattedMtn}
                    id={`phoneLine-${item.formattedMtn}`}
                    checked={item.picked || false}
                  />
                  <label htmlFor={`phoneLine-${item.formattedMtn}`}>
                    <span className="a-block">{item.formattedMtn}</span>
                  </label>
                </p>
              );
            }
          })}
          <button
            className="btn btn--round"
            disabled={!this.state.selectedPhone}
            style={{ marginRight: "10px" }}
            onClick={this.sendCodeToPhoneHandler}
          >
            Send Code
          </button>
          <button
            className="btn btn--round-invert"
            onClick={this.props.closeModal}
          >
            Cancel
          </button>
          {this.props.sendSecurePinError ? <p>{getErrorMsgByCode(this.props.sendSecurePinError)}</p> : ""}
        </div>
      );
    } else if (this.state.authorizationCodeModal) {
      return (
        <div>
          <h1 className="title title--lg">
            Now enter your authorization code below.
          </h1>
          <p>
            We just texted you a new code. You should receive your code in less
            than a minute.
          </p>
          <p>
            <strong>Authorization Code (all numeric):</strong>
          </p>
          <input
            type="text"
            value={this.state.authorizationCode}
            name="authorizationCode"
            onChange={this.handleAuthCodeChange}
            style={{
              marginBottom: this.state.wrongCodeErrorMessage ? "0" : ""
            }}
          />
          <p style={{ color: "red" }}>
            {getErrorMsgByCode(this.props.confirmSecurePinError)}
          </p>
          <button
            className="btn btn--round"
            disabled={
              !this.state.authorizationCode ||
              isNaN(parseInt(this.state.authorizationCode)) ||
              this.state.authorizationCode.length < 6
            }
            style={{ marginRight: "10px" }}
            onClick={this.authorizationCodeConformation}
          >
            Confirm
          </button>
          <button
            className="btn btn--round-invert"
            onClick={this.props.closeModal}
          >
            Cancel
          </button>
        </div>
      );
    } else if (this.state.finalAuthorizationModal) {
      if (this.props.handleSaveType == "questionForm") {
        return (
          <div>
            <p>Your Security Question has been updated.</p>
            {/* {this.state.selectedPhone ? (
            <div>
              <p>{this.state.selectedPhone.formattedMtn}</p>
            </div>
          ) : (
            ""
          )} */}
            <button onClick={this.props.closeModal} className="btn btn--round">
              Confirm
            </button>
          </div>
        );
      } else if (this.props.handleSaveType == "approveAccountManagerBlock") {
        return (
          <div>
            <p>Account Manager is Successfully Approved.</p>
            <button
              className="btn btn--round-invert"
              onClick={this.props.closeModal}
            >
              Close
            </button>
          </div>
        );
      }else if (this.props.handleSaveType == "addManagerAccountManagerBlock") {
        return (
          <div>
            <p>Account Manager is  Added Successfully</p>
            <button
              className="btn btn--round-invert"
              onClick={this.props.closeModal}
            >
              Close
            </button>
          </div>
        );
      }
       else if (this.props.handleSaveType == "serviceAddressBlock") {
        return (
          <div>
            <p>Your address has been updated.</p>
            <button
              className="btn btn--round-invert"
              onClick={this.props.closeModal}
            >
              Close
            </button>
          </div>
        );
      } else if (this.props.handleSaveType == "accountmanagerBlock") {
        return (
          <div>
            <p>Your Account Managers have been updated.</p>
            <p>Account Manager(s) added.</p>
            {this.state.selectedPhone ? (
              <div>
                <p>{this.state.selectedPhone.formattedMtn}</p>
              </div>
            ) : (
              ""
            )}
            <button onClick={this.props.closeModal} className="btn btn--round">
              Confirm
            </button>
          </div>
        );
      }
    }
    if (this.props.getListOfUserNumbersError) {
      return (
        <div>
          <p>{getErrorMsgByCode(this.props.getListOfUserNumbersError)}</p>
          <button
            className="btn btn--round-invert"
            onClick={this.props.closeModal}
          >
            Close
          </button>
        </div>
      );
    }
    // else {
    //   return (
    //     <div>
    //       <p>Your Account Managers have been updated.</p>
    //       <p>Account Manager(s) added.</p>
    //       {this.state.selectedPhone ? (
    //         <div>
    //           <p>{this.state.selectedPhone.formattedMtn}</p>
    //         </div>
    //       ) : (
    //         ""
    //       )}
    //       <button className="btn btn--round">Confirm</button>
    //     </div>
    //   );
    // }
  }
  //    else {
  //     return (
  //       <div>
  //         <p style={{ fontSize: "24px" }}>
  //           {getErrorMsgByCode(this.props.error)}
  //         </p>
  //         <button
  //           className="btn btn--round-invert"
  //           onClick={this.props.closeModal}
  //         >
  //           Close
  //         </button>
  //       </div>
  //     );
  //   }
  // }
  render() {
    // console.log(this.props.error);
    return <div>{this.renderModalContent()}</div>;
  }
}

const mapStateToProps = state => {
  return {
    securePin: state.security.secretPin,
    listOfUserNumbers: state.security.listOfUserNumbers,
    smartPinMtn: state.security.smartPinMtn,
    isSecurePinValidated: state.security.isSecurePinValidated,
    securePinStatusError: state.security.securePinError,
    getListOfUserNumbersError: state.security.listOfUserNumbersError,
    sendSecurePinError: state.security.sendSecurePinError,
    confirmSecurePinError: state.security.confirmSecurePinError
  };
};

export default connect(
  mapStateToProps,
  {
    getSecretPinStatus,
    getListOfUserNumbers,
    sendSecurePinToPhone,
    confirmSecurePinCode
  }
)(SecurePin);
