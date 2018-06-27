import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from './actions'
import AccountManagers from './AccountManagers'
import Greetings from './Greetings'
import TransferOfService from './TransferOfService'
import './style.css'

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
      managers: []
      //showTransferOfServiceEdit: true,
    }
  }

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
   debugger
     event.preventDefault();
     console.log(this.state);
      switch(formId) {
       case 'accountManagerBlock':
       this.setState({
         managers: [...this.state.managers,{
           type: "none",
           firstName: formData.firstName,
           lastName:formData.lastName,
           phoneNumber: formData.phoneNumber,
           emailId: formData.emailId
       }]}
     )
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

  render() {
    const { managers } = this.state;
    return (
      <div>
          <h1 className="title title--lg">Manage</h1>
          <div className="col-xs-12">
              <AccountManagers managers={managers}  handleEditCancel={(type) => this.handleEditCancel(type)} handleSave={(type, data, e) => this.handleSave(type, data, e)} {...this.state}/>
              <Greetings  handleEditCancel={(type) => this.handleEditCancel(type)} handleSave={(type, data, e) => this.handleSave(type, data, e)} {...this.state}/>
              <TransferOfService/>
          </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  /*
    temporarily place holding the redux mange state here.
  */
  return {
    manage: {
      manage: null,
      isFetching: false,
      show: false,
      list: [
        {
          type:"accontOwner",
          firstName: "Isacc",
          lastName:"Newton",
          phoneNumber: "xxx.xxx.xxxx",
          emailId: "name@domain.com",
          managerId: 1
        },
        {
          type: "none",
          firstName: "Benjamin",
          lastName:"Franklin",
          phoneNumber: "xxx.xxx.xxxx",
          emailId: "name@domain.com",
          managerId: 2
        },
        {
          type: "none",
          firstName: "",
          lastName:"",
          phoneNumber: "xxx.xxx.xxxx",
          emailId: "name@domain.com",
          managerId: 3
        },
      ]
    }
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(Manage)
