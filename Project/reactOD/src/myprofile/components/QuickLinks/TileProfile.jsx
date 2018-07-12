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
  

  render() {

 let profiletiles = this.props.deviceTiles;

    return (

      <div className="row quicklinks-list">
        {reactGlobals.role.toLocaleLowerCase() == "ao" || reactGlobals.role.toLocaleLowerCase() == "am" ?
          <div className="col-sm-4"> <NavLink exact to='/contactbilling'> 
              <img className="icon" src="../assets/images/email.png" alt="Email Icon" />
              <h3 className="a-subhead-md a-caret-right">{profiletiles.changeEmailAddressTitle}</h3>
              <p>{profiletiles.changeEmailAddressInfo} </p> </NavLink>
          </div> : ''}
         {reactGlobals.role.toLocaleLowerCase() == "ao" ? <div className="col-sm-4">
          <img className="icon" src="../assets/images/account-managers.png" alt="Account Managrs Icon" />
          <h3 className="a-subhead-md a-caret-right">Assign account managers</h3>
          <p>Assign Account Managers to let others access and make changes </p>
        </div> : ''}
        {reactGlobals.role.toLocaleLowerCase() == "ao" || reactGlobals.role.toLocaleLowerCase() == "am" ? <div className="col-sm-4">
          <NavLink exact to='/security/password'>
          <img className="icon" src="../assets/images/change-password.png" alt="Change Password Icon" />
          <h3 className="a-subhead-md a-caret-right">Change password</h3>
          <p>Pick a password to use with your Verizon login. </p> </NavLink>
        </div> : ''}
        {reactGlobals.role.toLocaleLowerCase() == "ao" ? <div className="col-sm-4">
          <img className="icon" src="../assets/images/billing-address.png" alt="Billing Address Icon" />
          <h3 className="a-subhead-md a-caret-right">Change billing address</h3>
          <p>Let us know where to send your bill. </p>
        </div> : ''}
        {reactGlobals.role.toLocaleLowerCase() == "ao" ? <div className="col-sm-4">
          <img className="icon" src="../assets/images/account-pin.png" alt="Account PIN Icon" />
          <h3 className="a-subhead-md a-caret-right">Change account PIN</h3>
          <p>Set a PIN number to verify your identity when calling customer care. </p>
        </div> : ''}
        {reactGlobals.role.toLocaleLowerCase() == "ao" || reactGlobals.role.toLocaleLowerCase() == "am" ? <div className="col-sm-4">
          <img className="icon" src="../assets/images/laptop-controls.png" alt="Privacy Settings Icon" />
          <h3 className="a-subhead-md a-caret-right">Manage privacy settings</h3>
          <p>Specify the kind of information Verizon can collect from you. </p>
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
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TileProfile))
