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
      showGreetingEdit: true,
      managers: [],
      addedManager: [],
      revokedManager: []
      //showTransferOfServiceEdit: true,
    }
  }

 //  openPopup(){
 //   this.props.actions.show_popup("manage"); /* calling to action */
 // }

  componentDidMount() {
    this.setState({
      managers: this.props.manage.list
    })
  }

handleEditCancel = (type) =>  {
    switch(type) {
      case 'manageblock':
      this.setState({ showManagerEdit: false, showGreetingEdit : true , showTransferOfServiceEdit: true});
      break;
      case 'greetingblock':
      this.setState({ showManagerEdit: true, showGreetingEdit : false, showTransferOfServiceEdit: true });
      break;
      /*case 'TransferOfService':
      this.setState({ showManagerEdit: true, showGreetingEdit : true, showTransferOfServiceEdit : false});
      break;*/
      default:
      this.setState({ showManagerEdit: true, showGreetingEdit : true, showTransferOfServiceEdit: true})
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
           type: "none",
           firstName: eachManager.firstName,
           lastName:eachManager.lastName,
           phoneNumber: eachManager.phoneNumber,
           emailId: eachManager.emailId,
           id: eachManager.id
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
       if(handleRemoveManager.id != eachManager.id){
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
    const { managers } = this.state;
    return (
      <div>
          <h1 className="title title--lg">Manage Account</h1>
          <div className="col-xs-12">
              <AccountManagers
                  managers={managers}
                  handleEditCancel={(type) => this.handleEditCancel(type)}
                  handleSave={(type, data, e) => this.handleSave(type, data, e)}
                  {...this.state}
                  handleRemoveManager={(managerToRemove)=>this.handleRemoveManager(managerToRemove)}
                  handleUndoRevoke = {(managerToAdd)=>this.handleUndoRevoke(managerToAdd)}
                />
              <Greetings  handleEditCancel={(type) => this.handleEditCancel(type)} handleSave={(type, data, e) => this.handleSave(type, data, e)} {...this.state}/>
              <TransferOfService/>
          </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    state:state,
    manage: {
      manage: null,
      isFetching: false,
      show: false,
      list: [
        {
          type:"accontOwner",
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
    }
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(Manage)
