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
    // let staticurl="https://qa3billpayimages.verizonwireless.com/imageFiles/postpay-acct-msite";
    return (

      <div className="row quicklinks-list">
        {reactGlobals.mdnRole.toLocaleLowerCase() == "accountholder" || reactGlobals.mdnRole.toLocaleLowerCase() == "accountmanager" || reactGlobals.mdnRole.toLocaleLowerCase() == "mobilesecure" ?
          <div className="col-sm-4" onClick={this.navigateToPage}>
            <NavLink exact to='/contactbilling'>
              <img className="icon" src={staticurl + "/reactOD/build/static/assets/images/email.png"} alt="Email Icon" />
              <h3 className="a-subhead-md a-caret-right">{profiletiles.changeEmailAddressTitle}</h3>
              <p>{profiletiles.changeEmailAddressInfo} </p> </NavLink>
          </div> : ''}
        {reactGlobals.mdnRole.toLocaleLowerCase() == "accountholder" || reactGlobals.mdnRole.toLocaleLowerCase() == "accountmanager" ? 
        <div className="col-sm-4" onClick={this.navigateToPage}>
          <NavLink exact to='/manageaccount/accountmanagers'>
            <img className="icon" src={staticurl + "/reactOD/build/static/assets/images/account-managers.png"} alt="Account Managrs Icon" />
            <h3 className="a-subhead-md a-caret-right">Assign account managers</h3>
            <p>Assign Account Managers to let others access and make changes </p> </NavLink>
        </div> : ''}
        {reactGlobals.mdnRole.toLocaleLowerCase() == "accountholder" || reactGlobals.mdnRole.toLocaleLowerCase() == "accountmanager" || reactGlobals.mdnRole.toLocaleLowerCase() == "mobilesecure" ?
          <div className="col-sm-4" onClick={this.navigateToPage}>
            <NavLink exact to='/security/password'>
              <img className="icon" src={staticurl + "/reactOD/build/static/assets/images/change-password.png"} alt="Change Password Icon" />
              <h3 className="a-subhead-md a-caret-right">Change password</h3>
              <p>Pick a password to use with your Verizon login. </p> </NavLink>
          </div> : ''}
        {reactGlobals.mdnRole.toLocaleLowerCase() == "accountholder" || reactGlobals.mdnRole.toLocaleLowerCase() == "accountmanager" ? 
        <div className="col-sm-4">
          <img className="icon" src={staticurl + "/reactOD/build/static/assets/images/billing-address.png"} alt="Billing Address Icon" />
          <h3 className="a-subhead-md a-caret-right">Change billing address</h3>
          <p>Let us know where to send your bill. </p>
        </div> : ''}
        {reactGlobals.mdnRole.toLocaleLowerCase() == "accountholder" || reactGlobals.mdnRole.toLocaleLowerCase() == "accountmanager" ? 
        <div className="col-sm-4" onClick={this.navigateToPage}>
          <NavLink exact to='/security/accountPin'>
            <img className="icon" src={staticurl + "/reactOD/build/static/assets/images/account-pin.png"} alt="Account PIN Icon" />
            <h3 className="a-subhead-md a-caret-right">Change account PIN</h3>
            <p>Set a PIN number to verify your identity when calling customer care. </p> </NavLink>
        </div> : ''}
        {reactGlobals.mdnRole.toLocaleLowerCase() == "accountholder" || reactGlobals.mdnRole.toLocaleLowerCase() == "accountmanager" || reactGlobals.mdnRole.toLocaleLowerCase() == "mobilesecure" ? 
        <div className="col-sm-4" onClick={this.navigateToPage}>
          <NavLink exact to='/privacypermissions/privacysettings'>
            <img className="icon" src={staticurl + "/reactOD/build/static/assets/images/laptop-controls.png"} alt="Privacy Settings Icon" />
            <h3 className="a-subhead-md a-caret-right">Manage privacy settings</h3>
            <p>Specify the kind of information Verizon can collect from you. </p> </NavLink>
        </div> : ''}
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