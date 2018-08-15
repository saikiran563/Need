import React, { Component } from "react";
import { connect } from "react-redux";
import {
  sendSecurePinToPhone,
  getSecretPinStatus,
  getListOfUserNumbers,
  confirmSecurePinCode
} from "../Security/actions/fetchSecurities";

class SecurePin extends Component {
  state = {
    selectedPhone: null,
    listOfAccountNumbersModal: true,
    authorizationCodeModal: false,
    authCode: "",
    authorizationCode: "",
    finalAuthorizationModal: false,
    wrongCodeErrorMessage: "",
    afterGetRequest: []
  };

  componentWillUpdate(prevProps) {
    if (prevProps.listOfUserNumbers !== this.props.listOfUserNumbers) {
      this.setState({
        afterGetRequest: prevProps.listOfUserNumbers
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
        this.setState({
          listOfAccountNumbersModal: false,
          authorizationCodeModal: true,
          authCode: this.props.smartPinMtn
        });
      });
  };

  authorizationCodeConformation = event => {
    if (this.state.authorizationCode === this.state.authCode) {
      this.props
        .confirmSecurePinCode(
          this.state.selectedPhone.mtn,
          reactGlobals.accountNumber,
          this.state.authorizationCode
        )
        .then(() => {
          if (this.props.isSecurePinValidated) {
            this.props.handleSave(
              "questionForm",
              {
                challengeQuestionID: this.props.newQId,
                challengeAnswer: this.props.newAnswer
              },
              event
            );
            this.setState({
              authorizationCodeModal: false,
              listOfAccountNumbersModal: false,
              finalAuthorizationModal: true
            });
          }
        });
    } else {
      this.setState({
        wrongCodeErrorMessage: "Invalid code."
      });
      setTimeout(() => {
        this.setState({
          wrongCodeErrorMessage: ""
        });
      }, 2000);
    }
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

  handleErrors = error => {
      if(error){
          return "Something went wrong."
      }
  }

  renderModalContent() {
    if (typeof this.state.afterGetRequest !== "string") {
      if (this.state.listOfAccountNumbersModal) {
        return (
          <div>
            <h1 className="title title--lg">
              Which device should we send the code to?
            </h1>
            <p>
              For the security of your account, we ask that you complete an
              online authorization step before you continue with your request.
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
            <button className="btn btn--round-invert" onClick={this.closeModal}>
              Cancel
            </button>
          </div>
        );
      } else if (this.state.authorizationCodeModal) {
        return (
          <div>
            <h1 className="title title--lg">
              Now enter your authorization code below.
            </h1>
            <p>
              We just texted you a new code. You should receive your code in
              less than a minute.
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
            <p style={{ color: "red" }}>{this.state.wrongCodeErrorMessage}</p>
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
            <button className="btn btn--round-invert" onClick={this.closeModal}>
              Cancel
            </button>
          </div>
        );
      } else {
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
            <button className="btn btn--round">Confirm</button>
          </div>
        );
      }
    } else {
        return (
            <div>{this.handleErrors(this.state.afterGetRequest)}</div>
        )
    }
  }
  render() {
    return <div>{this.renderModalContent()}</div>;
  }
}

const mapStateToProps = state => {
  return {
    securePin: state.security.secretPin,
    listOfUserNumbers: state.security.listOfUserNumbers,
    smartPinMtn: state.security.smartPinMtn,
    isSecurePinValidated: state.security.isSecurePinValidated
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
