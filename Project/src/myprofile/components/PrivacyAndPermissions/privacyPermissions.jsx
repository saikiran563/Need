import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from './actions'

import PrivacySettings from './privacySettings';

import VerizonSelects from './verizonSelects';

 import './style.css'

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

    const URL_MAP = this.props.match.url.split("/");
    const type = URL_MAP[URL_MAP.length-1];
    type?this.handleEditCancel(type+"block"):"";

   }


   handleEditCancel = (type) =>  {
    console.log(type);
    switch(type) {
      case 'privacysettingsblock':
      this.setState({ showPrivacyEdit: false, privacySettingsEditMode: false, userEditMode: true,  verizonSelectsEditMode: false});
      this.props.history.push('/privacypermissions/privacysettings');
      break;
      case 'verizonselectsblock':
      this.setState({verizonSelectsEditMode: true, userEditMode: false, privacySettingsEditMode: false, showPrivacyEdit: false})
      this.props.history.push('/privacypermissions/verizonselects');
      break;
      default:
      this.props.history.push('/privacypermissions');
       this.setState({ showPrivacyEdit:true, userEditMode: true, privacySettingsEditMode: true, verizonSelectsEditMode: true })
    }
  }


  handleSave = (formId, formData, event) => {
    // through an API call.
    event.preventDefault();
     switch(formId) {
      case 'privacysettingsblock':
      console.log(`${formId} '------' ${formData}`);
      this.props.actions.setPrivacySettings(formData);
      break;
      case 'verizonSelectsBlock':
      console.log(`${formId} '------' ${formData}`);
      this.props.actions.setVerizonSelects(formData);
      break;
    }
  }

    render () {

       const { privacyDetails } = this.props;

        return (
          <div>
       <h1 className="title title--lg">Privacy & Permissions</h1>
       <div className="col-xs-12">
       <PrivacySettings handleEditCancel={(type) => this.handleEditCancel(type)} {...this.state} />
       <VerizonSelects {...this.state}/>
       </div>
       </div>
        )
    }

}

const mapStateToProps = state => {
  return {
    privacyDetails: state.privacyDetails,
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(PrivacyPermissions)
