import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "./actions";
import UserBlock from "./UserBlock";
import PasswordBlock from "./PasswordBlock";
import AccountBlock from "./AccountBlock";
import SecurityQuestionBlock from "./SecurityQuestionBlock";
import "./style.css";
import EnhancedAuth from "../EnhancedAuth";
import Spinner from "../Spinner/Spinner.js";
import { getErrorMsgByCode } from "../../../utils/config";
import * as enhancedActions from "../EnhancedAuth/actions";

require("../../../assets/css/main.css");
require("../../../assets/css/my-profile.css");
require("../../../assets/css/oneD-Global.css");
require("../../../assets/css/phoenixGlobal.css");

class Security extends Component {
  constructor(props) {
    super(props);
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
      enhancedSaved: false,
      error: false,
      event: ""
    };
  }

  componentDidMount() {
    //this.props.enhancedactions.fetchEnhancedAuth();
    document.addEventListener("click", event => {
      this.setState({
        event: event.timeStamp
      })
      // console.log(event);
    });
    if (!this.props.securities) this.props.actions.fetchSecurity();
    if (!this.props.metaData) this.props.actions.getMetaData();

    //this.props.actions.getCqData();

    const URL_MAP = this.props.match.url.split("/");
    const type = URL_MAP[URL_MAP.length - 1];
    type ? this.handleEditCancel(type + "block") : "";
  }
  showAllsecurityBlocks = itemSaved => {
    this.setState({
      showUserEdit: true,
      showPasswordEdit: true,
      userEditMode: true,
      passwordEditMode: true,
      showAccountPinEdit: true,
      accountPinEditMode: true,
      showQuestionEdit: true,
      questionEditMode: true,
      enAuthEditMode: true,
      showEnhancedAuthEdit: true,
      [itemSaved]: true
    });
  };
  // handleClick = event => {
  //   console.log(event)
  // }
  componentWillReceiveProps(nextProps) {
    // console.log(nextProps)
    // if(nextProps.userIdError ||
    //   nextProps.passwordError){
    //   this.setState({
    //     error: true
    //   })
    // }
    if (nextProps.questionState) {
      if (nextProps.questionState == this.props.questionState) {
        this.setState({ questionSaved: false });
      } else {
        if (nextProps.questionState.payload) {
          this.showAllsecurityBlocks("questionSaved");
          // this.setState({questionSaved:true});
        } else {
          this.setState({ questionSaved: false });
        }
      }
    }
    if (nextProps.userState) {
      // this.setState({
      //   showUserEdit: true, showPasswordEdit: true,
      //   userEditMode: true, passwordEditMode: true,
      //   showAccountPinEdit: true, accountPinEditMode: true,
      //   showQuestionEdit: true, questionEditMode: true,
      //   enAuthEditMode: true, showEnhancedAuthEdit: true
      // });
      if (nextProps.userState == this.props.userState) {
        this.setState({ userSaved: false });
      } else {
        if (nextProps.userState.status) {
          this.showAllsecurityBlocks("userSaved");
          // this.setState({userSaved:true});
        } else {
          this.setState({ userSaved: false });
        }
      }
    }

    if (nextProps.pinState) {
      if (nextProps.pinState == this.props.pinState) {
        this.setState({ pinSaved: false });
      } else {
        if (nextProps.pinState.status) {
          // this.setState({pinSaved:true, showAccountPinEdit: true});
          this.showAllsecurityBlocks("pinSaved");
        } else {
          this.setState({ pinSaved: false });
        }
      }
    }
    if (nextProps.passwordState) {
      // console.log(nextProps.passwordState)
      this.setState({ pwdSaved: false });
      if (nextProps.passwordState == this.props.passwordState) {
        this.setState({ pwdSaved: false });
      } else {
        if (nextProps.passwordState.status) {
          // this.setState({pwdSaved:true, showPasswordEdit: true});
          this.showAllsecurityBlocks("pwdSaved");
        } else {
          this.setState({ pwdSaved: false });
        }
      }
    }
  }
  handleEditCancel = type => {
    switch (type) {
      case "useridblock":
        this.setState({
          showUserEdit: false,
          showPasswordEdit: false,
          userSaved: false,
          userEditMode: true,
          passwordEditMode: false,
          pwdSaved: false,
          showAccountPinEdit: false,
          accountPinEditMode: false,
          pinSaved: false,
          showQuestionEdit: false,
          questionEditMode: false,
          questionSaved: false,
          enAuthEditMode: false,
          showEnhancedAuthEdit: false,
          enhancedSaved: false
        });
        //  this.props.history.push('/security/userid');
        break;
      case "passwordblock":
        if (!this.props.passwordList) this.props.actions.getBannedPwdList();
        this.setState({
          showUserEdit: false,
          showPasswordEdit: false,
          userSaved: false,
          userEditMode: false,
          passwordEditMode: true,
          pwdSaved: false,
          showAccountPinEdit: false,
          accountPinEditMode: false,
          pinSaved: false,
          showQuestionEdit: false,
          questionEditMode: false,
          questionSaved: false,
          enAuthEditMode: false,
          showEnhancedAuthEdit: false,
          enhancedSaved: false
        });
        //  this.props.history.push('/security/password');
        break;
      case "accountPinblock":
        this.setState({
          showUserEdit: false,
          showPasswordEdit: false,
          userSaved: false,
          userEditMode: false,
          passwordEditMode: false,
          pwdSaved: false,
          showAccountPinEdit: false,
          accountPinEditMode: true,
          pinSaved: false,
          showQuestionEdit: false,
          questionEditMode: false,
          questionSaved: false,
          enAuthEditMode: false,
          showEnhancedAuthEdit: false,
          enhancedSaved: false
        });
        // this.props.history.push('/security/accountPin');
        break;
      case "questionblock":
        if (!this.props.questionState) this.props.actions.getQuestionInfo();
        this.setState({
          showUserEdit: false,
          showPasswordEdit: false,
          userSaved: false,
          userEditMode: false,
          passwordEditMode: false,
          pwdSaved: false,
          showAccountPinEdit: false,
          accountPinEditMode: false,
          pinSaved: false,
          showQuestionEdit: false,
          questionEditMode: true,
          questionSaved: false,
          enAuthEditMode: false,
          showEnhancedAuthEdit: false,
          enhancedSaved: false
        });
        //  this.props.history.push('/security/question');
        break;
      case "enhancedauthblock":
        this.props.enhancedactions.fetchEnhAuthEdit();
        this.setState({
          showUserEdit: false,
          showPasswordEdit: false,
          userSaved: false,
          userEditMode: false,
          passwordEditMode: false,
          pwdSaved: false,
          showAccountPinEdit: false,
          accountPinEditMode: false,
          pinSaved: false,
          showQuestionEdit: false,
          questionEditMode: false,
          questionSaved: false,
          enAuthEditMode: true,
          showEnhancedAuthEdit: false,
          enhancedSaved: false
        });
        //this.props.history.push('/security/enhancedauth');

        break;
      default:
        this.setState({
          showUserEdit: true,
          showPasswordEdit: true,
          userSaved: false,
          userEditMode: true,
          passwordEditMode: true,
          pwdSaved: false,
          showAccountPinEdit: true,
          accountPinEditMode: true,
          pinSaved: false,
          showQuestionEdit: true,
          questionEditMode: true,
          questionSaved: false,
          enAuthEditMode: true,
          showEnhancedAuthEdit: true,
          enhancedSaved: false
        });
      // this.props.history.push('/security');
    }
  };

  handleSave = (formId, formData, event) => {
    // Action Dispatch will take place here to save the new userid to database
    // through an API call.
    event.preventDefault();
    switch (formId) {
      case "userForm":
        this.props.actions.setUserId(formData);
        this.setState({
          userSaved: false,
          showUserEdit: false,
          userEditMode: true
        });
        break;
      case "pwdForm":
        this.props.actions.setPassword(formData);
        this.setState({
          pwdSaved: false,
          showPasswordEdit: false,
          passwordEditMode: true
        });
        break;
      case "pinForm":
        this.props.actions.setPin(formData);
        this.setState({
          pinSaved: false,
          showAccountPinEdit: false,
          accountPinEditMode: true
        });
        break;
      case "questionForm":
        this.props.actions.setQuestionInfo(formData);
        this.setState({ questionSaved: true });
        break;
      case "enhancedForm":
        this.setState({ enhancedSaved: true });
        this.props.actions.getMetaData();
        console.log("Security GET",  this.props.actions.getMetaData())
        break;
    }
    // this.setState({
    //   showUserEdit: true, showPasswordEdit: true,
    //   userEditMode: true, passwordEditMode: true,
    //   showAccountPinEdit: true, accountPinEditMode: true,
    //   showQuestionEdit: true, questionEditMode: true,
    //   enAuthEditMode: true, showEnhancedAuthEdit: true
    // });
  };

  render() {
    let acctHolder =
      reactGlobals.mdnRole.toLocaleLowerCase() == "accountholder";
    let acctManger =
      reactGlobals.mdnRole.toLocaleLowerCase() == "accountmanager";
    const {
      securities,
      userState,
      pinState,
      passwordState,
      match,
      questionState,
      metaData,
      showSpinner,
      cqData,
      passwordList,
      questionList
    } = this.props;
    if (passwordList && securities.passwordInfo) {
      securities.passwordInfo.list = passwordList;
    }
    if (questionState && questionState.status) {
      this.state.questionSaved = true;
    }
    return (
      <div ref={node => (this.node = node)}>
        {!securities || !metaData ? (
          <Spinner />
        ) : (
          <div>
            <h1 className="title title--lg">Security</h1>
            {securities &&
              metaData && (
                <div className="col-xs-12">
                  <UserBlock
                    userInfo={securities.userIdInfo}
                    metaBlock={metaData}
                    userBlock={userState}
                    handleEditCancel={type => this.handleEditCancel(type)}
                    handleSave={(type, data, e) =>
                      this.handleSave(type, data, e)
                    }
                    {...this.state}
                  />

                  <PasswordBlock
                    passwordInfo={securities.passwordInfo}
                    pwdBlock={passwordState}
                    handleEditCancel={type => this.handleEditCancel(type)}
                    {...this.state}
                    handleSave={(type, data, e) =>
                      this.handleSave(type, data, e)
                    }
                  />

                  {(acctHolder || acctManger) && (
                    <AccountBlock
                      accountPinInfo={securities.accountPinInfo}
                      pinBlock={pinState}
                      handleEditCancel={type => this.handleEditCancel(type)}
                      {...this.state}
                      handleSave={(type, data, e) =>
                        this.handleSave(type, data, e)
                      }
                    />
                  )}

                  <SecurityQuestionBlock
                    questionInfo={securities.questionInfo}
                    metaBlock={metaData}
                    questionBlock={questionList}
                    handleEditCancel={type => this.handleEditCancel(type)}
                    handleSave={(type, data, e) =>
                      this.handleSave(type, data, e)
                    }
                    {...this.state}
                  />

                  {acctHolder && (
                    <EnhancedAuth
                      handleEditCancel={type => this.handleEditCancel(type)}
                      handleSave={(type, data, e) =>
                        this.handleSave(type, data, e)
                      }
                      {...this.state}
                    />
                  )}
                </div>
              )}
          </div>
        )}
      </div>
    );
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
    questionList: state.security.questionList,
    userIdError: state.security.userIdError,
    passwordError: state.security.passwordError,
    accountPinError: state.security.accountPinError,
    setQuestionError: state.security.setQuestionError
  };
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch),
  enhancedactions: bindActionCreators(enhancedActions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Security);
