import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from './actions'
import AccountManagers from './AccountManagers'
import Greetings from './Greetings'
import TransferOfService from './TransferOfService'
import './style.css'
import Popup from './Popup/Popup';
import Spinner from "../Spinner/Spinner"; //spinner

require('../../../assets/css/main.css');
require('../../../assets/css/my-profile.css');
require('../../../assets/css/oneD-Global.css');
require('../../../assets/css/phoenixGlobal.css');

const accountOwner =  reactGlobals.mdnRole == 'accountHolder'
const accountMember = reactGlobals.mdnRole == 'mobileSecure'
const accountManager = reactGlobals.mdnRole == 'accountManager'

class Manage extends Component {
  constructor(props) {
    super(props)
    this.state= {
      showManagerEdit: true,
      managerEditMode: true,
      showGreetingEdit: true,
      greetingEditMode: true,
      showTransferOfServiceEdit: true,
      transferOfServiceEditMode: true,

      managers: [],
      addedManager: [],
      revokedManager: {},
      accountManagerRequests: [],
      deniedAccountManagerRequests: null,
      showRequestSuccessPopup: false,
      newAccountMemberRequest:  {
          status: 'not requested' // request pending , request denied
      }
    }
  }

  componentDidMount(){

    this.props.actions.fetchLandingManageData();
    const URL_MAP = this.props.match.url.split("/");
    const type = URL_MAP[URL_MAP.length-1];
    type?this.handleEditCancel(type+"block"):"";
      this.setState({
        accountManagerRequests: this.props.accountManagerRequests,
        newAccountMemberRequest:this.props.newAccountMemberRequest
      })
  }


  handleSendRequestForAccountManager(newManagerInfo){
        //Api call to Save new Manager Info
        this.toggleRequestSuccessPopup()
        this.setState({
          newAccountMemberRequest: {
            status: 'request pending',
            firstName: newManagerInfo.firstName,
            lastName: newManagerInfo.lastName,
            phoneNumber: newManagerInfo.phoneNumber,
            emailId: newManagerInfo.emailId
          }
        })
  }

  toggleRequestSuccessPopup(){
    this.setState({
      showRequestSuccessPopup: !this.state.showRequestSuccessPopup
    })
  }

  componentWillReceiveProps(newProps){
      this.setState({
        managers: newProps.managers,
        accountManagerRequests: newProps.accountManagerRequests,
        newAccountMemberRequest:newProps.newAccountMemberRequest
      })
  }

  handleAppproveAccountManagerRequest(newRequest){
      let { managers, accountManagerRequests } = this.state
      managers.push({
        firstName:  newRequest.firstName,
        lastName: newRequest.lastName,
        phoneNumber: newRequest.phoneNumber,
        emailId: newRequest.emailId
      })
      let pendingAccountManagerRequests = []
      accountManagerRequests.forEach(eachRequest => {
        eachRequest.phoneNumber !== newRequest.phoneNumber ? pendingAccountManagerRequests.push(eachRequest) : {}
      })
      this.setState({
        managers,
        accountManagerRequests: pendingAccountManagerRequests,
        deniedAccountManagerRequests: null
      })
  }

  handleUndoDenyAccountManagerRequest(){
      let { accountManagerRequests, deniedAccountManagerRequests }  = this.state
      accountManagerRequests.push(deniedAccountManagerRequests)
      this.setState({
        accountManagerRequests,
        deniedAccountManagerRequests: null
      })
  }

  handleDenyAccountManagerRequest(newRequest){
      let { accountManagerRequests , deniedAccountManagerRequests}  = this.state
      let pendingAccountManagerRequests = []
      accountManagerRequests.forEach(eachRequest=>{
        eachRequest.phoneNumber !== newRequest.phoneNumber ?
        pendingAccountManagerRequests.push(eachRequest) :
        deniedAccountManagerRequests = eachRequest
      })
      this.setState({
        accountManagerRequests: pendingAccountManagerRequests,
        deniedAccountManagerRequests
      })
  }

handleEditCancel = (type) =>  {
    switch(type) {
      case 'accountmanagerblock':
        if( !accountManager ) {
          this.props.actions.fetchMtns()
          this.props.actions.fetchManagerRequests()
          this.props.actions.getAccountMemberDetailsToSendRequest()
        }
        this.setState({
          showManagerEdit: false, showGreetingEdit : false , showTransferOfServiceEdit: false,
          managerEditMode: true, greetingEditMode: false,transferOfServiceEditMode:false
        });
        this.props.history.push('/manage/accountmanager');
      break;

      case 'greetingnameblock':
        this.setState({
          showManagerEdit: false, showGreetingEdit : false , showTransferOfServiceEdit: false,
          managerEditMode: false,greetingEditMode: true,transferOfServiceEditMode:false
         });
        this.props.history.push('/manage/greetingname');
      break;

      case 'transferofserviceblock':
        this.setState({
          showManagerEdit: false, showGreetingEdit : false , showTransferOfServiceEdit: false,
          managerEditMode: false,greetingEditMode: false, transferOfServiceEditMode:true
         });
          this.props.history.push('/manage/transferofservice');
      break;

      default:
      this.setState({
          showManagerEdit: true, showGreetingEdit : true , showTransferOfServiceEdit: true,
          managerEditMode: true,greetingEditMode: true,transferOfServiceEditMode:true
         });
    }
  }

  handleSave = (formId, formData, event) => {
     event.preventDefault();
      switch(formId) {
       case 'accountmanagerBlock':
       const { managers } = this.state
       let newManagers = []
       // Remove existing isLastlyAdded key if multiple managers are added
       managers.map((eachManager)=>{
         newManagers.push({
           role: eachManager.role,
           firstName: eachManager.firstName,
           lastName:eachManager.lastName,
           phoneNumber: eachManager.phoneNumber,
           emailId: eachManager.emailId
         })
       })
       // Make a API call to generate Unique Id to the the Manager
       const id = Math.round((new Date()).getTime() / 1000) // A unique id should generated each time a manager is added.
       let addedManager = {
         type: "none",
         firstName: formData.firstName,
         lastName: formData.lastName,
         phoneNumber: formData.phoneNumber ? formData.phoneNumber : "noLineAssigned", // formData.phoneNumber==='noLineAssigned'?'': "", //eachManager.phoneNumber,
         emailId: formData.emailId,
         id: id
     }
       this.setState({
      managers: [...newManagers,addedManager],
       addedManager
     })
       break;
       case 'greetingnameblock':
       //
       break
       case 'transferofserviceblock':
       //
       break;
       default:
     }
    this.setState({ showManagerEdit: true, showGreetingEdit : true, showTransferOfServiceEdit: true})
  }


  handleRemoveManager(handleRemoveManager){
    let newManagers = []
     const { managers } = this.state
     let revokedManager
     managers.forEach((eachManager)=>{
       if(handleRemoveManager.phoneNumber != eachManager.phoneNumber){
         newManagers.push(eachManager)
       }else {
         revokedManager = eachManager
       }
     })
     this.setState({
       managers: newManagers,
       revokedManager
     })
  }

  handleUndoRevoke(){
      this.props.actions.postAddManagerByAccountHolder(this.state.revokedManager)
      this.setState({
        managers: [...this.state.managers,this.state.revokedManager]
      },()=>{
        this.setState({
          revokedManager: {}
        })
      })
  }

  render() {
    const { managers, accountManagerRequests,deniedAccountManagerRequests } = this.state;
    const { showSpinner } = this.props
    return (
      <div>
          <h1 className="title title--lg">Manage Account</h1>
          {
          showSpinner ? <Spinner /> :
          <div className="col-xs-12">
              <AccountManagers
                  managers={managers}
                  handleEditCancel={(type) => this.handleEditCancel(type)}
                  handleSave={(type, data, e) => this.handleSave(type, data, e)}
                  {...this.state}
                  handleAppproveAccountManagerRequest={(newRequest)=>this.handleAppproveAccountManagerRequest(newRequest)}
                  handleDenyAccountManagerRequest={(newRequest)=>this.handleDenyAccountManagerRequest(newRequest)}
                  deniedAccountManagerRequests={deniedAccountManagerRequests}
                  accountManagerRequests={accountManagerRequests}
                  handleRemoveManager={(managerToRemove)=>this.handleRemoveManager(managerToRemove)}
                  handleUndoDenyAccountManagerRequest={(deniedRequest)=>this.handleUndoDenyAccountManagerRequest(deniedRequest)}
                  handleUndoRevoke = {(managerToAdd)=>this.handleUndoRevoke(managerToAdd)}
                  handleSendRequestForAccountManager={(newManagerInfo)=>this.handleSendRequestForAccountManager(newManagerInfo)}
                  showRequestSuccessPopup={this.state.showRequestSuccessPopup}
                  toggleRequestSuccessPopup={()=>this.toggleRequestSuccessPopup()}
                />
              <Greetings  handleEditCancel={(type) => this.handleEditCancel(type)} handleSave={(type, data, e) => this.handleSave(type, data, e)} {...this.state}/>
              <TransferOfService {...this.state}/>
          </div>
          }
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    managers: state.accManagerReducer.managers,
    accountManagerRequests:  state.accManagerReducer.accountManagerRequests,
    state:state,
    newAccountMemberRequest:state.accManagerReducer.newAccountMemberRequest
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(Manage)
