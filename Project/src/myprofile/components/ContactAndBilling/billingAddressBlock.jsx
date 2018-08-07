import React, { Component } from 'react'
import InputField from '../FormElements/InputComponent'

import VerifyAddressPopup from  './verifyAddressPopup';

import './style.css'

class BillingAddressBlock extends Component {
  constructor(props) {
    super(props)
    this.state = {
      address: this.props.userBillingInfo.addressLine1,
      apartment: this.props.userBillingInfo.addressLine2,
      USstate: this.props.userBillingInfo.state,
      city: this.props.userBillingInfo.city,
      zip: this.props.userBillingInfo.zip,
      requiredError: true,
      isValid: '',
      istouched: false,
      billingAddressInvalidMessages: [
        { name: 'Invalid zip code', error: false, type: 'character' }
      ],
    }
  }

 componentWillReceiveProps(newProps) {

      if(newProps.userBillingInfo.addressLine1 !== this.props.userBillingInfo.addressLine1
       || newProps.userBillingInfo.addressLine2 !== this.props.userBillingInfo.addressLine2
       || newProps.userBillingInfo.state !== this.props.userBillingInfo.state
       || newProps.userBillingInfo.city !== this.props.userBillingInfo.city
       || newProps.userBillingInfo.zip !== this.props.userBillingInfo.zip){
        this.setState(
          {
            address: newProps.userBillingInfo.addressLine1,
            apartment: newProps.userBillingInfo.addressLine2,
            USstate: newProps.userBillingInfo.state,
            city: newProps.userBillingInfo.city,
            zip: newProps.userBillingInfo.zip
          }
        );
      }    
  }
     handleAddressOnChange = (e) => {
      this.setState({ address: e.target.value }, () => this.onChangeInput('address'));
    }

    handleApartmentOnChange = (e) => {
      this.setState({ apartment: e.target.value }, () => this.onChangeInput('apartment'));
    }

    handleCityOnChange = (e) => {
       this.setState({ city: e.target.value }, () => this.onChangeInput('city'));
    }

    handleZipOnChange = (e) => {
      const numTest = /^[0-9\b]+$/;
      if(e.target.value == '' || numTest.test(e.target.value)){
          this.setState({ zip: e.target.value }, () => this.onChangeInput('zip'));
      }
     
    }
    handleOnUSstateChange = (e) => {
      this.setState({ USstate: e.target.value }, () => this.onChangeInput('state'));
    }

  onChangeInput = (type) => {
    let val, billingAddressInvalidMessages;
 switch(type) {
      case 'address':
      val = this.state.address;
      billingAddressInvalidMessages = JSON.parse(JSON.stringify(this.state.billingAddressInvalidMessages));
      if(val === ''){
      this.setState({ requiredError: true, isValid: false }); 
      }else{
      this.setState({ requiredError: false, isValid: true }); 
      }
      break;
      case 'apartment':
      val = this.state.apartment;
      billingAddressInvalidMessages = JSON.parse(JSON.stringify(this.state.billingAddressInvalidMessages));
      this.setState({ requiredError: false, isValid: true });  
      break;
      case 'city':
      val = this.state.city;
      billingAddressInvalidMessages = JSON.parse(JSON.stringify(this.state.billingAddressInvalidMessages));
      if(val === ''){
      this.setState({ requiredError: true, isValid: false }); 
      }else{
      this.setState({ requiredError: false, isValid: true }); 
      }
       
      break;
      case 'zip':
      val = this.state.zip;
      billingAddressInvalidMessages = JSON.parse(JSON.stringify(this.state.billingAddressInvalidMessages));
      
      if(val === '' || val.length < 5){
        this.setState({ requiredError: true, isValid: false });
      }else{
        this.setState({ requiredError: false, isValid: true });
      }
      break;
      case 'state':
       val = this.state.USstate;
      billingAddressInvalidMessages = JSON.parse(JSON.stringify(this.state.billingAddressInvalidMessages));
      this.setState({ requiredError: false, isValid: true });
    }
  }

   handleOnEditCancel = (type) => {
      this.setState({
        address: this.props.userBillingInfo.address
      });
      this.props.handleEditCancel(type);
    }

    getUSAStates = (selectedVal) => {
      return (
        <select className="state-select" name="USA State" onChange={this.handleOnUSstateChange} defaultValue={selectedVal}>
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
        </select>)
    }
    contentsForModal = () => {
      return {
        address: this.state.address,
        apartment: this.state.apartment,
        state: this.state.USstate,
        city: this.state.city,
        zip: this.state.zip
      }
    }
    onAddressSelect = (address) => {
        this.setState({
          address: address.address,
          apartment: address.apartment,
          USstate: address.state,
          city: address.city,
          zip: address.zip,
        });
    }

  render() {
    const {  billingAddressInvalidMessages, requiredError, address, apartment, USstate, city, zip } = this.state;
     const { userBillingInfo, showBillingEdit, billingAddressEditMode, billingAddressSaved } = this.props;
     const isValid = !billingAddressInvalidMessages.find(address => address.error)
     const editableClassName = billingAddressEditMode ? "" : "description_box_disabled";
      const savedSectionStyle = {
      "display": "inline",
       "margin-top": "15px",
      "padding-top": "10px"
    };
    return (
     <div className={`row description_box ${editableClassName}`}>
        <div className="clearfix"></div>
        <div className="body">
        <div className="col-xs-12 col-sm-4 description_box__header">
                        <h4 tabIndex="0">Billing Address</h4>
                        <p>Let us know where to send your bill.</p>
                    </div>
                    <div className="col-xs-12 col-sm-8 description_box__large-container">
                        <div className="row">

                                <div className="col-xs-12 col-sm-10 description_box__details">
                                {
                                    !(!showBillingEdit && billingAddressEditMode) &&  <div className="description_box__read">

                                        <p>{address}</p>
                                        <p>{apartment ? apartment : ''}</p>
                                        <p>{city ? city : ''} {USstate} {zip ? zip : ''}</p>

                                    </div>
                                }
                                {
      !showBillingEdit && billingAddressEditMode && <div className="description_box__form">
                    <div className="description_box__form" aria-hidden="false">
                                        <div className="form-address__new_address row">
                                            <div className="col-xs-12">
                                                <label htmlFor="address_23">Address*</label>
                                            </div>
                                            <div className="col-xs-12">
                                                <InputField handleOnChange={this.handleAddressOnChange} placeholder="" touched={this.state.istouched} value={address} name="address_23" type="text"/>
                                            </div>
                                            <div className="col-xs-12">
                                                <label htmlFor="apt_23">Apt/Suite/Other</label>
                                            </div>
                                            <div className="col-xs-12">
                                                <InputField handleOnChange={this.handleApartmentOnChange} placeholder="" touched={this.state.istouched} value={apartment} name="apt_23" type="text" className="" />
                                            </div>
                                            <div className="col-xs-12 col-sm-5">
                                                <label htmlFor="city_23">City*</label>
                                            <br aria-hidden="true" />
                                                <InputField handleOnChange={this.handleCityOnChange} placeholder="" touched={this.state.istouched} value={city} type="text" name="city_23" className="" />
                                            </div>
                                            <div className="col-xs-12 col-sm-3">
                                                <label htmlFor="state">State*</label>
                                            <br aria-hidden="true" />
                                                
                                                    { this.getUSAStates(USstate) }
                                                
                                            </div>
                                            <div className="col-xs-12 col-md-4">
                                                <label htmlFor="zipcode_23">Zip code*</label>
                                            <br aria-hidden="true" />
                                                <InputField handleOnChange={this.handleZipOnChange} placeholder="" touched={this.state.istouched} value={zip}  name="zipcode_23" type="text" className="" />
                                            </div>
                                             {
          !showBillingEdit && billingAddressEditMode && <div className="footer description_box__control-btn col-xs-12 btn--billing-addr">
            <button className="btn btn--round-invert" role="button" onClick={() => this.handleOnEditCancel('cancelBlock')}>Cancel</button>
            <button className="btn btn--round" disabled={requiredError} onClick={() => this.props.handleSave('billingAddressBlock', {addressLine1:address,addressLine2:apartment,city,zip,state: USstate}, event)}>Save Changes</button>
          </div>
        }
                                        </div>
                                       
                                    </div>
                  </div>
                }
                
              </div>
               
                
              {
                showBillingEdit && <div className="description_box__edit description_box__edit_section">
                  <a className="description_box__btn-edit" onClick={() => this.props.handleEditCancel('billingAddressBlock')} role="button">Edit</a>
                </div>
              }
              {
                !showBillingEdit && billingAddressEditMode &&
                  <div className="description_box__edit description_box__edit_section">
                  <a className="description_box__btn-edit description_box__btn-edit-cancel" onClick={() => this.props.handleEditCancel('cancelblock')} role="button">Cancel</a>
                </div>
              }

              {
                 billingAddressSaved && <span className="text-success fa fa-check-circle col-xs-2 section-saved section-saved_block" tabIndex="0" style={savedSectionStyle}>
                &nbsp;Saved
                 </span>
               }
            </div>
          </div>
      
        
        </div>
           <VerifyAddressPopup contents={this.contentsForModal()} onSave={(address) => this.onAddressSelect(address)}/>         
      </div>
);
  }
}

export default BillingAddressBlock;
