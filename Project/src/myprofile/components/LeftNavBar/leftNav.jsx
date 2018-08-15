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
        let acctHolder = reactGlobals.mdnRole.toLocaleLowerCase() == "accountholder";

        let acctManager = reactGlobals.mdnRole.toLocaleLowerCase() == "accountmanager";

        let acctMember = reactGlobals.mdnRole.toLocaleLowerCase() == "mobilesecure";

        let leftnav = this.props.leftNavBar;
        return (


            <div className="leftcontent_wrapper">
                <span className="title title--xlg visible-xs visible-sm">My Profile</span>

                <div className="hidden-scrollbar">

                    <ul className="menu-myprofile" role="menu">
                        <li className="page page__title" analyticstrack="leftnavqs">
                            <NavLink exact to='/'>Quick links</NavLink>
                        </li>
                        <li className={`page page__title ${this.props.location.pathname.indexOf("security") > -1 ? "main-active" : ''}`} analyticstrack="leftnavsecurity">
                            <NavLink exact to='/security'>Security</NavLink>
                        </li>
                        <li className="" analyticstrack="leftnavuserid">
                            <NavLink exact to='/security/userid'>User ID</NavLink>
                        </li>
                        <li className=" " analyticstrack="leftnavpassword">
                            <NavLink exact to='/security/password'>Password</NavLink>
                        </li>
                        {(acctHolder || acctManager) && <li className=" " analyticstrack="leftnavacctpin">
                            <NavLink exact to='/security/accountPin'>Account PIN</NavLink>
                        </li>}
                        <li className=" " analyticstrack="leftnavsecretque">
                            <NavLink exact to='/security/question'>Secret question</NavLink>
                        </li>
                        <li className=" ">
                            <a href="/my-profile-desktop-security.html?section=securityImgS&page=ss">Security image</a>
                        </li>
                        {acctHolder && <li className=" ">
                            <NavLink exact to='/security/enhancedauth'>Enhanced authentication</NavLink>
                        </li>}


                        <li className={`page page__title ${this.props.location.pathname.indexOf("contactbilling") > -1 ? "main-active" : ''}`} analyticstrack="leftnavcontactbilling">
                            <NavLink exact to='/contactbilling'>Contact & Billing</NavLink>
                        </li>
                        <li className=" " analyticstrack="leftnavemail">
                            <NavLink exact to='/contactbilling/email'>Email address</NavLink>
                        </li>


                        <li analyticstrack="leftnavprimaryphone">
                            <NavLink exact to='/contactbilling/primaryPhone'>Contact numbers</NavLink>
                        </li>
                        {(acctHolder || acctManager) && <li analyticstrack="leftnavbillingaddress">
                            <NavLink exact to='/contactbilling/billingAddress'>Billing address</NavLink>
                        </li>}
                        {(acctHolder || acctManager) && <li analyticstrack="leftnavserviceaddress">
                             <NavLink exact to='/contactbilling/serviceAddress'>Service addresses</NavLink>
                        </li>}


                        <li className={`page page__title ${this.props.location.pathname.indexOf("manage") > -1 ? "main-active" : ''}`} analyticstrack="leftnavmanageacct">
                            <NavLink exact to='/manage'>Manage Account</NavLink>
                        </li>
                        <li className=" " analyticstrack="leftnavacctmanager">
                            <NavLink exact to="/manage/accountmanager">Account managers</NavLink>
                        </li>
                        <li className=" " analyticstrack="leftnavgreetingname">
                            <NavLink exact to="/manage/greetingname">Greeting name</NavLink>
                        </li>
                        <li className=" " analyticstrack="leftnavtransferservice">
                            <NavLink exact to="/manage/transferofservice">Transfer of service</NavLink>
                        </li>


                        <li className={`page page__title ${this.props.location.pathname.indexOf("privacypermissions") > -1 ? "main-active" : ''}`} analyticstrack="leftnavprivacypermissions">
                            <NavLink exact to='/privacypermissions'>Privacy & Permissions</NavLink>
                        </li>
                        <li className="" analyticstrack="leftnavprivacysettings">
                            <NavLink exact to='/privacypermissions/privacysettings'>Privacy settings</NavLink>
                        </li>
                        <li className=" " analyticstrack="leftnavverizonselects">
                            <NavLink exact to='/privacypermissions/verizonselects'>Verizon selects preferences</NavLink>
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
