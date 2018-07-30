import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from './actions'
import UserBlock from './UserBlock'
import PasswordBlock from './PasswordBlock'
import AccountBlock from './AccountBlock'
import SecurityQuestionBlock from './SecurityQuestionBlock'
import './style.css'
import EnhancedAuth from '../EnhancedAuth';
import Spinner from '../Spinner/Spinner.js';

import * as enhancedActions from '../EnhancedAuth/actions'

require('../../../assets/css/main.css');
require('../../../assets/css/my-profile.css');
require('../../../assets/css/oneD-Global.css');
require('../../../assets/css/phoenixGlobal.css');



class Security extends Component {
  constructor(props) {
    super(props)
    this.state= {
      showUserEdit: true,
      showPasswordEdit: true,
      userEditMode: true,
      passwordEditMode: true,
      showAccountPinEdit: true,
      accountPinEditMode:true,
      showQuestionEdit:true , 
      questionEditMode:true , 
      currentUser:"",
      userSaved:false,
      pwdSaved:false,
      pinSaved:false,
      questionSaved:false,
      enAuthEditMode:false,
      showEnhancedAuthEdit:true,
    }
  }

  componentDidMount() {
    this.props.enhancedactions.fetchEnhancedAuth();
    this.props.actions.fetchSecurity();
   this.props.actions.getMetaData();
    this.props.actions.getQuestionInfo();    
    const URL_MAP = this.props.match.url.split("/");
    const type = URL_MAP[URL_MAP.length-1];
    type?this.handleEditCancel(type+"block"):"";
  }

  handleEditCancel = (type) =>  {
    switch(type) {
      case 'useridblock':
      this.setState({ showUserEdit: false, showPasswordEdit : false,userSaved:false, 
                       userEditMode: true, passwordEditMode: false ,pwdSaved:false,
                       showAccountPinEdit:false, accountPinEditMode: false,pinSaved:false,
                       showQuestionEdit:false , questionEditMode:false , questionSaved:false,
                       enAuthEditMode: false, showEnhancedAuthEdit: false
                       });
                       this.props.history.push('/security/userid');
      break;
      case 'passwordblock':
      this.setState({ showUserEdit: false, showPasswordEdit : false, userSaved:false,
                      userEditMode: false, passwordEditMode: true ,pwdSaved:false,
                      showAccountPinEdit:false, accountPinEditMode: false,pinSaved:false,
                      showQuestionEdit:false , questionEditMode:false , questionSaved:false,
                      enAuthEditMode: false, showEnhancedAuthEdit: false 
                      });
                      this.props.history.push('/security/password');
      break;
      case 'accountPinblock':
      this.setState({ showUserEdit: false, showPasswordEdit : false, userSaved:false,
                      userEditMode: false, passwordEditMode: false ,pwdSaved:false,
                      showAccountPinEdit:false, accountPinEditMode: true,pinSaved:false,
                      showQuestionEdit:false , questionEditMode:false , questionSaved:false,
                      enAuthEditMode: false, showEnhancedAuthEdit: false
                      });
                      this.props.history.push('/security/accountPin');
      break;
      case 'questionblock':
      this.setState({ showUserEdit: false, showPasswordEdit : false, userSaved:false,
                      userEditMode: false, passwordEditMode: false ,pwdSaved:false,
                      showAccountPinEdit:false, accountPinEditMode: false,pinSaved:false,
                      showQuestionEdit:false , questionEditMode:true , questionSaved:false,
                      enAuthEditMode: false, showEnhancedAuthEdit:false  
                      });
                      this.props.history.push('/security/question');
      break;
      case 'enhancedauthblock':
      this.setState({ showUserEdit: false, showPasswordEdit : false, userSaved:false,
        userEditMode: false, passwordEditMode: false ,pwdSaved:false,
        showAccountPinEdit:false, accountPinEditMode: false,pinSaved:false,
        showQuestionEdit:false , questionEditMode:false , questionSaved:false,
        enAuthEditMode: true, showEnhancedAuthEdit:false
        });
        this.props.history.push('/security/enhancedauth');
           break;
      default:
      this.props.history.push('/security');
      this.setState({ showUserEdit: true, showPasswordEdit : true, userSaved:false,
                      userEditMode: true, passwordEditMode: true ,pwdSaved:false,
                      showAccountPinEdit:true, accountPinEditMode: true,pinSaved:false,
                      showQuestionEdit:true , questionEditMode:true , questionSaved:false,
                      enAuthEditMode: true, showEnhancedAuthEdit:true 
                      });
                      
    }
  }
    
   handleSave = (formId, formData, event) => {
    
    // Action Dispatch will take place here to save the new userid to database
    // through an API call.
    event.preventDefault();
     switch(formId) {
      case 'userForm':
      this.props.actions.setUserId(formData)
      this.setState({userSaved:true});
      break;
      case 'pwdForm':
      this.props.actions.setPassword(formData)
                       this.setState({pwdSaved:true});
      break;
      case 'pinForm':
     this.props.actions.setPin(formData)
     this.setState({pinSaved:true});
      break;
      case 'questionForm':
     this.props.actions.setQuestionInfo(formData)
     this.setState({questionSaved:true});
      break;
    }
     this.setState({ showUserEdit: true, showPasswordEdit : true, 
                      userEditMode: true, passwordEditMode: true ,
                      showAccountPinEdit:true, accountPinEditMode: true,
                      showQuestionEdit:true , questionEditMode:true, 
                      enAuthEditMode:true, showEnhancedAuthEdit:true
                      });
  }


  render() {
    
    const {  securities,userState, pinState, passwordState,match, questionState,metaData, showSpinner } = this.props;
    return (
  <div>
   {showSpinner? <Spinner/>:
          (<div><h1 className="title title--lg">Security</h1>
            {
              securities && metaData &&<div className="col-xs-12">
                <UserBlock id= "userId" userInfo={securities.userIdInfo} metaBlock={metaData} userBlock={userState} handleEditCancel={(type) => this.handleEditCancel(type)} 
                            handleSave={(type, data, e) => this.handleSave(type, data, e)} {...this.state}/>

                <PasswordBlock ref="pwdBlock" passwordInfo={securities.passwordInfo} pwdBlock={passwordState} handleEditCancel={(type) => this.handleEditCancel(type)} {...this.state} 
                            handleSave={(type, data, e) => this.handleSave(type, data, e)} {...this.state}/>
                
                <AccountBlock  accountPinInfo={securities.accountPinInfo} pinBlock={pinState} handleEditCancel={(type) => this.handleEditCancel(type)} {...this.state} 
                            handleSave={(type, data, e) => this.handleSave(type, data, e)} {...this.state}/>
                
                <SecurityQuestionBlock questionInfo={securities.questionInfo} metaBlock={metaData} questionBlock={questionState} handleEditCancel={(type) => this.handleEditCancel(type)} 
                            handleSave={(type, data, e) => this.handleSave(type, data, e)} {...this.state}/>

                            <EnhancedAuth handleEditCancel={(type) => this.handleEditCancel(type)} {...this.state}/>
              </div>
            }
          </div>)}
       </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    securities: state.security.list,
    metaData: state.security.metaData,
    userState:state.security.userstatus,
    pinState: state.security.pinstatus,
    passwordState: state.security.passwordStatus,
    questionState: state.security.question,
    showSpinner: state.security.isFetching,
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch),
  enhancedactions: bindActionCreators(enhancedActions, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(Security);