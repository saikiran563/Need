import React, { Component } from 'react';
import InputField from '../FormElements/InputComponent';

class EmailAddress extends Component {
  constructor(props) {
    super(props)
    this.state = {
//      userEmail: this.props.userEmailInfo.read.emailId,
      userEmail: this.props.userEmailInfo.emailID,
      requiredError: true,
      isValid: true,
      istouched: false,
      emailidInvalidMessages: [
        { name: 'Invalid email address format', error: false, type: 'character' },
        { name: 'We are currently unable to update your email address. Please check the format and re-enter.'},
        { name: 'Vtext.com is a text messaging address and not a valid email address. Please enter an email address.'},
        { name: 'We are currently unable to update your primary email address.'}
      ],
    }
  }

  componentWillReceiveProps(newProps) {
    if(this.props.userEmailInfo.emailID !== newProps.userEmailInfo.emailID){
      this.setState({userEmail:newProps.userEmailInfo.emailID});

    }
 }

   handleOnChange = (e) => {
     this.setState({ userEmail: e.target.value }, () => this.onChangeInput());
   }

    handleOnEditCancel = (type) => {
      this.setState({
        userEmail: this.props.userEmailInfo.emailID
      });
      this.props.handleEditCancel(type);
    }

  onChangeInput = () => {
    this.setState({istouched: true});
    const val = this.state.userEmail;
    const emailidInvalidMessages = JSON.parse(JSON.stringify(this.state.emailidInvalidMessages));
    if (/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(val)){
      this.setState({ requiredError: false, isValid: true });
 
    } else {
       this.setState({
        requiredError: true, isValid: false, emailidInvalidMessages: [
          { name: 'Invalid email address format', error: false, type: 'character' }
        ]
      });
    }

  }

  render() {
    const {  emailidInvalidMessages, requiredError, userEmail } = this.state;
    const { userEmailInfo, showEmailEdit, userEditMode, emailStatus, emailOkContinue } = this.props;
    const isValid = this.state.isValid;
    const editableClassName = userEditMode ? "" : "description_box_disabled";
    const savedSectionStyle = {
      "display": "inline",
      "marginTop": "10px",
      "paddingTop": "10px"
    };
    return (
     <div className={`row description_box ${editableClassName}`}>
                    <div className="col-xs-12 col-sm-4 description_box__header">
                        <h4 tabIndex="0">Email Address</h4>
                        <p>Choose the email address that we should use to contact you</p>
                    </div>
                    <div className="col-xs-12 col-sm-8 description_box__large-container">
                        <div className="row">

                                <div className="col-xs-12 col-sm-10 description_box__details">
                                {
                                  !(!showEmailEdit && userEditMode) &&  <div className="description_box__read">

                                        <p>{userEmail}</p>

                                    </div>
                                }
                                {
      !showEmailEdit && userEditMode && <div className="description_box__form">
                    <div className="row">
                      <div className="col-xs-12">
                        <div className="form-group email-block-input">
                          <label htmlFor="email">Change Email Address</label>
                          <InputField type="text" handleOnChange={this.handleOnChange} placeholder="name@domain.com" name="emailid" valid={isValid} touched={this.state.istouched} value={userEmail} analyticstrack="emailId-inputfield" />
                          {!isValid && <span className="help-block">{emailidInvalidMessages[0].name}</span>}
                          { (emailStatus !== '0' &&  emailStatus !== null) ? <span className="help-block">{getErrorMsgByCode(emailStatus)}</span>  : null}
                        </div>
                      </div>
                    </div>
                  </div>
                }
                
              </div>
              {
                emailOkContinue && emailStatus == '0' && <span className="text-success fa fa-check-circle col-xs-12 section-saved section-saved_block" tabIndex="0" style={savedSectionStyle}>
                &nbsp;Saved
                 </span>
               } 
              {
                showEmailEdit && <div className="description_box__edit description_box__edit_section">
                  <a className="description_box__btn-edit" onClick={() => this.props.handleEditCancel('emailBlock')} role="button" analyticstrack="emailId-edit">Edit</a>
                </div>
              }
              {
                !showEmailEdit && userEditMode &&
                  <div className="description_box__edit description_box__edit_section cancel">
                  <a className="description_box__btn-edit description_box__btn-edit-cancel" onClick={() => this.props.handleEditCancel('cancelblock')} role="button" analyticstrack="emailId-cancel">Cancel</a>
                </div>
              }
                {
              !showEmailEdit && userEditMode && <div className="footer description_box__control-btn col-xs-12">
                <button className="btn btn--round-invert" role="button" onClick={() => this.handleOnEditCancel('cancelBlock')}>Cancel</button>
                <button className="btn btn--round" disabled={requiredError || reactGlobals.isCsr} onClick={() => this.props.handleSave('emailBlock', {emailID:userEmail}, event)} analyticstrack="emailId-savechanges">Save Changes</button>
             </div>
        }
            </div>
            
      
          </div>
      
      </div>
    )
  }
}

export default EmailAddress;
