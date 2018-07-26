import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from './actions'
import AccountManagers from './AccountManagers'
import Greetings from './Greetings'
import TransferOfService from './TransferOfService'
import './style.css'
import Popup from './Popup/Popup';

require('../../../assets/css/main.css');
require('../../../assets/css/my-profile.css');
require('../../../assets/css/oneD-Global.css');
require('../../../assets/css/phoenixGlobal.css');

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
      revokedManager: [],
      accountManagerRequests: [],
      deniedAccountManagerRequests: null
    }
  }

  componentDidMount(){
    this.props.actions.fetchManage();
    debugger
    //this.props.actions.getUserInfo();
    const URL_MAP = this.props.match.url.split("/");
    const type = URL_MAP[URL_MAP.length-1];
    type?this.handleEditCancel(type+"block"):"";
      this.setState({
        managers: this.props.customerInfo,
        accountManagerRequests: this.props.accountManagerRequests
      })
  }

  handleAppproveAccountManagerRequest(newRequest){
      let { managers, accountManagerRequests }  = this.state
      managers.push({
        firstName: newRequest.firstName,
        lastName:newRequest.lastName,
        phoneNumber: newRequest.phoneNumber,
        emailId: newRequest.emailId
      })

      let pendingAccountManagerRequests = []
      accountManagerRequests.forEach(eachRequest=>{
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
      // managers.push({
      //   id: newRequest.id,
      //   firstName: newRequest.firstName,
      //   lastName:newRequest.lastName,
      //   phoneNumber: newRequest.phoneNumber,
      //   emailId: newRequest.emailId
      // })

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
      case 'accountManagerblock':
        this.setState({
          showManagerEdit: false, showGreetingEdit : false , showTransferOfServiceEdit: false,
          managerEditMode: true, greetingEditMode: false,transferOfServiceEditMode:false
        });
        this.props.history.push('/manage/accountManager');
      break;

      case 'greetingblock':
        this.setState({
          showManagerEdit: false, showGreetingEdit : false , showTransferOfServiceEdit: false,
          managerEditMode: false,greetingEditMode: true,transferOfServiceEditMode:false
         });
        this.props.history.push('/manage/greeting');
      break;

      case 'transferofServiceblock':
        this.setState({
          showManagerEdit: false, showGreetingEdit : false , showTransferOfServiceEdit: false,
          managerEditMode: false,greetingEditMode: false,transferOfServiceEditMode:true
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
   // Action Dispatch will take place here to save the new userid to database
   // through an API call.
     event.preventDefault();
      switch(formId) {
       case 'accountManagerBlock':

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
         phoneNumber: formData.phoneNumber,
         emailId: formData.emailId,
         id: id
     }
       this.setState({
      managers: [...newManagers,addedManager],
       addedManager
     })
       break;
       case 'greetingblock':
       //
       break
       case 'transferOfServiceblock':
       //
       break;
       default:
     }

    this.setState({ showManagerEdit: true, showGreetingEdit : true, showTransferOfServiceEdit: true})
  }


  handleRemoveManager(handleRemoveManager){
    let newManagers = []
     const { managers } = this.state
     let revokedManager = []
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
    return (
      <div>
          <h1 className="title title--lg">Manage Account</h1>
          <div className="col-xs-12">
              <AccountManagers
                  managers={managers}
                  handleEditCancel={(type) => this.handleEditCancel(type)}
                  handleSave={(type, data, e) => this.handleSave(type, data, e)}
                  {...this.state}
                  handleAppproveAccountManagerRequest={(newRequest)=>this.handleAppproveAccountManagerRequest(newRequest)}
                  handleDenyAccountManagerRequest={(newRequest)=>this.handleDenyAccountManagerRequest(newRequest)}
                  accountManagerRequests={accountManagerRequests}
                  deniedAccountManagerRequests={deniedAccountManagerRequests}
                  handleRemoveManager={(managerToRemove)=>this.handleRemoveManager(managerToRemove)}
                  handleUndoDenyAccountManagerRequest={(deniedRequest)=>this.handleUndoDenyAccountManagerRequest(deniedRequest)}
                  handleUndoRevoke = {(managerToAdd)=>this.handleUndoRevoke(managerToAdd)}
                />
              <Greetings  handleEditCancel={(type) => this.handleEditCancel(type)} handleSave={(type, data, e) => this.handleSave(type, data, e)} {...this.state}/>
              <TransferOfService {...this.state}/>
          </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
  "statusCode": "0",
  "greetingName": "testUser",
  "customerInfo": [
    {
      "role": "accountHolder",
      "phoneNumber": "3143060179",
      "emailId": "ASHLEYJACOBY@CHARTER.NET",
      "alreadyRegistered": true,
      "newlyRegistered": true
    },
    {
      "role": "accountManager",
      "firstName": "JEFFREY",
      "lastName": "LEBOWSKI",
      "phoneNumber": "3144125593",
      "emailId": "ASHLEY@JACOBY.COM",
      "alreadyRegistered": true,
      "newlyRegistered": true
    },
    {
      "role": "accountManager",
      "firstName": "JEFFREY",
      "lastName": "LEBOWSKI",
      "phoneNumber": "3144128530",
      "emailId": "ASHLEY@JACOBY.COM",
      "alreadyRegistered": true,
      "newlyRegistered": true
    }
  ],
  "correlation_id": "52105127-0c02-4b83-97d7-2dda0e1f7605",
  accountManagerRequests: [],
  state:state,
  /*  manage: {
      manage: null,
      isFetching: false,
      show: false,
      accountManagerRequests: [
        {
          id: 10,
          firstName: "Samurai",
          lastName:"Jack",
          phoneNumber: "(909)-505-603",
          emailId: "samuraijack@verizon..com",
          type:"accountManager",
        },
        {
          id: 12,
          firstName: "Bruce",
          lastName:"Lee",
          phoneNumber: "(909)-505-603",
          emailId: "Brucelee@verizon..com",
          type:"accountManager",
        },
        {
          id: 11,
          firstName: "Jackie",
          lastName:"Chan",
          phoneNumber: "(909)-505-603",
          emailId: "jackieChan@verizon..com",
          type:"accountManager",
        }
      ],
      list: [
        {
          type:"accountOwner",
          id: 1,
          firstName: "Isacc",
          lastName:"Newton",
          phoneNumber: "(909)-505-603",
          emailId: "Isacc@Newton.com"
        },
        {
          type: "none",
          id:2,
          firstName: "Benjamin",
          lastName:"Franklin",
          phoneNumber: "(909)-505-603",
          emailId: "name@domain.com"
        }
      ]
    } */
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(Manage)
