import React, { Component } from 'react';
import { connect } from 'react-redux'
import * as actions from './actions'
import { Redirect, Link, withRouter, NavLink } from "react-router-dom"
import { bindActionCreators } from 'redux'


class TileProfile extends Component {
  constructor() {
    super();

  }
  componentDidMount() {

    this.props.actions.fetchDeviceTiles()
    this.props.actions.showDeviceTiles();

  }

  navigateToPage(e) {
    window.location.replace(e.currentTarget.querySelector('a').getAttribute('href'))
    //window.URL=e.currentTarget.querySelector('a').getAttribute('href');
  }
  render() {

    let profiletiles = this.props.deviceTiles;
    let staticurl = reactGlobals.staticUrl;
    
    return (

      <div className="row quicklinks-list">
        {reactGlobals.mdnRole.toLocaleLowerCase() == "accountholder" || reactGlobals.mdnRole.toLocaleLowerCase() == "accountmanager" || reactGlobals.mdnRole.toLocaleLowerCase() == "mobilesecure" ?
          // <div className="col-sm-4" onClick={this.navigateToPage} analyticstrack="qlink-changeemailaddress">
           <a  className="col-sm-4" onClick={this.navigateToPage} href='#/contactbilling/email' tabIndex="0" aria-label="click to Change email address" role="button" analyticstrack="qlink-emailaddress">
              <img className="icon" src={staticurl + "/reactOD/build/static/assets/images/email.png"} alt="Email Icon" />
              <h3 className="a-subhead-md a-caret-right">Change email address</h3>
              <p>Choose the email address that we should use to contact you.</p> 
          </a> : ''}
        {reactGlobals.mdnRole.toLocaleLowerCase() == "accountholder" || reactGlobals.mdnRole.toLocaleLowerCase() == "accountmanager" || reactGlobals.mdnRole.toLocaleLowerCase() == "mobilesecure" ? 
        // <div className="col-sm-4" onClick={this.navigateToPage} analyticstrack="qlink-assignmanagers">
        <a  className="col-sm-4" onClick={this.navigateToPage} href='#/manage/accountmanager' tabIndex="0"  aria-label="click to Assign account managers" role="button" analyticstrack="qlink-assignmanagers">
            <img className="icon" src={staticurl + "/reactOD/build/static/assets/images/account-managers.png"} alt="Account Managrs Icon" />
            <h3 className="a-subhead-md a-caret-right">Assign account managers</h3>
            <p>Assign Account Managers to let others access and make changes.</p>
        </a> : ''}
        {reactGlobals.mdnRole.toLocaleLowerCase() == "accountholder" || reactGlobals.mdnRole.toLocaleLowerCase() == "accountmanager" || reactGlobals.mdnRole.toLocaleLowerCase() == "mobilesecure" ?
          // <div className="col-sm-4" onClick={this.navigateToPage} analyticstrack="qlink-changepwd">
            <a  className="col-sm-4" onClick={this.navigateToPage} href='#/security/password' tabIndex="0" aria-label="click to Change password" role="button" analyticstrack="qlink-changepassword">
              <img className="icon" src={staticurl + "/reactOD/build/static/assets/images/change-password.png"} alt="Change Password Icon" />
              <h3 className="a-subhead-md a-caret-right">Change password</h3>
              <p>Pick a password to use with your Verizon login.</p>
          </a> : ''}
          
        {reactGlobals.mdnRole.toLocaleLowerCase() == "accountholder" || reactGlobals.mdnRole.toLocaleLowerCase() == "accountmanager" ? 
        // <div className="col-sm-4" onClick={this.navigateToPage} analyticstrack="qlink-changebilling">
      <a  className="col-sm-4" onClick={this.navigateToPage} href='#/contactbilling/billingAddress' tabIndex="0" aria-label="click to Change billing address" role="button" analyticstrack="qlink-changebillingaddress">
          <img className="icon" src={staticurl + "/reactOD/build/static/assets/images/billing-address.png"} alt="Billing Address Icon" />
          <h3 className="a-subhead-md a-caret-right">Change billing address</h3>
          <p>Let us know where to send your bill.</p> 
        </a> : ''}
        {reactGlobals.mdnRole.toLocaleLowerCase() == "accountholder" || reactGlobals.mdnRole.toLocaleLowerCase() == "accountmanager" ? 
        // <div className="col-sm-4" onClick={this.navigateToPage}  analyticstrack="qlink-changeacctpin">
         <a  className="col-sm-4" onClick={this.navigateToPage} href='#/security/accountPin' tabIndex="0" aria-label="click to Change account PIN" role="button" analyticstrack="qlink-changeacctpin">
            <img className="icon" src={staticurl + "/reactOD/build/static/assets/images/account-pin.png"} alt="Account PIN Icon" />
            <h3 className="a-subhead-md a-caret-right">Change account PIN</h3>
            <p>Set a PIN number to verify your identity when calling customer care.</p>
         </a> : ''} 
        {reactGlobals.mdnRole.toLocaleLowerCase() == "accountholder" || reactGlobals.mdnRole.toLocaleLowerCase() == "accountmanager" ? 
        // <div className="col-sm-4" onClick={this.navigateToPage} analyticstrack="qlink-privacysettings">
        <a  className="col-sm-4" onClick={this.navigateToPage} href='#/privacypermissions/privacysettings' tabIndex="0" aria-label="click to Manage privacy settings" role="button" analyticstrack="qlink-privacysettings">
            <img className="icon" src={staticurl + "/reactOD/build/static/assets/images/laptop-controls.png"} alt="Privacy Settings Icon" />
            <h3 className="a-subhead-md a-caret-right">Manage privacy settings</h3>
            <p>Specify the kind of information Verizon can collect from you.</p>
        </a> : ''}
      </div>

    )
  }
}

const mapStateToProps = state => {

  return {
    isFetching: state.myprofile.isFetching,
    deviceTiles: state.myprofile.deviceTiles,
    visible: state.myprofile.visible,
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch),
})
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TileProfile));