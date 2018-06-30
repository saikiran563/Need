import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from './actions'
import UserBlock from './UserBlock'
import PasswordBlock from './PasswordBlock'
import AccountBlock from './AccountBlock'
import './style.css'

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
      currentUser:"",
      userSaved:false,
      pwdSaved:false,
      pinSaved:false
    }
  }

  componentDidMount() {
    this.props.actions.fetchSecurity();
    this.props.actions.getUserInfo();
  }

  handleEditCancel = (type) =>  {
    switch(type) {
      case 'userblock':
      this.setState({ showUserEdit: false, showPasswordEdit : false,userSaved:false, 
                       userEditMode: true, passwordEditMode: false ,pwdSaved:false,
                       showAccountPinEdit:false, accountPinEditMode: false,pinSaved:false
                       });
      break;
      case 'passwordblock':
      this.setState({ showUserEdit: false, showPasswordEdit : false, userSaved:false,
                      userEditMode: false, passwordEditMode: true ,pwdSaved:false,
                      showAccountPinEdit:false, accountPinEditMode: false,pinSaved:false
                      });
      break;
      case 'accountPinblock':
      this.setState({ showUserEdit: false, showPasswordEdit : false, userSaved:false,
                      userEditMode: false, passwordEditMode: false ,pwdSaved:false,
                      showAccountPinEdit:false, accountPinEditMode: true,pinSaved:false
                      });
      
      break;
      default:
      this.setState({ showUserEdit: true, showPasswordEdit : true, userSaved:false,
                      userEditMode: true, passwordEditMode: true ,pwdSaved:false,
                      showAccountPinEdit:true, accountPinEditMode: true,pinSaved:false
                      });
    }
  }

   handleSave = (formId, formData, event) => {
    
    // Action Dispatch will take place here to save the new userid to database
    // through an API call.
    event.preventDefault();
     switch(formId) {
      case 'userForm':
      
      this.refs.pwdBlock.updateUser(formData);
      //this.props.actions.setUserId(formData)
      //this.setState({currentUser: formData,showUserEdit: true, userEditMode: true, userSaved:true});
      /*this.setState({ currentUser: formData, showUserEdit: true, showPasswordEdit : true,userSaved:true, 
                       userEditMode: true, passwordEditMode: false ,pwdSaved:false,
                       showAccountPinEdit:false, accountPinEditMode: false,pinSaved:false
                       });*/
                       this.setState({userSaved:true});
      break;
      case 'pwdForm':
      //this.setState({currentUser: formData,showPasswordEdit: true, passwordEditMode: true, pwdSaved:true});
      /*this.setState({ currentUser: formData, showUserEdit: false, showPasswordEdit : false,userSaved:false, 
                       userEditMode: true, passwordEditMode: false ,pwdSaved:false,
                       showAccountPinEdit:false, accountPinEditMode: false,pinSaved:false
                       });*/
                       this.setState({pwdSaved:true});
      break;
      case 'pinForm':
     
     this.setState({pinSaved:true});
      break;
    }
     this.setState({ showUserEdit: true, showPasswordEdit : true, 
                      userEditMode: true, passwordEditMode: true ,
                      showAccountPinEdit:true, accountPinEditMode: true
                      });
  }

  render() {
    
    const { securities ,updateState, match } = this.props;
    const type = match.url.split("/")[2];
    console.log(type);
    
    return (
  <div>
          <h1 className="title title--lg">Security</h1>
            {
              securities && <div className="col-xs-12">
                <UserBlock id= "userId" userInfo={securities.userIdInfo} userBlock={updateState} handleEditCancel={(type) => this.handleEditCancel(type)} 
                            handleSave={(type, data, e) => this.handleSave(type, data, e)} {...this.state}/>
                <PasswordBlock ref="pwdBlock" passwordInfo={securities.passwordInfo} handleEditCancel={(type) => this.handleEditCancel(type)} {...this.state} 
                            handleSave={(type, data, e) => this.handleSave(type, data, e)} {...this.state}/>
                
                <AccountBlock  accountPinInfo={securities.accountPinInfo} handleEditCancel={(type) => this.handleEditCancel(type)} {...this.state} 
                            handleSave={(type, data, e) => this.handleSave(type, data, e)} {...this.state}/>
              </div>
            }
       </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    securities: state.security.list,
    updateState:state.security.status
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(Security)
