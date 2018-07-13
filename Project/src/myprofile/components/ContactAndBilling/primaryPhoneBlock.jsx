import React, { Component } from 'react'
import InputField from '../FormElements/InputComponent'

class PrimaryPhoneBlock extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userPrimaryPhone: this.props.userPrimaryPhoneInfo.readPrimaryPhone,
      userAlternatePhone: this.props.userPrimaryPhoneInfo.readAlternatePhone,
      requiredPrimaryError: true,
      requiredAlternateError: true,
      isValidPrimary: '',
      isValidAlternate: '',
      istouchedPrimary: false,
      istouchedAlternate: false,
      phoneidInvalidMessages: [
        { name: 'Invalid phone number', error: false, type: 'number' }
      ],
    }
  }

   handleOnChange = (e) => {
     
    let x = e.target.value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
    let value = !x[2] ? x[1] : '' + x[1] + '.' + x[2] + (x[3] ? '.' + x[3] : '');

     this.setState({ userPrimaryPhone: value }, () => this.onChangeInput());
   }

   handleOnAlternatePhoneChange = (e) => {
     let x = e.target.value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
    let value = !x[2] ? x[1] : '' + x[1] + '.' + x[2] + (x[3] ? '.' + x[3] : '');

     this.setState({ userAlternatePhone: value }, () => this.onChangeAlternatePhoneInput());
   }

    handleOnEditCancel = (type) => {
      this.setState({
        userPrimaryPhone: this.props.userPrimaryPhoneInfo.readPrimaryPhone
      });
      this.props.handleEditCancel(type);
    }

  onChangeInput = () => {

  this.setState({istouchedPrimary: true});
    const val = this.state.userPrimaryPhone;
    const phoneidInvalidMessages = JSON.parse(JSON.stringify(this.state.phoneidInvalidMessages));
    if (/\d{3}[\.]\d{3}[\.]\d{4}/
.test(val)){
      this.setState({ requiredPrimaryError: false, isValidPrimary: true });
 
    } else {
       this.setState({
        requiredPrimaryError: true, isValidPrimary: false, phoneidInvalidMessages: [
          { name: 'Not a valid phone number format', error: false, type: 'character' }
        ]
      });
    }

  }

  onChangeAlternatePhoneInput = () => {
    this.setState({istouchedAlternate: true});
    const val = this.state.userAlternatePhone;
    const phoneidInvalidMessages = JSON.parse(JSON.stringify(this.state.phoneidInvalidMessages));
    if (/\d{3}[\.]\d{3}[\.]\d{4}/
.test(val)){
      this.setState({ requiredAlternateError: false, isValidAlternate: true });
 
    } else {
       this.setState({
        requiredAlternateError: true, isValidAlternate: false, phoneidInvalidMessages: [
          { name: 'Not a valid phone number format', error: false, type: 'character' }
        ]
      });
    }
  }

  render() {
    const {  phoneidInvalidMessages, requiredPrimaryError, userPrimaryPhone, userAlternatePhone } = this.state;
    const { userPrimaryPhoneInfo, showPrimaryPhoneEdit, primaryPhoneEditMode } = this.props;
   const isValidPrimary = this.state.isValidPrimary;
   const isValidAlternate = this.state.isValidAlternate;
    const editableClassName = primaryPhoneEditMode ? "" : "description_box_disabled";
    return (
     <div className={`row description_box ${editableClassName}`}>
     <div className="clearfix"></div>
     <div className="body">
                    <div className="col-xs-12 col-sm-4 description_box__header">
                        <h4 tabIndex="0">{userPrimaryPhoneInfo.title}</h4>
                        <p>{userPrimaryPhoneInfo.desc}</p>
                    </div>
                    <div className="col-xs-12 col-sm-8 description_box__large-container">
                        <div className="row">

                                <div className="col-xs-12 col-sm-10 description_box__details">
                                {
                                    !(!showPrimaryPhoneEdit && primaryPhoneEditMode) &&  <div className="description_box__read">

                                        <p>{userPrimaryPhoneInfo.readPrimaryPhone}</p>

                                    </div>
                                }
                                {
      !showPrimaryPhoneEdit && primaryPhoneEditMode && <div className="description_box__form">
                    <div className="row">
                      <div className="col-xs-12">
                        <div className="form-group phone-block-input">
                          <label htmlFor="primary phone number">Change Primary Phone</label>
                          <InputField type="text" handleOnChange={this.handleOnChange} placeholder="555.555.5555" name="primaryphone" pattern="^\d{3}.\d{3}.\d{4}$" touched={this.state.istouchedPrimary} value={userPrimaryPhone} />
                        </div>

                        <div className="form-group phone-block-input">
                          <label htmlFor="alternate phone number">Change Alternate Phone</label>
                          <InputField type="text" handleOnChange={this.handleOnAlternatePhoneChange} placeholder="555.555.5555" name="alternatephone" pattern="^\d{3}.\d{3}.\d{4}$" touched={this.state.istouchedAlternate} value={userAlternatePhone} />
                        </div>

                      </div>
                    </div>
                  </div>
                }
              </div>
              {
                showPrimaryPhoneEdit && <div className="description_box__edit description_box__edit_section primary-phone-edit">
                  <a className="btn btn-anchor" onClick={() => this.props.handleEditCancel('primaryPhoneBlock')} role="button">Edit</a>
                </div>
              }
            </div>
          </div>
      
        {
          !showPrimaryPhoneEdit && primaryPhoneEditMode && <div className="footer col-xs-12">
            <a className="btn btn--round-invert" role="button" onClick={() => this.handleOnEditCancel('cancelBlock')}>Cancel</a>
            <button className="btn btn--round" disabled={requiredPrimaryError} onClick={() => this.props.handleSave('primaryPhoneBlock', {userPrimaryPhone,userAlternatePhone}, event)}>Save Changes</button>
          </div>
        }
      </div>
      </div>
    )
  }
}

export default PrimaryPhoneBlock;
