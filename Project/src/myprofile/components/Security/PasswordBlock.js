import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from './actions'
import InputField from '../FormElements/InputComponent'
import {encrypt, decrypt,hasValueinArray} from './util'
import './style.css'

class PasswordBlock extends Component {
  constructor(props) {
    super(props)
    this.state= {
      requiredError: true,
      userId : "test12345", /*props.userId,*/
       isValid: '',
       words:["try","post","get"],/* should get it from server call */
       isCurrentPwdValid: '',
      istouched: false,
      isMismatch: false,
      currentPassword: "", newPassword: "", confirmPassword: "",
      errorMessages: [
        { name: '8-20 characters', error: false, type: 'minmax'},
        { name: 'Contains at least one letter', error: false, type: 'onChar' },
        { name: 'Contains at least one number', error: false, type: 'oneNum' },
        { name: 'Is not easy to guess', error: false, type: 'easyGuess'}
      ],
    }
  }

  handleOnChange= (e) => {
    var typeOfpwd = e.target.name;
    var value = e.target.value ;
    if(value.length > 20) return;
    if(typeOfpwd === "newPassword") {
    this.setState({ newPassword: value}, () => this.onChangeInput());
    } else {
      this.setState({ confirmPassword: value }, () => this.onChangeInput());
    }
  }
  
  handleOnSave = (e) => {
       let pwd = 'test12345'; // TODO suppose make server call to get pwd with pwd getPWd(userId);
       let  {userId , currentPassword , requiredError , newPassword,isCurrentPwdValid} = this.state;
       if(pwd === currentPassword )
           { 
             this.setState({ isCurrentPwdValid: true });
             if(!requiredError)
             {
              this.props.handleSave('pwdForm',{ userId, newPassword},event)
             } 
          }
          else {
            this.setState({ isCurrentPwdValid: false }); 
          }
  }
  
  handleOnChangeCurrentPwd= (e) => {
    this.setState({ currentPassword: e.target.value });
  }

  updateUser = (currentUser) => {
    this.setState({userId:currentUser});
  }
  onChangeInput = () => {
    const state = this.state;
    const list = this.props.passwordInfo.list;
    const newPwd =state.newPassword;
    const confirmPwd = state.confirmPassword;
    const exactList = list.exactList;
    const containsList =  list.containsList
    this.setState({istouched: true});
    const errorMessages = JSON.parse(JSON.stringify(this.state.errorMessages));
    if(newPwd.length === 0) {
      this.setState( { requiredError : true,istouched: false, isValid: false,  errorMessages: [
        { name: '8-20 characters', error: false, type: 'minmax'},
        { name: 'Contains at least one letter', error: false, type: 'onChar' },
        { name: 'Contains at least one number', error: false, type: 'oneNum' },
        { name: 'Is not easy to guess', error: false, type: 'easyGuess'}
            
      ] });
    } else {
      this.setState( { requiredError: false });
       if(newPwd.length < 8 || newPwd.length > 20) {
         let invalidMessage = errorMessages.find(message => message.type === 'minmax');
        invalidMessage.error = true;
        this.setState({ errorMessages });
      } else {
        let invalidMessage = errorMessages.find(message => message.type === 'minmax');
        invalidMessage.error = false;
        this.setState({ errorMessages });
      }      
        if (newPwd.match(/^(?=.*\d).{1,}$/)) {
            let invalidMessage =  errorMessages.find(message => message.type === 'oneNum');
            invalidMessage.error = false;
            this.setState({ errorMessages });
        } else {
          let invalidMessage =  errorMessages.find(message => message.type === 'oneNum');
            invalidMessage.error = true;
            this.setState({ errorMessages });
        }
         if (newPwd.match(/^(?=.*[a-z]).{1,}$/)) {
            let invalidMessage =  errorMessages.find(message => message.type === 'onChar');
            invalidMessage.error = false;
            this.setState({ errorMessages });
        } else {
          let invalidMessage =  errorMessages.find(message => message.type === 'onChar');
            invalidMessage.error = true;
            this.setState({ errorMessages });
        }
        
        if (exactList.indexOf(newPwd) != -1 || containsList.some((val) => { return newPwd.indexOf(val) >= 0 })){
            let invalidMessage =  errorMessages.find(message => message.type === 'easyGuess');
            invalidMessage.error = true;
            this.setState({ errorMessages });
        } else {
          let invalidMessage =  errorMessages.find(message => message.type === 'easyGuess');
            invalidMessage.error = false;
            this.setState({ errorMessages });
        }
        if (newPwd === confirmPwd){
             this.setState({ isMismatch:true });
        } else {
           this.setState({ isMismatch:false });
        }
    }
  }

  render() {
    const { controlButtons, errorMessages, userId, requiredError, istouched, currentPassword, 
                                newPassword, confirmPassword,isCurrentPwdValid, isMismatch } = this.state;
    const { passwordInfo, showPasswordEdit, passwordEditMode, pwdSaved, pwdBlock } = this.props;
     const isValid = !errorMessages.find(user => user.error)  
     const isCPValid= true;//isCurrentPwdValid;
     let errorDisplay;
     let errorMsg;
     let pwdStrength = "";
     let strength=3;
     //const strengthClass = ['strength-meter mt-2', newPassword.length>0 ? 'visible' : 'invisible'].join(' ').trim();
     const strengthClass = ['strength-meter mt-2','visible'].join(' ').trim();
     if(isValid && newPassword.length>0) {
       if(newPassword.match(/^[a-zA-Z0-9]+$/)){ //!@#\$%\^\&*\)\(+=._-
               pwdStrength="Medium";
               strength=1;
             }
             else{
               pwdStrength="Strong";
               strength=2;
             }
     }
     else {
       if(newPassword.length>0) 
       {
         pwdStrength="Not Valid";
         strength=0;
       }
     }
    /* if(pwdSaved) {
      if(pwdBlock && pwdBlock.status)
      {
       errorDisplay = "dontDisplay";
       errorMsg="";
         }
      else {
       errorDisplay = "errorDisplay";
       errorMsg = "should not match with your ssn";
         }
       }*/
    const editableClassName = passwordEditMode ? "description_box--edit-view" : "description_box_disabled";
    return (
        <div className={`row description_box ${editableClassName}`}>
	
	<div className="col-xs-12 col-sm-4 description_box__header">
		<h4 tabIndex="0">{passwordInfo.title}</h4>
		<p>{passwordInfo.desc}</p>
    </div>       
	<div className="col-xs-12 col-sm-8 description_box__large-container">
		<div className="row">
			<div className="col-xs-10 description_box__details">
				{
				 (showPasswordEdit || !passwordEditMode) && 
        	<div className="description_box__read">
						<p>{passwordInfo.read}</p>
					</div>
			    }
				{
					!showPasswordEdit && passwordEditMode  && passwordInfo.list && 
					<div className="description_box__form">
						<div className="row">
							<div className="col-xs-12 col-sm-5">
								<div className="form-group">
								  <label htmlFor="currentPassword" >Current Password</label>
								  <InputField
								  type="password"
								  handleOnChange={this.handleOnChangeCurrentPwd}
								  placeholder="Current Password"
								  name="currentPassword"
								  valid={isCPValid}
								  touched={istouched}
								  value={currentPassword} 
                  analyticstrack="pwdblock-curpwdtxt"/>
                  <p className={errorDisplay}>{errorMsg}</p>
								</div>
								<div className="form-group">
								  <label htmlFor="newPassword">New Password</label>
								  <InputField type="password"
								  handleOnChange={this.handleOnChange}
								  placeholder="New Password"
								  name="newPassword"
								  valid={isValid}
								  touched={istouched}
								  value={newPassword} 
                  analyticstrack="pwdblock-newpwdtxt"/>
                  { !isValid && 
                  <p className="errorDisplay">Please enter a valid password</p>
                  }
								</div>
								<div className="form-group">
								  <label htmlFor="confirmPassword">Re-enter New Password</label>
								  <InputField type="password"
								  handleOnChange={this.handleOnChange}
								  placeholder="Re-enter new Password"
								  name="confirmPassword"
								  valid={isMismatch}
								  touched={istouched}
								  value={confirmPassword} 
                  analyticstrack="pwdblock-confpwdtxt"/>
                 {  !isMismatch && confirmPassword.length>0 && 
                  <p className="errorDisplay">The passwords do not match</p>
                 }
								</div>
							</div>
							<div className="col-xs-12 col-sm-7">
								<h3>Password Requirements</h3>
								<ul className="fieldErrors">
									{
									errorMessages.map((message) => {
									return ( 
									  <li key={message.name}>
										{!requiredError &&
											( message.error ? <span className="text-warning"><i className="fa fa-times-circle"></i> </span> : 
										<span><i className="fa fa-check-circle"></i> </span> )  }
										{requiredError && <span><i className="fa fa-check-circle"></i> </span> }
										{message.name}
									  </li>
									)
									})
									}
								</ul>
							</div>	
              <div className="col-xs-12 col-sm-7">
               <h3>Password strength </h3>
               <span><b>{pwdStrength}</b></span>
               <div className={strengthClass}>
                            <div className="strength-meter-fill" data-strength={strength}></div>
                </div>
              </div>
						</div>
					</div>
				}
			</div>	
      
      {
			showPasswordEdit &&  
			<div className="col-sm-2 description_box__edit description_box__edit_section" analyticstrack="pwdblock-edit">
				<a className="btn btn-anchor"  onClick={() => this.props.handleEditCancel('passwordblock')} role="button">Edit</a>
			</div>
			}	
       {
			!showPasswordEdit && passwordEditMode &&   
			<div className="col-sm-2 description_box__edit description_box__edit_section cancel" analyticstrack="pwdblock-cancel">
				<a className="btn btn-anchor"  onClick={() => this.props.handleEditCancel('cancelblock')} role="button">Cancel</a>
			</div>
			}	
       {
              pwdSaved && <span className="text-success fa fa-check-circle col-xs-12 section-saved"> Saved </span>
            }
     
			{
               !showPasswordEdit && passwordEditMode && 
			   <div className="footer col-xs-12">
                  <a className="btn btn--round-invert" role="button"  onClick={() => this.props.handleEditCancel('cancelblock')} analyticstrack="pwdblock-cancel">Cancel</a>
                  <button className="btn btn--round"  disabled={!isValid || !isMismatch}  onClick={() => this.props.handleSave('pwdForm', {newVerifyPassword: confirmPassword, currentPassword: currentPassword, newPassword: newPassword}, event)}
                  analyticstrack="pwdblock-save">Save Changes</button> 
                </div>
             }
		</div>
	</div>
</div>
    )
  }
}

export default PasswordBlock;