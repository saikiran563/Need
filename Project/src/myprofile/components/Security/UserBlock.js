import React, { Component } from 'react'
import InputField from '../FormElements/InputComponent'
import './style.css'
import { connect } from "react-redux";

import {Link,NavLink} from 'react-router-dom';

import { getErrorMsgByCode } from "../../../utils/config"
import { clearErrorCodes } from "./actions/fetchSecurities"


class UserBlock extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userId: props.metaBlock ? props.metaBlock.userId:"",
      requiredError: true,
      showSaved: false,
      isValid: '',
      istouched: false,
      hasError:false,
      userSaved: false,
      useridInvalidMessages: [
        { name: '6-60 characters, all letters or a combination of letters and numbers', error: false, type: 'character' },
        { name: 'Not all numbers', error: false, type: 'number' },
        { name: 'Contains no spaces', error: false, type: 'space' }
      ],
    }
  }
   componentDidMount(){
     this.onChangeInput();
   }
  handleOnChange = (e) => {
    if( e.target.value.length > 60) return;
    this.setState({ userId: e.target.value }, () => this.onChangeInput());
  }

  componentDidUpdate(prevProps){
    if(prevProps.userSaved !== this.props.userSaved){
      this.setState({
        userSaved: true
      })
    }
    if(this.state.userSaved){
      if(prevProps.event != this.props.event){
        this.setState({
          userSaved: false
        })
      }
    }
    if(this.props.error){
      if(prevProps.event != this.props.event){
        this.props.clearErrorCodes()
      }
    }
  }

  onChangeInput = () => {
    this.setState({istouched: true});
    const val = this.state.userId;
    const useridInvalidMessages = JSON.parse(JSON.stringify(this.state.useridInvalidMessages));
    if (val.length === 0) {
      this.setState({
        requiredError: true, istouched: false, isValid: false, useridInvalidMessages: [
          { name: '6-60 characters', error: false, type: 'character' },
          { name: 'Not all numbers', error: false, type: 'number' },
          { name: 'Contains no spaces', error: false, type: 'space' }
          
        ]
      });
         this.setState({ useridInvalidMessages });
        
    } else {
      this.setState({ requiredError: false });
      if(val.length < 6 || val.length > 60) {
         let inavlidMessage = useridInvalidMessages.find(message => message.type === 'character');
        inavlidMessage.error = true;
        this.setState({ useridInvalidMessages });
      } else {
        let inavlidMessage = useridInvalidMessages.find(message => message.type === 'character');
        inavlidMessage.error = false;
        this.setState({ useridInvalidMessages });
      }
      if (val.indexOf(" ") !== -1) {
        let inavlidMessage = useridInvalidMessages.find(message => message.type === 'space');
        inavlidMessage.error = true;
        this.setState({ useridInvalidMessages });
      } else {
        let inavlidMessage = useridInvalidMessages.find(message => message.type === 'space');
        inavlidMessage.error = false;
        this.setState({ useridInvalidMessages });
      }
      if (val.match(/^\d+$/)) {
        let inavlidMessage = useridInvalidMessages.find(message => message.type === 'number');
        inavlidMessage.error = true;
        this.setState({ useridInvalidMessages });
      } else {
        let inavlidMessage = useridInvalidMessages.find(message => message.type === 'number');
        inavlidMessage.error = false;
        this.setState({ useridInvalidMessages });
      }
    }
  }



componentDidCatch(error,info) {
   console.log("CDC-UB",error,"-",info)
   this.setState({hasError:true});
}
render() {
  // console.log("user block", this.props)
   const {  useridInvalidMessages, requiredError, userId ,showSaved,hasError } = this.state;
   const { userInfo, showUserEdit, userEditMode ,userSaved, userBlock, metaBlock} = this.props;
   const isValid = !useridInvalidMessages.find(user => user.error)
   const editableClassName = userEditMode ? "description_box--edit-view" : "description_box_disabled";
   const hasServerError = userBlock ? (!userBlock.status ? true: false) : false;
    return (
  
  <div className={`row description_box ${editableClassName}`}>
	
	<div className="col-xs-12 col-sm-4 description_box__header">
		<h4>{userInfo.title}</h4>
		<p>{userInfo.desc}</p>
     </div>
      
          
	<div className="col-xs-12 col-sm-8 description_box__large-container">
		<div className="row">
			<div className="col-xs-10 description_box__details">
				{
				( showUserEdit || !userEditMode ) && 
          <div className="description_box__read">
                    <p>{userBlock? userBlock.userId:metaBlock.userId }</p>
                  </div>
                }
				{
					!showUserEdit && userEditMode && 
					<div className="description_box__form">
						<div className="row">
							<div className="col-xs-12 col-sm-5">
								<div className="form-group">
									<label htmlFor="userId">User ID</label>
									<InputField type="text" handleOnChange={this.handleOnChange} placeholder="User ID" name="userId" valid={isValid} touched={this.state.istouched} 
											value={userId} analyticstrack="userblock-usertxt"/>
                      {this.props.error ? <p className="errorDisplay"><span className="fa fa-exclamation-circle"></span> {getErrorMsgByCode(this.props.error)}</p> : ""}
									<p className="help-block">If available, you may use Email Address as your User ID.</p>

								</div>
							</div>
							 
							<div className="col-xs-12 col-sm-6">
								<h3>User ID Requirements</h3>
								<ul className="fieldErrors">
									{
									useridInvalidMessages.map((message) => {
										return (
										<li key={message.name}>
										{!requiredError &&
											(message.error ? <span className="text-warning"><i className="fa fa-times-circle"></i> </span> :
										<span><i className="fa fa-check-circle"></i> </span>)}
										{requiredError && <span><i className="fa fa-check-circle"></i> </span>}
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
            showUserEdit && 
				<div className="description_box__edit description_box__edit_section" analyticstrack="userblock-edit">
					<a className="btn btn-anchor" onClick={() => this.props.handleEditCancel('useridblock')} role="button" tabIndex="0" href="#/security/userid">Edit</a>
				</div>   
            }
            {
            !showUserEdit && userEditMode &&
          <div className="col-sm-2 description_box__edit description_box__edit_section cancel" analyticstrack="userblock-cancel">
					<a className="btn btn-anchor" onClick={() => this.props.handleEditCancel('cancelblock')} role="button" href="#/security">Cancel</a>
				</div>
        }
          {
               this.state.userSaved && <span className="text-success fa fa-check-circle col-xs-12 section-saved"> Saved </span>
            }
			{/* {this.props.error ? <span style={{color: "red"}} className="text-success fa fa-exclamation-circle col-xs-12 section-saved"> Error </span> : ""} */}
			{
			!showUserEdit && userEditMode && 
				<div className="footer col-xs-12">
					<a className="btn btn--round-invert" role="button" onClick={() => this.props.handleEditCancel('cancelblock')} analyticstrack="userblock-cancel" href="#/security">Cancel</a>
					<button className="btn btn--round"  disabled={!isValid || reactGlobals.isCsr} onClick={() => this.props.handleSave('userForm', userId, event)} analyticstrack="userblock-save">Save Changes</button>
				</div>
			}
		</div>
	</div>  
</div>
    )
  }
}

const mapStateToProps = state => {
  return {
    error: state.security.userIdError
  }
}
export default connect(mapStateToProps, { clearErrorCodes })(UserBlock);
