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
import { getErrorMsgByCode } from "../../../utils/config"
import * as enhancedActions from '../EnhancedAuth/actions'

require('../../../assets/css/main.css');
require('../../../assets/css/my-profile.css');
require('../../../assets/css/oneD-Global.css');
require('../../../assets/css/phoenixGlobal.css');



class Security extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showUserEdit: true,
      showPasswordEdit: true,
      userEditMode: true,
      passwordEditMode: true,
      showAccountPinEdit: true,
      accountPinEditMode: true,
      showQuestionEdit: true,
      questionEditMode: true,
      currentUser: "",
      userSaved: false,
      pwdSaved: false,
      pinSaved: false,
      questionSaved: false,
      enAuthEditMode: false,
      showEnhancedAuthEdit: true,
      enhancedSaved: false
    }
  }

  componentDidMount() {
    //this.props.enhancedactions.fetchEnhancedAuth();
    if (!this.props.securities)
      this.props.actions.fetchSecurity();
    //if(!this.props.metaData)  
    this.props.actions.getMetaData();

    //this.props.actions.getCqData();

    const URL_MAP = this.props.match.url.split("/");
    const type = URL_MAP[URL_MAP.length - 1];
    type ? this.handleEditCancel(type + "block") : "";
  }
  setFlags(flagList) {
    const defaultList = ['showUserEdit', 'userEditMode', 'userSaved',
      'showPasswordEdit', 'passwordEditMode', 'pwdSaved',
      'showAccountPinEdit', 'accountPinEditMode', 'pinSaved',
      'showQuestionEdit', 'questionEditMode', 'questionSaved',
      'enAuthEditMode', 'showEnhancedAuthEdit'];
    defaultList.forEach((state) => {
      this.state[defaultList[state]] = false;
    });
    flagList.forEach((state) => {
      this.state[defaultList[state]] = true;
    });

  }
  handleEditCancel = (type) => {
    switch (type) {
      case 'useridblock':
        this.setState({
          showUserEdit: false, showPasswordEdit: false, userSaved: false,
          userEditMode: true, passwordEditMode: false, pwdSaved: false,
          showAccountPinEdit: false, accountPinEditMode: false, pinSaved: false,
          showQuestionEdit: false, questionEditMode: false, questionSaved: false,
          enAuthEditMode: false, showEnhancedAuthEdit: false, enhancedSaved: false
        });
        this.props.history.push('/security/userid');
        break;
      case 'passwordblock':
        if (!this.props.passwordList)
          this.props.actions.getBannedPwdList();
        this.setState({
          showUserEdit: false, showPasswordEdit: false, userSaved: false,
          userEditMode: false, passwordEditMode: true, pwdSaved: false,
          showAccountPinEdit: false, accountPinEditMode: false, pinSaved: false,
          showQuestionEdit: false, questionEditMode: false, questionSaved: false,
          enAuthEditMode: false, showEnhancedAuthEdit: false, enhancedSaved: false
        });
        this.props.history.push('/security/password');
        break;
      case 'accountPinblock':
        this.setState({
          showUserEdit: false, showPasswordEdit: false, userSaved: false,
          userEditMode: false, passwordEditMode: false, pwdSaved: false,
          showAccountPinEdit: false, accountPinEditMode: true, pinSaved: false,
          showQuestionEdit: false, questionEditMode: false, questionSaved: false,
          enAuthEditMode: false, showEnhancedAuthEdit: false, enhancedSaved: false
        });
        this.props.history.push('/security/accountPin');
        break;
      case 'questionblock':
        if (!this.props.questionState)
          this.props.actions.getQuestionInfo();
        this.setState({
          showUserEdit: false, showPasswordEdit: false, userSaved: false,
          userEditMode: false, passwordEditMode: false, pwdSaved: false,
          showAccountPinEdit: false, accountPinEditMode: false, pinSaved: false,
          showQuestionEdit: false, questionEditMode: true, questionSaved: false,
          enAuthEditMode: false, showEnhancedAuthEdit: false, enhancedSaved: false
        });
        this.props.history.push('/security/question');
        break;
      case 'enhancedauthblock':
        this.props.enhancedactions.fetchEnhAuthEdit();
        this.setState({
          showUserEdit: false, showPasswordEdit: false, userSaved: false,
          userEditMode: false, passwordEditMode: false, pwdSaved: false,
          showAccountPinEdit: false, accountPinEditMode: false, pinSaved: false,
          showQuestionEdit: false, questionEditMode: false, questionSaved: false,
          enAuthEditMode: true, showEnhancedAuthEdit: false, enhancedSaved: false
        }); this.props.history.push('/security/enhancedauth');

        break;
      default:
        this.props.history.push('/security');
        this.setState({
          showUserEdit: true, showPasswordEdit: true, userSaved: false,
          userEditMode: true, passwordEditMode: true, pwdSaved: false,
          showAccountPinEdit: true, accountPinEditMode: true, pinSaved: false,
          showQuestionEdit: true, questionEditMode: true, questionSaved: false,
          enAuthEditMode: true, showEnhancedAuthEdit: true, enhancedSaved: false
        });

    }
  }

  handleSave = (formId, formData, event) => {

    // Action Dispatch will take place here to save the new userid to database
    // through an API call.
    event.preventDefault();
    switch (formId) {
      case 'userForm':
        this.props.actions.setUserId(formData)
        this.setState({ userSaved: false, showUserEdit: false, userEditMode: true });
        break;
      case 'pwdForm':
        this.props.actions.setPassword(formData)
        this.setState({ pwdSaved: true });
        break;
      case 'pinForm':
        this.props.actions.setPin(formData)
        this.setState({ pinSaved: true });
        break;
      case 'questionForm':
        this.props.actions.setQuestionInfo(formData)
        this.setState({ questionSaved: true });
        break;
      case 'enhancedForm':
        this.setState({ enhancedSaved: true });
        break;
    }
    this.setState({
      showUserEdit: true, showPasswordEdit: true,
      userEditMode: true, passwordEditMode: true,
      showAccountPinEdit: true, accountPinEditMode: true,
      showQuestionEdit: true, questionEditMode: true,
      enAuthEditMode: true, showEnhancedAuthEdit: true
    });
  }



  render() {
    // console.log(this.props)
    let acctHolder = reactGlobals.mdnRole.toLocaleLowerCase() == "accountholder";
    let acctManger = reactGlobals.mdnRole.toLocaleLowerCase() == "accountmanager";
    const { securities, userState, pinState, passwordState, match, questionState, metaData, showSpinner, cqData, passwordList, questionList } = this.props;
         console.log("user",userState);
    if (passwordList && securities.passwordInfo) {
      securities.passwordInfo.list = passwordList;
    }
    if(userState && userState.status){

      this.state.userSaved = true;
     
    }
  /* if(!userState || !userState.status){
       this.state.userEditMode = true;
        
       this.state.showUserEdit= false;
      this.state.userSaved = false;
    }*/
    if(passwordState && passwordState.status){
      this.state.pwdSaved = true;
    }
    if(pinState && pinState.status){
      this.state.pinSaved = true;
    }
    if(questionState && questionState.status){
      this.state.questionSaved = true;
    }
    return (
      <div>
        {!securities && !metaData ? <Spinner /> :
          <div><h1 className="title title--lg">Security</h1>
            {
              securities && metaData && <div className="col-xs-12">
                <UserBlock userInfo={securities.userIdInfo} metaBlock={metaData} userBlock={userState} handleEditCancel={(type) => this.handleEditCancel(type)}
                  handleSave={(type, data, e) => this.handleSave(type, data, e)} {...this.state} />

                <PasswordBlock passwordInfo={securities.passwordInfo} pwdBlock={passwordState} handleEditCancel={(type) => this.handleEditCancel(type)} {...this.state}
                  handleSave={(type, data, e) => this.handleSave(type, data, e)} {...this.state} />

                {(acctHolder || acctManger) && <AccountBlock accountPinInfo={securities.accountPinInfo} pinBlock={pinState} handleEditCancel={(type) => this.handleEditCancel(type)} {...this.state}
                  handleSave={(type, data, e) => this.handleSave(type, data, e)} {...this.state} />}

                <SecurityQuestionBlock questionInfo={securities.questionInfo} metaBlock={metaData} questionBlock={questionList} handleEditCancel={(type) => this.handleEditCancel(type)}
                  handleSave={(type, data, e) => this.handleSave(type, data, e)} {...this.state} />

                {acctHolder && <EnhancedAuth handleEditCancel={(type) => this.handleEditCancel(type)} handleSave={(type, data, e) => this.handleSave(type, data, e)} {...this.state} />}
              </div>
            }
          </div>}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    securities: state.security.list,
    metaData: state.security.metaData,
    cqData: state.security.cqData,
    userState: state.security.userstatus,
    pinState: state.security.pinstatus,
    passwordState: state.security.passwordStatus,
    questionState: state.security.questionStatus,
    showSpinner: state.security.isFetching,
    passwordList: state.security.passwordList,
    questionList: state.security.questionList
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch),
  enhancedactions: bindActionCreators(enhancedActions, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(Security);