import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from './actions'
import InputField from '../FormElements/InputComponent'
import './style.css'

class PasswordBlock extends Component {
  constructor(props) {
    super(props)
    this.state= {
      requiredError: true,
      userId : "test12345", /*props.userId,*/
       isValid: '',
       isCurrentPwdValid: '',
      istouched: false,
      currentPassword: "", newPassword: "", confirmPassword: "",
      errorMessages: [
        { name: '6-20 characters', error: false, type: 'minmax'},
        { name: 'Contains at least one letter', error: false, type: 'onChar' },
        { name: 'Contains at least one number', error: false, type: 'oneNum' },
        { name: 'Contains no spaces', error: false, type: 'space'},
        { name: 'Does not contain your user ID', error: false, type: 'sameId'},
        { name: 'new password should match', error: false, type: 'mismatch'},
      ],
    }
  }

  handleOnChange= (e) => {
    var typeOfpwd = e.target.name;
    var value = e.target.value ;
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
    const newPwd = this.state.newPassword;
    const confirmPwd = this.state.confirmPassword;
    this.setState({istouched: true});
    const errorMessages = JSON.parse(JSON.stringify(this.state.errorMessages));
    if(newPwd.length === 0) {
      this.setState( { requiredError : true,istouched: false, isValid: false,  errorMessages: [
        { name: '8-20 characters', error: false, type: 'minmax'},
        { name: 'Contains at least one letter', error: false, type: 'onChar' },
        { name: 'Contains at least one number', error: false, type: 'oneNum' },
        { name: 'Contains no spaces', error: false, type: 'space'},
        { name: 'Does not contain your user ID', error: false, type: 'sameId'},
        { name: 'new password should match', error: false, type: 'mismatch'},
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
        if (newPwd.indexOf(" ") !== -1) {
          let invalidMessage =  errorMessages.find(message => message.type === 'space');
            invalidMessage.error = true;
            this.setState({ errorMessages });
        } else {
            let invalidMessage =  errorMessages.find(message => message.type === 'space');
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
        
        if (newPwd != this.state.userId){
            let invalidMessage =  errorMessages.find(message => message.type === 'sameId');
            invalidMessage.error = false;
            this.setState({ errorMessages });
        } else {
          let invalidMessage =  errorMessages.find(message => message.type === 'sameId');
            invalidMessage.error = true;
            this.setState({ errorMessages });
        }
        if (newPwd === confirmPwd){
            let invalidMessage =  errorMessages.find(message => message.type === 'mismatch');
            invalidMessage.error = false;
            this.setState({ errorMessages });
        } else {
          let invalidMessage =  errorMessages.find(message => message.type === 'mismatch');
            invalidMessage.error = true;
            this.setState({ errorMessages });
        }
    }
  }

  render() {
    const { controlButtons, errorMessages, userId, requiredError, istouched, currentPassword, newPassword, confirmPassword,isCurrentPwdValid } = this.state;
    const { passwordInfo, showPasswordEdit, passwordEditMode ,pwdSaved } = this.props;
     const isValid = !errorMessages.find(user => user.error)
     const isCPValid= isCurrentPwdValid;
    const editableClassName = passwordEditMode ? "description_box--edit-view" : "description_box_disabled";
    return (
        <div className={`row description_box ${editableClassName}`}>
	
	<div className="col-xs-12 col-sm-4 description_box__header">
		<h4 tabIndex="0">{passwordInfo.title}</h4>
		<p>{passwordInfo.desc}</p>
    </div>       
	<div className="col-xs-12 col-sm-8 description_box__large-container">
		<div className="row">
			<div className="col-xs-12 description_box__details">
				{
					showPasswordEdit &&  
					<div className="description_box__read">
						<p>{passwordInfo.read}</p>
					</div>
			    }
				{
					!showPasswordEdit && passwordEditMode  && 
					<div className="description_box__form">
						<div className="row">
							<div className="col-xs-12 col-sm-5">
								<div className="form-group">
								  <label htmlFor="currentPassword">Current Password</label>
								  <InputField
								  type="password"
								  handleOnChange={this.handleOnChangeCurrentPwd}
								  placeholder="Current Password"
								  name="currentPassword"
								  valid={isCPValid}
								  touched={istouched}
								  value={currentPassword} />
								</div>
								<div className="form-group">
								  <label htmlFor="newPassword">New Password</label>
								  <InputField type="password"
								  handleOnChange={this.handleOnChange}
								  placeholder="New Password"
								  name="newPassword"
								  valid={isValid}
								  touched={istouched}
								  value={newPassword} />
								</div>
								<div className="form-group">
								  <label htmlFor="confirmPassword">Re-enter New Password</label>
								  <InputField type="password"
								  handleOnChange={this.handleOnChange}
								  placeholder="re-enter new Password"
								  name="confirmPassword"
								  valid={isValid}
								  touched={istouched}
								  value={confirmPassword} />
								</div>
							</div>
							<div className="col-xs-12 col-sm-6">
								<h3>Password Requirements</h3>
								<ul className="fieldErrors">
									{
									errorMessages.map((message) => {
									return ( 
									  <li key={message.name}>
										{!requiredError &&
											( message.error ? <span className="text-danger"><i className="fa fa-times-circle"></i> </span> : 
										<span className="text-success"><i className="fa fa-check-circle"></i> </span> )  }
										{requiredError && <span><i className="fa fa-check-circle"></i> </span> }
										{message.name}
									  </li>
									)
									})
									}
								</ul>
							</div>	
						</div>
					</div>
				}
			</div>	
      {
              showPasswordEdit && passwordEditMode && pwdSaved && <span className="section_saved text-success fa fa-check-circle"> Saved </span>
            }
      {
			showPasswordEdit &&  
			<div className="description_box__edit description_box__edit_section">
				<a className="btn btn-anchor"  onClick={() => this.props.handleEditCancel('passwordblock')} role="button">Edit</a>
			</div>
			}	
       {
			!showPasswordEdit && passwordEditMode &&   
			<div className="description_box__edit description_box__edit_section">
				<a className="btn btn-anchor"  onClick={() => this.props.handleEditCancel('cancelblock')} role="button">Cancel</a>
			</div>
			}	
			{
               !showPasswordEdit && passwordEditMode && 
			   <div className="footer col-xs-12">
                  <a className="btn btn--round-invert" role="button"  onClick={() => this.props.handleEditCancel('cancelblock')}>Cancel</a>
                  <button className="btn btn--round"  disabled={!isValid} onClick={this.handleOnSave}>Save Changes</button>
                </div>
             }
		</div>
	</div>
</div>
    )
  }
}

export default PasswordBlock;
