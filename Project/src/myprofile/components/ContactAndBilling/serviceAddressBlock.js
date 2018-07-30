import React, { Component } from 'react'
import InputField from '../FormElements/InputComponent'
import './style.css'

import ServiceLine from './serviceLine';

class ServiceAddressBlock extends Component {
  constructor(props) {
    super(props)
    this.state = {
      requiredError: true,
      isValid: '',
      istouched: false,
     serviceAddressInvalidMessages: [
        { name: '6-60 characters', error: false, type: 'character' }
      ],
    }
  }

    
   handleOnEditCancel = (type) => {
      //this.setState({
       // address: this.props.userServiceAddressInfo.address
      //});
      this.props.handleEditCancel(type);
    }

    getUSAStates = (selectedVal) => {
      return (
        <select className="state-select" name="USA State" onChange={this.onUSstateChange} defaultValue={selectedVal}>
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

  render() {
    const { serviceAddressInvalidMessages, requiredError } = this.state;
     const { userServiceAddressInfo, showServiceAddress, serviceAddressEditMode } = this.props;
     const isValid = !serviceAddressInvalidMessages.find(address => address.error)
     const editableClassName = serviceAddressEditMode ? "" : "description_box_disabled";

     const renderServiceLines = (serviceLine) => {
        return(
             <div className="description_box__read description_box__read_service_line" key={serviceLine.line}>
                      
                <ServiceLine serviceLine={serviceLine.line} />

             </div>
        )
     };

    return (
     <div className={`row description_box ${editableClassName}`}>
        <div className="clearfix"></div>
        <div className="body">
        <div className="col-xs-12 col-sm-4 description_box__header">
                        <h4 tabIndex="0">Service Addresses</h4>
                        <p>Tell us where you use the service so we can calculate the right taxes and surcharges</p>
                    </div>
                    <div className="col-xs-12 col-sm-8 description_box__large-container">
                        <div className="row">

                                <div className="col-xs-12 col-sm-10 description_box__details">
                                {
                                    !(!showServiceAddress && serviceAddressEditMode) &&  <div className="description_box__read">
                                <div className="description_box__details">
                                    <p>
                                   <strong> Same as billing Address</strong>
                                    </p>
                                    </div>
                                    <div className="service-lines">

                                        {userServiceAddressInfo.sameAsBilling.serviceLines.map(renderServiceLines)}

                                    </div>

                                    </div>
                                    
                                }
                                 {
                                    !(!showServiceAddress && serviceAddressEditMode) &&  <div className="description_box__read">
                                <div className="description_box__details">
                                    <p>
                                   <strong>{userServiceAddressInfo.serviceAddress[0].serviceAddress.address.address}</strong>
                                   <strong>{userServiceAddressInfo.serviceAddress[0].serviceAddress.address.apartment}</strong><br/>
                                   <strong>{userServiceAddressInfo.serviceAddress[0].serviceAddress.address.city}</strong><br/>
                                   <strong>{userServiceAddressInfo.serviceAddress[0].serviceAddress.address.state}</strong> <strong>{userServiceAddressInfo.serviceAddress[0].serviceAddress.address.zip}</strong>
                                    </p>
                                    </div>
                                    <div className="service-lines">

                                        {userServiceAddressInfo.serviceAddress[0].serviceAddress.serviceLines.map(renderServiceLines)}

                                    </div>

                                    </div>
                                    
                                }
                                {
      !showServiceAddress && serviceAddressEditMode && <div className="description_box__form">
                    <div className="description_box__form" aria-hidden="false">
                                       
                                    </div>
                  </div>
                }
              </div>
              {
                showServiceAddress && <div className="description_box__edit description_box__edit_section">
                  <a className="description_box__btn-edit" onClick={() => this.props.handleEditCancel('serviceAddressBlock')} role="button">Edit</a>
                </div>
              }
            </div>
          </div>
      
        {
          !showServiceAddress && serviceAddressEditMode && <div className="footer col-xs-12">
            <a className="btn btn--round-invert" role="button" onClick={() => this.handleOnEditCancel('cancelBlock')}>Cancel</a>
            <button className="btn btn--round" disabled={requiredError} onClick={() => this.props.handleSave('serviceAddressBlock', {}, event)}>Save Changes</button>
          </div>
        }
        </div>
                    
      </div>
);
  }
}

export default ServiceAddressBlock;
