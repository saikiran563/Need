import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, NavLink, withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux'
import * as actions from './actions'

import Modal from '../Modal/modal'
import PhoneVerificationNeeded from "./views/PhoneVerificationNeeded";
import EmailVerificationNeeded from "./views/EmailVerificationNeeded"

import './style.css'

class EnhancedAuth extends Component {
    constructor(props) {
        super(props)
        this.state = {
            modalStatus: false,
            radioselected: '',
            verifyEmailClicked: false
        }
    }

    selectRadio = (e) => {
        let selectedRadio = document.querySelectorAll('.enhanced-auth .radio_table input:checked')[0].value;
       
        this.setState({ radioselected: document.querySelectorAll('.enhanced-auth .radio_table input:checked')[0].value });
    }

    verifyModal = (e) => {
        this.setState({
            modalStatus: true,
        })
        if (!this.props.enhancedAuthFlag.verifyemail) {
            let enauth = this.props.enhancedAuthFlag.enhancedEdit;
            this.props.actions.verifyEmail(enauth.email);
        }
        else {
            this.setState({
                modalStatus: false,
            })
            this.props.actions.fetchEnhAuthEdit();
        }
    }

    reverifyModal = () => {
        this.setState({
            modalStatus: true,
        })
        let enauth = this.props.enhancedAuthFlag.enhancedEdit;
        this.props.actions.verifyEmail(enauth.email);  
    }

    closeModal = () => {
        this.setState({
            modalStatus: false,
            verifyEmailClicked: true
        });
    }

    handleSave = () => {
        let enauth = this.props.enhancedAuthFlag.enhancedEdit;
        let flag = document.querySelectorAll('.enhanced-auth .radio_table input:checked')[0].value;
        this.props.actions.setEnhancedAuth(flag, enauth.email, enauth.mdn);
        this.props.handleSave("enhancedForm", "", event);
    }


    componentWillReceiveProps(nextProps) {

        if (document.querySelectorAll('.enhanced-auth .radio_table input').length) {
            this.props.enhancedAuthFlag.enhancedEdit && this.props.enhancedAuthFlag.enhancedEdit.twoFactorFlag != '0' ?
                document.querySelectorAll('.enhanced-auth .radio_table input')[0].checked = true :
                document.querySelectorAll('.enhanced-auth .radio_table input')[1].checked = true;
            // this.setState({radioselected:document.querySelectorAll('.enhanced-auth .radio_table input:checked')[0].value});
        }

    }

    componentDidMount() {
        console.log(this.props);
        if (!this.props.showEnhancedAuthEdit && this.props.enAuthEditMode) {
            this.props.enhancedAuthFlag.enhancedEdit && this.props.enhancedAuthFlag.enhancedEdit.twoFactorFlag != '0' ?
                document.querySelectorAll('.enhanced-auth .radio_table input')[0].checked = true :
                document.querySelectorAll('.enhanced-auth .radio_table input')[1].checked = true;
            // this.setState({radioselected:document.querySelectorAll('.enhanced-auth .radio_table input:checked')[0].value});
        }



    }
    mobileNumberFormat = (s) => {
        var s2 = ("" + s).replace(/\D/g, '');
        var m = s2.match(/^(\d{3})(\d{3})(\d{4})$/);
        return (!m) ? null : m[1] + "-" + m[2] + "-" + m[3];
    }

    render() {
        const { passwordEditMode, showUserEdit, userEditMode, enAuthEditMode, accountPinEditMode, questionEditMode, showEnhancedAuthEdit, enhancedAuthData } = this.props;
        let enauth = this.props.enhancedAuthFlag.enhancedEdit;
        let enauthview = this.props.twoFactor;
        let radioButtonselect = this.state.radioselected == '1';


        const editableClassName = enAuthEditMode ? "description_box--edit-view" : "description_box_disabled";
        return (



            <div className={`aMyProfile__privacy row enhanced_auth description_box ${editableClassName}   ${!showEnhancedAuthEdit && enAuthEditMode && 'enhanced_edit'}`} >
                <div className="col-xs-12 col-sm-4 description_box__header">
                    <h4 tabIndex="0">Enhanced authentication </h4>
                    <p>Protect your account with added level of security</p>
                </div>

                <div className="col-xs-12 col-sm-8 description_box__large-container">
                    <div className="row">
                        <div className="col-xs-12 description_box__details enhanced-auth">
                            {!(!showEnhancedAuthEdit && enAuthEditMode) && <div className="description_box__read">
                                {enauthview.twoFactorFlag == '1' ? <p>On</p> : <p>Off</p>}
                            </div>}
                            {!showEnhancedAuthEdit && enAuthEditMode &&
                                <div className="description_box__edit description_box__edit_section col-sm-2 description_box__edit description_box__edit_section cancel">
                                    <a className="btn btn-anchor" onClick={() => this.props.handleEditCancel('cancelblock')} role="button">Cancel</a>
                                </div>
                            }

                            {
                                !showEnhancedAuthEdit && enAuthEditMode &&
                                <div>
                                    <p>Enhanced Authentication Keeps your account protected when you log in to My Verizon or call Customer Care by requiring you to conifrm your identity via your mobile device.</p>
                                    {((((!showEnhancedAuthEdit && enAuthEditMode))
                                        && enauth && ((enauth.email_is_verified == '1' && enauth.mdn_is_capable == '1') || this.state.radioselected != "1"))) &&
                                        (
                                            <div>
                                                <div> <div className="radio_table">
                                                    <div className="row">
                                                        <div className="col-xs-6 radio_table__header"></div>
                                                        <div className="col-xs-3"><p className="radio_table__share">On</p></div>
                                                        <div className="col-xs-3"><p className="radio_table__share">Off</p></div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-xs-6 radio_table__header">Require Enhanced Authentication</div>
                                                        <div className="col-xs-3">
                                                            <span className="a-hidden" id="share-insight-use-0-label">Use</span>
                                                            <input aria-labelledby="share-insight-use-0-label" id="radio6" type="radio" value="1" name="radio4" onChange={this.selectRadio} />
                                                        </div>
                                                        <div className="col-xs-3">
                                                            <span className="a-hidden" id="share-insight-dontuse-0-label">Don't Use</span>
                                                            <input aria-labelledby="share-insight-dontuse-0-label" id="radio7" type="radio" value="0" name="radio4" onChange={this.selectRadio} />
                                                        </div>
                                                    </div>
                                                </div>
                                                </div>
                                            </div>)
                                    }

                                    {/* Case 1: Both Email and Mobile Verified */}
                                    {((enauth && enauth.twoFactorFlag == '1' && enauth.email_is_verified == '1' && enauth.mdn_is_capable == '1')) &&

                                        <div className="row">
                                            {(this.state.radioselected != "0") && <div>
                                                {enauth.twoFactorFlag == '1' && <div> <p className="col-xs-6">When logging in or calling customer care you will be able to choose from the following options to verify your identity</p> </div>}

                                                <div className="col-xs-6 radio_table__header">Email</div> <div className="col-xs-3"> <p>{enauth.email}</p> </div>
                                                <div className='col-xs-3'> <p><a href='#/contactbilling/email' className="btn btn-anchor" role="button">Edit</a></p> </div>
                                                <div className="col-xs-6 radio_table__header">Text Message</div> <div className="col-xs-3"> <p>{this.mobileNumberFormat(enauth.mdn)}</p> </div>

                                                {/* <div className="col-xs-6 radio_table__header">Mobile Notification</div> <div className="col-xs-3"> <p>xxx-xxx-4023</p> </div>  */}

                                            </div>}

                                            <div className="footer col-xs-12">
                                                <a className="btn btn--round-invert" role="button" onClick={() => this.props.handleEditCancel('cancelblock')}>Cancel</a>
                                                <button className="btn btn--round" onClick={this.handleSave}>Save Changes</button>
                                            </div>
                                        </div>}


                                    {/* Case 2: Both Email and Mobile Not Verified */}
                                    {(
                                        (radioButtonselect && enauth.twoFactorFlag == '0' && enauth.mdn_is_capable == '0' && enauth.email_is_verified == '0')) &&
                                        (
                                            <div>
                                                <EmailVerificationNeeded emailAddress={enauth.email} verifyEmailClicked={this.state.verifyEmailClicked} verifyModal={this.verifyModal} reverifyModal={this.reverifyModal} />
                                                <div className="row"> <hr /> </div>
                                                <PhoneVerificationNeeded mobileNumber={this.mobileNumberFormat(enauth.mdn)} handleEditCancel={this.props.handleEditCancel} />
                                                <Modal
                                                    modalStatus={this.state.modalStatus}
                                                    closeModal={this.closeModal}>
                                                    <p><strong>Email Verification Sent</strong></p>
                                                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Porro totam quia temporibus magni suscipit laborum natus quo consequatur voluptatibus, voluptas, autem odio. Rem unde optio eligendi repellat fugiat error doloribus.</p>
                                                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Porro totam quia temporibus magni suscipit laborum natus quo consequatur voluptatibus, voluptas, autem odio. Rem unde optio eligendi repellat fugiat error doloribus.</p>
                                                    <div className="footer col-xs-12">
                                                        <button className="btn btn--round" onClick={this.closeModal}>Close</button>
                                                    </div>
                                                </Modal>
                                            </div>
                                        )}


                                    {/* Case 3: Email Verified and Mobile Not Verified */}
                                    {(
                                        (radioButtonselect && this.props.enhancedAuthFlag.enhancedEdit.email_is_verified == '1' && this.props.enhancedAuthFlag.enhancedEdit.mdn_is_capable == '0')) &&
                                        (
                                            <PhoneVerificationNeeded mobileNumber={this.mobileNumberFormat(enauth.mdn)} handleEditCancel={this.props.handleEditCancel} />
                                        )}


                                    {/* Case 4: Email NotVerified and Mobile Verified */}
                                    {(
                                        (radioButtonselect && this.props.enhancedAuthFlag.enhancedEdit.email_is_verified == '0' && this.props.enhancedAuthFlag.enhancedEdit.mdn_is_capable == '1')) &&
                                        (
                                            <div>
                                                <EmailVerificationNeeded emailAddress={enauth.email} verifyEmailClicked={this.state.verifyEmailClicked} verifyModal={this.verifyModal} reverifyModal={this.reverifyModal} />
                                                <Modal
                                                    modalStatus={this.state.modalStatus}
                                                    closeModal={this.closeModal}>
                                                    <p style={{ fontSize: 14 }} ><strong>Email Verification Sent</strong></p>
                                                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Porro totam quia temporibus magni suscipit laborum natus quo consequatur voluptatibus, voluptas, autem odio. Rem unde optio eligendi repellat fugiat error doloribus.</p>
                                                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Porro totam quia temporibus magni suscipit laborum natus quo consequatur voluptatibus, voluptas, autem odio. Rem unde optio eligendi repellat fugiat error doloribus.</p>
                                                    <div className="footer col-xs-12">
                                                        <button className="btn btn--round" onClick={this.closeModal}>Close</button>
                                                    </div>
                                                </Modal>
                                            </div>
                                        )}
                                </div>
                            }
                        </div>
                        {showEnhancedAuthEdit && <div className="description_box__edit description_box__edit_section">
                            <a className="btn btn-anchor" role="button" onClick={() => this.props.handleEditCancel('enhancedauthblock')}>Edit</a>
                        </div>}

                        {
                            this.props.enhancedSaved && <span className="text-success fa fa-check-circle col-xs-12 section-saved"> Saved </span>
                        }

                    </div>
                </div>
            </div>


        )
    }
}

const mapStateToProps = state => {
    return {
        isFetching: state.enhancedAuth.isFetching,
        twoFactorAuth: state.enhancedAuth.enhancedEdit,
        enhancedAuthData: state.enhancedAuth.setenhancedAuth,
        enhancedAuthFlag: state.enhancedAuth,
        twoFactor: state.security.metaData
    }
}

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actions, dispatch),
})


export default connect(mapStateToProps, mapDispatchToProps)(EnhancedAuth)  
