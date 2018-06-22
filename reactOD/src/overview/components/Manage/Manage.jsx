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
      //showTransferOfServiceEdit: true,
    }
  }

  componentDidMount() {
    //this.props.actions.fetchManage();
  }

handleEditCancel = (type) =>  {
    switch(type) {
      case 'manageblock':
      this.setState({ showManagerEdit: false, showGreetingEdit : true  });
      break;
      case 'greetingblock':
      this.setState({ showManagerEdit: true, showGreetingEdit : false });
      break;
      /*case 'TransferOfService':
      this.setState({ showManagerEdit: true, showGreetingEdit : true, showTransferOfServiceEdit : false}); 
      break;*/
      default:
      this.setState({ showManagerEdit: true, showGreetingEdit : true})
    }
  }

     /* handleSave = (formId, formData, event) => {
    // Action Dispatch will take place here to save the new userid to database
    // through an API call.
    event.preventDefault();
     switch(formId) {
      case 'userblock':
      console.log(`${formId} '------' ${formData}`);
      this.props.actions.setUserId(formData)
      break;
    }
  } */

  render() {
    const { manage } = this.props;
    return (
      <div>
          <h1 className="title title--lg">Manage</h1>
          <div className="col-xs-12">
              <AccountManagers managerInfo={manage.list}  handleEditCancel={(type) => this.handleEditCancel(type)} handleSave={(type, data, e) => this.handleSave(type, data, e)} {...this.state}/>
              <Greetings managerInfo={manage.list}  handleEditCancel={(type) => this.handleEditCancel(type)} handleSave={(type, data, e) => this.handleSave(type, data, e)} {...this.state}/>
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
      list : {
        accountManagers: {
          owner: {
            firstName: 'Jhon',
            lastName: 'Doe',
            phone: '123 456 7890',
            email: 'jhon.Doe@Verizon.com'
          },
          other: {
            firstName: 'Jack ',
            lastName: 'Smith ',
            phone: '123 456 7890',
            email: 'Jack.Smith@Verizon.com'
          }
        }
      }
    }
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(Manage)
