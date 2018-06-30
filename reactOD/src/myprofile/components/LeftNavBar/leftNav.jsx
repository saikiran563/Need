import React, { Component } from 'react'
import { Link, NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from './actions'

class LeftNav extends Component {

constructor(props) {
    super(props);
  }

componentDidMount() {

     this.props.actions.fetchLeftNav();
// this.props.actions.fetchLeftNav();
//  this.props.actions.showDeviceTiles();
}

    render() {
let amRoles = reactGlobals.role.toLocaleLowerCase() == "ao";

let leftnav = this.props.leftNavBar;
        return (


            <div className="leftcontent_wrapper">
                <span className="title title--xlg visible-xs visible-sm">My Profile</span>

                <div className="hidden-scrollbar">

                    <ul className="menu-myprofile" role="menu">
                        <li className="page page__title">
                            <NavLink exact to='/'>{leftnav.quickLinks}</NavLink>
                        </li>
                        <li className="page page__title ">
                            <NavLink exact to='/security'>Security</NavLink>

                        </li>
                        <li className="">
                            <NavLink exact to='/userid'>User ID</NavLink>
                        </li>
                        <li className=" ">
                            <a href="/my-profile-desktop-security.html?section=passwordS&page=ss">Password</a>
                        </li>
                        <li className=" ">
                            <a href="/my-profile-desktop-security.html?section=passwordAccountPinS&page=ss">Account PIN</a>
                        </li>
                        <li className=" ">
                            <a href="/my-profile-desktop-security.html?section=secretQuestionS&page=ss">Secret question</a>
                        </li>
                        <li className=" ">
                            <a href="/my-profile-desktop-security.html?section=securityImgS&page=ss">Security image</a>
                        </li>


                        <li className="page page__title ">
                            <NavLink exact to='/contactbilling'>Contact & Billing</NavLink>
                        </li>
                        <li className=" ">
                            <a href="/my-profile-desktop-contact.html?section=emailAddressCB&page=cb">Email address</a>
                        </li>
                  
                  
                
                        { amRoles && <li >
                            <a href="/my-profile-desktop-contact.html?section=phoneCB&page=cb">Primary phone</a>
                        </li>}
                        { amRoles && <li >
                            <a href="/my-profile-desktop-contact.html?section=billingAddressCB&page=cb">Billing address</a>
                        </li>}
                        { amRoles && <li>
                            <a href="/my-profile-desktop-contact.html?section=serviceAddressCB&page=cb">Service addresses</a>
                        </li>     }


                        <li className="page page__title ">
                            <NavLink exact to='/#'>Manage account</NavLink>


                        </li>
                        <li className=" ">
                            <a href="/my-profile-desktop-manage.html?section=accountMA&page=ma">Account manager</a>
                        </li>
                        <li className=" ">
                            <a href="/my-profile-desktop-manage.html?section=greetingNameMA&page=ma" >Greeting name</a>
                        </li>
                        <li className="activeSection == 'accountT' ? 'page__active' : ''">
                            <a href="/my-profile-desktop-manage.html?section=accountT&page=ma">Transfer Service</a>
                        </li>
                        <li className="page page__title ">
                            <NavLink exact to='/privacypermissions'>Privacy & Permissions</NavLink>


                        </li>
                        <li className="">
                            <a href="/my-profile-desktop-privacy.html?section=privacySettingsP&page=pp" >Privacy settings</a>
                        </li>
                        <li className=" ">
                            <a href="/my-profile-desktop-privacy.html?section=verizonPreP&page=pp" >Verizon Selects Preferences</a>
                        </li>
                    </ul>
                </div>
            </div>

        )



    }
}

const mapStateToProps = state => {
  return {
    isFetching: state.leftNav.isFetching,
     leftNavBar: state.leftNav.leftNav,
  }
}

const mapDispatchToProps = dispatch => ({
actions: bindActionCreators(actions, dispatch),
})
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LeftNav));
