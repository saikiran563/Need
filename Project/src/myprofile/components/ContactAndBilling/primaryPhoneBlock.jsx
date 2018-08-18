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
      isValidPrimary: false,
      isValidAlternate: false,
      istouchedPrimary: false,
      istouchedAlternate: false,
      phoneidInvalidMessages: [
        { name: 'Invalid phone number', error: false, type: 'number' }
      ],
    }
    
  }
  componentWillReceiveProps(newProps) {

      if(newProps.userPrimaryPhoneInfo.primaryPhone !== this.props.userPrimaryPhoneInfo.primaryPhone || newProps.userPrimaryPhoneInfo.alternatePhone !== this.props.userPrimaryPhoneInfo.alternatePhone){
        this.setState(
          {
            userPrimaryPhone: this.convertPhoneToUSAFormat(newProps.userPrimaryPhoneInfo.primaryPhone),
            userAlternatePhone: this.convertPhoneToUSAFormat(newProps.userPrimaryPhoneInfo.alternatePhone)
            }
            );
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
    if (/\d{3}[\.]\d{3}[\.]\d{4}/.test(val) && val !== this.convertPhoneToUSAFormat(this.props.userPrimaryPhoneInfo.primaryPhone)){
    let testAlternate = false;
    if(/\d{3}[\.]\d{3}[\.]\d{4}/.test(this.state.userAlternatePhone) || this.state.userAlternatePhone === ''){
        testAlternate = true
    }
      this.setState({ requiredPrimaryError: false, isValidPrimary: true, isValidAlternate: testAlternate });
 
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
    if ((/\d{3}[\.]\d{3}[\.]\d{4}/.test(val)  || val==='') && val !==  this.convertPhoneToUSAFormat(this.props.userPrimaryPhoneInfo.alternatePhone)){
   let testPrimary = false;
    if(/\d{3}[\.]\d{3}[\.]\d{4}/.test(this.state.userPrimaryPhone) || this.state.alternatePhone === ''){
        testPrimary = true
    }
      this.setState({ requiredAlternateError: false, isValidAlternate: true, isValidPrimary: testPrimary });
 
    } else {
       this.setState({
        requiredAlternateError: true, isValidAlternate: false, phoneidInvalidMessages: [
          { name: 'Not a valid phone number format', error: false, type: 'character' }
        ]
      });
    }
  }

  render() {
    const { phoneidInvalidMessages, requiredPrimaryError, requiredAlternateError, userPrimaryPhone, userAlternatePhone } = this.state;
    const { userPrimaryPhoneInfo, showPrimaryPhoneEdit, primaryPhoneEditMode, primaryPhoneStatus } = this.props;
    const isValidPrimary = this.state.isValidPrimary;
    const isValidAlternate = this.state.isValidAlternate;
    const editableClassName = primaryPhoneEditMode ? "" : "description_box_disabled";
        const savedSectionStyle = {
      "display": "inline",
       "margin-top": "10px",
      "padding-top": "10px"
    };
    return (
     <div className={`row description_box ${editableClassName}`}>
     <div className="clearfix"></div>
     <div className="body">
                    <div className="col-xs-12 col-sm-4 description_box__header">
                        <h4 tabIndex="0">Contact Numbers</h4>
                        <p>Provide the phone numbers where we can best reach you.</p>
                    </div>
                    <div className="col-xs-12 col-sm-8 description_box__large-container">
                        <div className="row">

                                <div className="col-xs-12 col-sm-8 description_box__details">
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
                          <label htmlFor="primary phone number">Primary Phone</label>
                          <InputField type="text" handleOnChange={this.handleOnChange} placeholder="000.000.0000" name="primaryphone" pattern="^\d{3}.\d{3}.\d{4}$" touched={this.state.istouchedPrimary} value={userPrimaryPhone} analyticstrack="primaryPhone-inputfield"/>
                        </div>

                        <div className="form-group phone-block-input">
                          <label htmlFor="alternate phone number">Alternate Phone</label>
                          <InputField type="text" handleOnChange={this.handleOnAlternatePhoneChange} placeholder="000.000.0000" name="alternatephone"  touched={this.state.istouchedAlternate} value={userAlternatePhone} analyticstrack="alternativePhone-inputfield"/>
                        </div>

                      </div>
                       {
          !showPrimaryPhoneEdit && primaryPhoneEditMode && <div className="footer description_box__control-btn col-xs-12">
            <button className="btn btn--round-invert" role="button" onClick={() => this.handleOnEditCancel('cancelBlock')} analyticstrack="primaryPhone-cancel">Cancel</button>
            <button className="btn btn--round" disabled={ !(isValidPrimary && isValidAlternate) || reactGlobals.isCsr} onClick={() => this.props.handleSave('primaryPhoneBlock', {primaryPhone:userPrimaryPhone.split('.').join(''),alternatePhone:userAlternatePhone.split('.').join('')}, event)} analyticstrack="primaryPhone-savechanges">Save Changes</button>
          </div>
        }
                    </div>
                    
                  </div>
                }

              </div>
              {
                  primaryPhoneStatus == '0' && <span className="text-success fa fa-check-circle col-xs-12 section-saved section-saved_block" tabIndex="0" style={savedSectionStyle}>
                  &nbsp;Saved
                  </span>
                }
              {
                showPrimaryPhoneEdit && <div className="description_box__edit description_box__edit_section primary-phone-edit">
                  <a className="description_box__btn-edit" onClick={() => this.props.handleEditCancel('primaryPhoneBlock')} role="button" analyticstrack="primaryPhone-edit">Edit</a>
                </div>
              }
              {
                !showPrimaryPhoneEdit && primaryPhoneEditMode &&
                  <div className="description_box__edit description_box__edit_section primaryPhone_cancel cancel">
                  <a className="description_box__btn-edit description_box__btn-edit-cancel" onClick={() => this.props.handleEditCancel('cancelblock')} role="button" analyticstrack="primaryPhone-cancel">Cancel</a>
                </div>
              }
             
            </div>
          </div>
      
        
      </div>
      </div>
    )
  }
}

export default PrimaryPhoneBlock;
