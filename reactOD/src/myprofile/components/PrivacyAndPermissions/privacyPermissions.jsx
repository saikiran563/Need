import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from './actions'

import PrivacySettings from './privacySettings';

import VerizonSelects from './verizonSelects';

// import './style.css'

require('../../../assets/css/main.css');
require('../../../assets/css/my-profile.css');
require('../../../assets/css/oneD-Global.css');
require('../../../assets/css/phoenixGlobal.css');



class PrivacyPermissions extends Component {

   constructor(props) {
    super(props)
    this.state= {
      showPrivacyEdit: true,
      userEditMode: true,
      privacySettingsEditMode: true,
      verizonSelectsEditMode: true,
    }
  }

   componentDidMount() {
    this.props.actions.fetchPrivacyAndPermissions();
   }


   handleEditCancel = (type) =>  {
    switch(type) {
      case 'privacySettings':
      this.setState({ showPrivacyEdit: false, privacySettingsEditMode: false, userEditMode: true,  verizonSelectsEditMode: false});
      break;
      case 'verizonSelects':
      this.setState({verizonSelectsEditMode: true, userEditMode: false, privacySettingsEditMode: false})
      break;
      default:
       this.setState({ showPrivacyEdit:true, userEditMode: true, privacySettingsEditMode: true, verizonSelectsEditMode: false })
    }
  }


  handleSave = (formId, formData, event) => {
    // through an API call.
    event.preventDefault();
     switch(formId) {
      case 'privacySettings':
      console.log(`${formId} '------' ${formData}`);
      this.props.actions.setPrivacySettings(formData);
      break;
      case 'verizonSelects':
      console.log(`${formId} '------' ${formData}`);
      this.props.actions.setVerizonSelects(formData);
      break;
    }
  }

    render () {

        return (
          <div>
       <h1 className="title title--lg">Privacy & Permissions</h1>
       <div className="col-xs-12">
     
           <VerizonSelects />
       </div>
       </div>
        )
    }

}

const mapStateToProps = state => {
  return {
    privacyDetails: state.privacyDetails.list,
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(PrivacyPermissions)
