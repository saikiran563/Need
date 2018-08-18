import React, { Component } from "react";
import InputField from "../FormElements/InputComponent";

import { connect } from "react-redux";

import Modal from "../Modal/modal";
import SecurePin from "../SecurePin/SecurePin";

import {
  getSecretPinStatus,
  getListOfUserNumbers,
  sendSecurePinToPhone,
  confirmSecurePinCode
} from "../Security/actions/fetchSecurities";

class EditService extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAddressEditor: false,
      addressSelected: null,
      newAddress: this.setNewAddress(this.props),
      isValid: false,
      modalStatus: false,
      listOfAccountNumbersModal: false,
      afterGetRequest: [],
      errorModal: false,
      reqBody: {},
      serviceAddressStatus: null
    };
  }

   setNewAddress(props) {
     let newAddress = {
        addressLine1: null,
        addressLine2: null,
        city: null,
        state: null,
        zip: null,
        countryCode: ""
      };
      if(props.editType == "serviceAddressEdit") return props.line.address;
      return newAddress;
    }

  handleAddressSelection() {
    this.setState({
      showAddressEditor: !this.state.showAddressEditor,
      isValid: false
    });
  }

  handleOnUSstateChange = e => {
    this.state.newAddress.state = e.target.value;
    this.state.isValid = e.target.value ? true : false;
    this.setState(this.state);
  };

  getUSAStates = selectedVal => {
    return (
      <select
        className="state-select"
        name="USA State"
        onChange={this.handleOnUSstateChange}
        defaultValue={selectedVal}
      >
        <option value="null">Select</option>
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

  startSecurePinFlow = event => {
    let reqBody = {
      address: null,
      mdns: []
    };

    if (
      this.state.showAddressEditor ||
      this.props.editType === "serviceAddressEdit"
    ) {
      reqBody.address = this.state.newAddress;
      if (this.props.editType === "serviceAddressEdit") {
        reqBody.mdns = this.props.line.serviceLines.line;
      } else {
        reqBody.mdns.push(this.props.line);
      }
    } else {
      reqBody.address = this.state.addressSelected;
      reqBody.mdns.push(this.props.line);
    }


    console.log("reqBody", reqBody);
    this.setState({ reqBody });

    this.props.getSecretPinStatus().then(() => {
      const { securePin } = this.props;
      console.log(securePin);
      if (!this.props.error) {
        if (!securePin.securePinEnabled) {
          console.log("secure pin not enabled");
          return this.props.handleSave("serviceAddressBlock", reqBody, event);
        }
        if (!securePin.securePinVerified) {
          console.log("secure pin not verified, go through secure pin flow");
          this.props.getListOfUserNumbers().then(() => {
            this.setState({
              modalStatus: true,
              listOfAccountNumbersModal: true,
              afterGetRequest: this.props.listOfUserNumbers
            });
          });
        } else {
          console.log("secure pin already verified");
          return this.props.handleSave("serviceAddressBlock", reqBody, event);
        }
      } else {
        this.setState({
          errorModal: true,
          afterGetRequest: this.props.securePin
        });
      }
    });
  };

  closeModal = () => {
    this.setState({
      errorModal: false,
      modalStatus: false
    });
  };

  onSaveServiceAddress(event) {
    let reqBody = {
      address: null,
      mdns: []
    };

    if (
      this.state.showAddressEditor ||
      this.props.editType === "serviceAddressEdit"
    ) {
      reqBody.address = this.state.newAddress;
      if (this.props.editType === "serviceAddressEdit") {
        reqBody.mdns = this.props.line.serviceLines.line;
      } else {
        reqBody.mdns.push(this.props.line);
      }
    } else {
      reqBody.address = this.state.addressSelected;
      reqBody.mdns.push(this.props.line);
    }
    console.log("reqBody", reqBody);
    this.setState({ reqBody });

    this.props.handleSave("serviceAddressBlock", reqBody, event);
    if(this.props.serviceAddressStatus == '0'){
      this.props.onCancel();
    }
    
  }

  onExistingAddressSelection(event) {
    this.state.addressSelected = JSON.parse(event.target.value);
    this.state.isValid = event.target.value ? true : false;
    this.setState(this.state);
  }

  onNewAddressInputChange(value, fieldName) {
    if (fieldName == "zip") {
      const zipTest = /^[0-9\b]+$/;
      if (!zipTest.test(value) && value !== "") {
        this.state.newAddress[fieldName] = "";
        this.setState(this.state);
        return;
      }
    }

    this.state.newAddress[fieldName] = value;
    this.state.isValid = value ? true : false;
    this.setState(this.state);
  }

  getAddressString(addrOBJ) {
    let addrSTR = "";
    addrSTR += addrOBJ.addressLine1 ? addrOBJ.addressLine1 + ", " : "";
    addrSTR += addrOBJ.addressLine2 ? addrOBJ.addressLine2 + ", " : "";
    addrSTR += addrOBJ.city ? addrOBJ.city + ", " : "";
    addrSTR += addrOBJ.state ? addrOBJ.state + ", " : "";
    addrSTR += addrOBJ.zip ? addrOBJ.zip : "";

    return addrSTR;
  }

  addressOption(address) {
    return (
      <option value={JSON.stringify(address)}>
        {this.getAddressString(address)}
      </option>
    );
  }

  renderExistingAddressList() {
    let addressListOnAccount = this.props.addressListOnAccount;

    return (
      <select
        className="full-width"
        elemets="listaddress"
        select="selectedAddress"
        onChange={this.onExistingAddressSelection.bind(this)}
        placeholder="- Please Choose -"
      >
        <option value="null">Select Address</option>
        {this.props.addressListOnAccount.map(this.addressOption.bind(this))}
      </select>
    );
  }

  renderNewAddressInputForm(newAddressClassName) {
    let address = this.state.newAddress;
    return (
      <div className={newAddressClassName}>
        <div className="col-xs-12">
          <label for="address_17">Address*</label>
        </div>
        <div className="col-xs-12">
          <input
            name="addressLine1"
            className="new-address"
            value={address.addressLine1}
            type="text"
            onChange={e =>
              this.onNewAddressInputChange(e.target.value, "addressLine1")
            }
            analyticstrack="editService-addressline1input"
          />
        </div>
        <div className="col-xs-12">
          <label for="apt_17">Apt/Suite/Other</label>
        </div>
        <div className="col-xs-12">
          <input
            name="addressLine2"
            type="text"
            value={address.addressLine2}
            onChange={e =>
              this.onNewAddressInputChange(e.target.value, "addressLine2")
            }
            analyticstrack="editService-addressline2input"
          />
        </div>
        <div className="col-xs-12 col-sm-5">
          <label for="city_17">City*</label>
          <br />
          <input
            type="text"
            name="city"
            value={address.city}
            onChange={e => this.onNewAddressInputChange(e.target.value, "city")}
            analyticstrack="editService-cityinput"
          />
        </div>
        <div className="col-xs-6 col-sm-3">
          <label for="state_17">State*</label>
          <br />
          {this.getUSAStates(address.state)}
        </div>
        <div className="col-xs-6 col-md-4">
          <label for="zipcode_17">Zip code*</label>
          <br />
          <input
            name="zip"
            type="text"
            maxlength="5"
            value={address.zip}
            onChange={e => this.onNewAddressInputChange(e.target.value, "zip")}
            analyticstrack="editService-zipinput"
          />
        </div>
      </div>
    );
  }

  renderEditForLine(newAddressClassName, existAddressClassname) {
    return (
      <div className="serviceLineEdit_templ">
        <div className="row form-address">
          <div>
            <div className="col-xs-12 form-address__container-input">
              <label
                className="label-radio radio-inline"
                for="serviceAddressRadioGroup"
              >
                <input
                  type="radio"
                  value="false"
                  name="serviceAddressRadioGroup"
                  value="true"
                  onChange={() => this.handleAddressSelection()}
                  defaultChecked
                />
                Select a previous address
              </label>
            </div>

            <div className={existAddressClassname}>
              <div className="col-xs-12">
                {this.renderExistingAddressList()}
              </div>
            </div>
          </div>

          <div className="col-xs-12">
            <label
              className="label-radio radio-inline"
              for="serviceAddressRadioGroup"
            >
              <input
                type="radio"
                value="true"
                name="serviceAddressRadioGroup"
                value="false"
                onChange={() => this.handleAddressSelection()}
              />{" "}
              New address
            </label>
          </div>

          {this.renderNewAddressInputForm(newAddressClassName)}
        </div>
      </div>
    );
  }

  renderLineRead(line) {
    return <p>{this.convertPhoneToUSAFormat(line)} </p>;
  }
  convertPhoneToUSAFormat = (line) => {
      let x = line.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
      return !x[2] ? x[1] : '' + x[1] + '.' + x[2] + (x[3] ? '.' + x[3] : '');
   }
  toPreviousLink() {
    this.props.onCancel()
  }
  renderEditForAddress() {
    return (
      <div className="col-xs-12">
        <label htmlFor='edit address'>Edit Address</label>
        <p>
          Edit the address currently associated with the following lines on your
          account:
        </p>
        {this.props.line.serviceLines.line.map(this.renderLineRead.bind(this))}
        <p>
          You can also edit or change lines service addresses individually from
          the <a onClick={this.toPreviousLink.bind(this)}>previous page</a>.{" "}
        </p>
        {this.renderNewAddressInputForm("row form-address__new_address")}
      </div>
    );
  }

  render() {
      
    let newAddressClassName = this.state.showAddressEditor
      ? "form-address__new_address"
      : "form-address__new_address description_box_disabled";
    let existAddressClassname = this.state.showAddressEditor
      ? "form-address__exist_address description_box_disabled"
      : "form-address__exist_address";
    let isValid = () => {
      if (
        this.state.showAddressEditor ||
        this.props.editType === "serviceAddressEdit"
      ) {
        if (
          this.state.newAddress.addressLine1 &&
          this.state.newAddress.city &&
          this.state.newAddress.state &&
          this.state.newAddress.zip && this.state.newAddress.zip.length > 4
        ) {
          return true;
        }
        return false;
      } else {
        return this.state.isValid;
      }
    };
    return (
      <div className="row">
        {this.props.editType === "serviceLineEdit"
          ? this.renderEditForLine(newAddressClassName, existAddressClassname)
          : this.renderEditForAddress()}

        <div className="col-xs-12 form-address__btn-container">
          <a
            onClick={() => this.props.onCancel()}
            className="btn btn--round-invert "
            role="button"
            analyticstrack="editService-cancel"
          >
            Cancel
          </a>
          <button
            className="btn btn--round"
            disabled={!isValid() || reactGlobals.isCsr}
            onClick={event => this.startSecurePinFlow(event)}
            analyticstrack="editService-savechanges"
          >
            Save Changes
          </button>
        </div>
        <Modal
          modalStatus={this.state.modalStatus}
          closeModal={this.closeModal}
        >
          <SecurePin
            handleSaveType={"serviceAddressBlock"}
            handleSaveData={this.state.reqBody}
            handleSave={this.props.handleSave}
            closeModal={this.closeModal}
          />
        </Modal>
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
)(EditService);
