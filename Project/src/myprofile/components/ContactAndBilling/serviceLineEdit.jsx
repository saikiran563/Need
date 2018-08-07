import React, { Component } from 'react'
import InputField from '../FormElements/InputComponent'

class ServiceLineEdit extends Component {
  constructor(props) {
    super(props)
    this.state = {
        showAddressEditor: false,
        addressSelected: null,
        newAddress: {
            addressLine1: null,
            addressLine2: null,
            city: null,
            state: null,
            zip: null
        }
    }
  }

  handleAddressSelection() {
      this.setState({
          showAddressEditor : !this.state.showAddressEditor
      });
  }

    handleOnUSstateChange = (e) => {
     // this.setState({ USstate: e.target.value }, () => this.onChangeInput('state'));
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

    onExistingAddressSelection(event) {
        this.setState({
            addressSelected: event.target.value
        })
    }

    onNewAddressInputChange(value,fieldName) {
       this.state.newAddress[fieldName] = value; 
        this.setState(this.state.newAddress);
    }

  renderExistingAddressOptions() {
      return(
          <select className="full-width" elemets="listaddress" select="selectedAddress" onChange={this.onExistingAddressSelection} placeholder="- Please Choose -">
            <option value="selectLabel">Select Address</option>
            <option value="111 Street Name Dr, City, State 0000-0000">111 Street Name Dr, City, State 0000-0000</option>
            <option value="112 Street Name Dr, City, State 0000-0000">112 Street Name Dr, City, State 0000-0000</option>
            <option value="131 Street Name Dr, City, State 0000-0000">131 Street Name Dr, City, State 0000-0000</option>
         </select>
      );
  }

  render() {
  let newAddressClassName = this.state.showAddressEditor ? 'form-address__new_address' : 'form-address__new_address description_box_disabled';
  let existAddressClassname = this.state.showAddressEditor ? 'form-address__exist_address description_box_disabled' : 'form-address__exist_address' ; 
    return (
     <div className="serviceLineEdit_templ">
                  
             <div className="row form-address">
                <div className="col-xs-12 form-address__container-input">

                    <label className="label-radio radio-inline" for="serviceAddressRadioGroup">
                        <input type="radio" value="false" name="serviceAddressRadioGroup" value="true" onChange={() => this.handleAddressSelection()} defaultChecked /> 
                        Select a previous address
                    </label>

                </div>

                <div className={existAddressClassname}>
                    <div className="col-xs-12">
                     {this.renderExistingAddressOptions()}
                    </div>
                </div>
                <div className="col-xs-12">
                    <label className="label-radio radio-inline" for="serviceAddressRadioGroup">
                        <input  type="radio" value="true" name="serviceAddressRadioGroup" value="false" onChange={() => this.handleAddressSelection()} /> New address</label>
                </div>
              <div className={newAddressClassName}>
                    <div className="col-xs-12">
                        <label for="address_17">Address*</label>
                    </div>
                <div className="col-xs-12">
                    <input name="addressLine1"  className="new-address" type="text" onChange={(e) => this.onNewAddressInputChange(e.target.value,'addressLine1')}/>
                        </div>
                    <div className="col-xs-12">
                        <label for="apt_17">Apt/Suite/Other</label>
                    </div>
                 <div className="col-xs-12">
                    <input name="addressLine2" type="text" onChange={(e) => this.onNewAddressInputChange(e.target.value,'addressLine2')}/>
                    </div>
                <div className="col-xs-12 col-sm-5">
                    <label for="city_17">City*</label><br/>
                        <input type="text" name="city" onChange={(e) => this.onNewAddressInputChange(e.target.value,'city')}/>
                </div>
                <div className="col-xs-12 col-sm-3">
                    <label for="state_17">State*</label><br/>
                      {this.getUSAStates()}
                </div>
                <div className="col-xs-12 col-md-4">
                    <label for="zipcode_17">Zip code*</label><br/>
                        <input name="zip" type="text" onChange={(e) => this.onNewAddressInputChange(e.target.value,'zip')}/>
                </div>
                </div>
                
                <div className="col-xs-12 form-address__btn-container">
                    <a onClick={() => this.props.onCancel()} className="btn btn--round-invert" role="button">Cancel</a> 
                    <button className="btn btn--round" disabled="">Save Changes</button></div>
                </div>   
      </div>
    )
  }
}

export default ServiceLineEdit;
