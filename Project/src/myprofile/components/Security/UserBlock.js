import React, { Component } from 'react'
import InputField from '../FormElements/InputComponent'
import './style.css'

import {Link,NavLink} from 'react-router-dom';

class UserBlock extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userId: props.metaBlock ? props.metaBlock.userId:"",
      requiredError: true,
      showSaved: false,
      isValid: '',
      istouched: false,
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
      if (val.match(/^\d*[a-zA-Z]{1,}\d*/)) {
        let inavlidMessage = useridInvalidMessages.find(message => message.type === 'number');
        inavlidMessage.error = false;
        this.setState({ useridInvalidMessages });
      } else {
        let inavlidMessage = useridInvalidMessages.find(message => message.type === 'number');
        inavlidMessage.error = true;
        this.setState({ useridInvalidMessages });
      }
    }
  }

 /*shouldComponentUpdate(nextProps, nextState) {
  console.log(nextProps,"-",nextState);
  return (nextProps.userSaved != this.state.showSaved)
  
}*/
componentWillReceiveProps(nextProps) {
   if(nextProps.userSaved != this.state.showSaved )
      this.setState({showSaved: nextProps.userSaved})
}
  render() {
    const {  useridInvalidMessages, requiredError, userId ,showSaved } = this.state;
    const { userInfo, showUserEdit, userEditMode ,userSaved, userBlock, metaBlock} = this.props;
   const isValid = !useridInvalidMessages.find(user => user.error)
   const editableClassName = userEditMode ? "description_box--edit-view" : "description_box_disabled";
    return (
      <div className={`row description_box ${editableClassName}`}>
	
	<div className="col-xs-12 col-sm-4 description_box__header">
		<h4 tabIndex="0">{userInfo.title}</h4>
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
									<InputField type="text" handleOnChange={this.handleOnChange} placeholder="User ID" name="userid" valid={isValid} touched={this.state.istouched} 
											value={userId} analyticstrack="userblock-usertxt"/>
									<p className="help-block">If available, you may use Email Address as your User ID.</p>
                   { /*!isValid && 
                  <p className="errorDisplay">InValid Entry</p>*/
                  }
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
					<a className="btn btn-anchor" onClick={() => this.props.handleEditCancel('useridblock')} role="button" >Edit</a>
				</div>   
            }
            {
            !showUserEdit && userEditMode &&
          <div className="col-sm-2 description_box__edit description_box__edit_section cancel" analyticstrack="userblock-cancel">
					<a className="btn btn-anchor" onClick={() => this.props.handleEditCancel('cancelblock')} role="button">Cancel</a>
				</div>
        }
          {
               showSaved && <span className="text-success fa fa-check-circle col-xs-12 section-saved"> Saved </span>
            }
			
			{
			!showUserEdit && userEditMode && 
				<div className="footer col-xs-12">
					<a className="btn btn--round-invert" role="button" onClick={() => this.props.handleEditCancel('cancelblock')} analyticstrack="userblock-cancel">Cancel</a>
					<button className="btn btn--round"  disabled={!isValid} onClick={() => this.props.handleSave('userForm', userId, event)} analyticstrack="userblock-save">Save Changes</button>
				</div>
			}
		</div>
	</div>
</div>
    )
  }
}

export default UserBlock;
