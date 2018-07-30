import React, { Component } from 'react'
import InputField from '../FormElements/InputComponent'

class PrimaryPhoneBlock extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userPrimaryPhone: this.convertPhoneToUSAFormat(this.props.userPrimaryPhoneInfo.primaryPhone),
      userAlternatePhone: this.convertPhoneToUSAFormat(this.props.userPrimaryPhoneInfo.alternatePhone),
      requiredPrimaryError: true,
      requiredAlternateError: true,
      isValidPrimary: true,
      isValidAlternate: true,
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

   convertPhoneToUSAFormat = (phone) => {
      let x = phone.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
      return !x[2] ? x[1] : '' + x[1] + '.' + x[2] + (x[3] ? '.' + x[3] : '');
   }

   handleOnAlternatePhoneChange = (e) => {
     let x = e.target.value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
    let value = !x[2] ? x[1] : '' + x[1] + '.' + x[2] + (x[3] ? '.' + x[3] : '');

     this.setState({ userAlternatePhone: value }, () => this.onChangeAlternatePhoneInput());
   }

    handleOnEditCancel = (type) => {
      this.setState({
        userPrimaryPhone: this.convertPhoneToUSAFormat(this.props.userPrimaryPhoneInfo.primaryPhone),
        userAlternatePhone: this.convertPhoneToUSAFormat(this.props.userPrimaryPhoneInfo.alternatePhone)
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
    const {  phoneidInvalidMessages, requiredPrimaryError, requiredAlternateError, userPrimaryPhone, userAlternatePhone } = this.state;
    const { userPrimaryPhoneInfo, showPrimaryPhoneEdit, primaryPhoneEditMode, phoneSaved } = this.props;
    const isValidPrimary = this.state.isValidPrimary;
    const isValidAlternate = this.state.isValidAlternate;
    const editableClassName = primaryPhoneEditMode ? "" : "description_box_disabled";
        const savedSectionStyle = {
      "display": "inline"
    };
    return (
     <div className={`row description_box ${editableClassName}`}>
     <div className="clearfix"></div>
     <div className="body">
                    <div className="col-xs-12 col-sm-4 description_box__header">
                        <h4 tabIndex="0">Primary Phone</h4>
                        <p>Provide the phone numbers where we can best reach you.</p>
                    </div>
                    <div className="col-xs-12 col-sm-8 description_box__large-container">
                        <div className="row">

                                <div className="col-xs-12 col-sm-10 description_box__details">
                                {
                                    !(!showPrimaryPhoneEdit && primaryPhoneEditMode) &&  <div className="description_box__read">

                                        <p>{this.convertPhoneToUSAFormat(userPrimaryPhone)}</p>

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
                          <InputField type="text" handleOnChange={this.handleOnAlternatePhoneChange} placeholder="000.000.0000" name="alternatephone" pattern="^\d{3}.\d{3}.\d{4}$" touched={this.state.istouchedAlternate} value={userAlternatePhone} />
                        </div>

                      </div>
                    </div>
                  </div>
                }

                {
                  phoneSaved && <span className="text-success fa fa-check-circle col-xs-12 section-saved section-saved_block" tabIndex="0" style={savedSectionStyle}>
                  &nbsp;Saved
                  </span>
                }
                
              </div>
              {
                showPrimaryPhoneEdit && <div className="description_box__edit description_box__edit_section primary-phone-edit">
                  <a className="description_box__btn-edit" onClick={() => this.props.handleEditCancel('primaryPhoneBlock')} role="button">Edit</a>
                </div>
              }
              {
                !showPrimaryPhoneEdit && primaryPhoneEditMode &&
                  <div className="description_box__edit description_box__edit_section">
                  <a className="description_box__btn-edit" onClick={() => this.props.handleEditCancel('cancelblock')} role="button">Cancel</a>
                </div>
              }
            </div>
          </div>
      
        {
          !showPrimaryPhoneEdit && primaryPhoneEditMode && <div className="footer description_box__control-btn col-xs-12">
            <a className="btn btn--round-invert" role="button" onClick={() => this.handleOnEditCancel('cancelBlock')}>Cancel</a>
            <button className="btn btn--round" disabled={ !(isValidPrimary && isValidAlternate)} onClick={() => this.props.handleSave('primaryPhoneBlock', {primaryPhone:userPrimaryPhone.split('.').join(''),alternatePhone:userAlternatePhone.split('.').join('')}, event)}>Save Changes</button>
          </div>
        }
      </div>
      </div>
    )
  }
}

export default PrimaryPhoneBlock;
