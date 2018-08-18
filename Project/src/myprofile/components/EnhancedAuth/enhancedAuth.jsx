import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, NavLink, withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux'
import * as actions from './actions'
import Spinner from "../Spinner/Spinner";
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
            verifyEmailClicked: false,
            radioClicked:false,
            enauthSaved: false
        }
    }

    selectRadio = (e) => {
        this.setState({radioClicked:true})
        let selectedRadio = document.querySelectorAll('.enhanced-auth .radio_table input:checked')[0].value;
       
        this.setState({ radioselected: document.querySelectorAll('.enhanced-auth .radio_table input:checked')[0].value });
    }

    verifyModal = (e) => {
        this.setState({
            modalStatus: true,
        })
        if (!this.props.enhancedAuthFlag.verifyemail) {
            let enauth = this.props.enhancedAuthFlag.enhancedEdit;
            let flag = "1"
            this.props.actions.verifyEmail(flag, enauth.email, enauth.mdn, enauth.mdn_is_capable, enauth.cust_id, enauth.acct_num, enauth.user_id, enauth.role);
        }
        else {
            this.setState({
                modalStatus: false,
            })
            this.props.actions.fetchEnhAuthEdit();
            // this.props.actions.fetchEnhAuthEdit();
        }
    }

    reverifyModal = () => {
        this.setState({
            modalStatus: true,
        })
        let enauth = this.props.enhancedAuthFlag.enhancedEdit;
        let flag = "1"
        this.props.actions.verifyEmail(flag, enauth.email, enauth.mdn, enauth.mdn_is_capable, enauth.cust_id, enauth.acct_num, enauth.user_id, enauth.role);  
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
        this.props.actions.setEnhancedAuth(flag, enauth.email, enauth.mdn, enauth.email_is_verified, enauth.mdn_is_capable, enauth.cust_id, enauth.acct_num, enauth.user_id, enauth.role);
       this.props.handleSave("enhancedForm", "", event);
        this.setState({radioClicked:false})
    }
updateRadio=() => {
    if (!this.props.showEnhancedAuthEdit && this.props.enAuthEditMode && document.querySelectorAll('.enhanced-auth .radio_table input').length) {
        this.props.enhancedAuthFlag.enhancedEdit && this.props.enhancedAuthFlag.enhancedEdit.two_factor_flag != '0' ?
            document.querySelectorAll('.enhanced-auth .radio_table input')[0].checked = true :
            document.querySelectorAll('.enhanced-auth .radio_table input')[1].checked = true;
        // this.setState({radioselected:document.querySelectorAll('.enhanced-auth .radio_table input:checked')[0].value});
    }
}

    componentWillReceiveProps(nextProps) {
  let that = this;
        document.querySelectorAll('.enhanced-auth .radio_table input').length==0 ?
        
        setTimeout(function(){
            that.updateRadio()},200)     :that.updateRadio();

    }

    componentWillUpdate(prevProps) {
        if(prevProps.enhancedAuthData != this.props.enhancedAuthData){
            return this.setState({
                enauthSaved: true
            })
        }
    }

    componentDidMount() {
        let that = this;
        
        document.querySelectorAll('.enhanced-auth .radio_table input').length==0 ?
        
        setTimeout(function(){
            that.updateRadio()},200)     :that.updateRadio();
    
        }
    mobileNumberFormat = (s) => {
        var s2 = ("" + s).replace(/\D/g, '');
        var m = s2.match(/^(\d{3})(\d{3})(\d{4})$/);
        return (!m) ? null : m[1] + "-" + m[2] + "-" + m[3];
    }

    render() {
        // console.log(this.props)
        const { passwordEditMode, showUserEdit, userEditMode, enAuthEditMode, accountPinEditMode, questionEditMode, showEnhancedAuthEdit, enhancedAuthData } = this.props;
        let enauth = this.props.enhancedAuthFlag.enhancedEdit;
        let enauthview = this.props.twoFactor;
        let radioButtonselect = this.state.radioselected == '1';

        let initialEmail = this.props.enhancedAuthFlag.enhancedEdit ? this.props.enhancedAuthFlag.enhancedEdit.email : "";
        // let newEmail = "VZW@VZW.COM";
        let newEmail ;
        let disableflag = true;
        initialEmail!=newEmail && (newEmail=initialEmail, disableflag=false);
        
        
        const editableClassName = enAuthEditMode ? "description_box--edit-view" : "description_box_disabled";
        return (


            <div className={`aMyProfile__privacy row enhanced_auth description_box ${editableClassName}   ${!showEnhancedAuthEdit && enAuthEditMode && 'enhanced_edit'}`} >
                <div className="col-xs-12 col-sm-4 description_box__header">
                    <h4>Enhanced authentication </h4>
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
                                   <div className="row"> <p className="col-xs-3">Protect your account with another level of security. when enabled, the account, and all users will be protected by two-factor authentication (a one-time code sent to your phone) each time the user signs in to My Verizon or calls Verizon</p> 
                                   <p className="col-xs-3">Please note that if you are unable to receive this one-time code or forget your Account PIN, you will need to visit a Verizon Wireless store with valid ID. To disable this feature, sign in to My Verizon and change the setting on the Profile page.</p> </div>
                                    {((((!showEnhancedAuthEdit && enAuthEditMode))
                                      && enauth && ((enauth.email_is_verified == 'Y' && enauth.mdn_is_capable == 'Y') || this.state.radioselected != "1"))) &&
                                        (
                                            <div className="enhancedauth">
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
                                                            <input aria-labelledby="share-insight-use-0-label" id="radio6" type="radio" value="1" name="radio4"  onChange={this.selectRadio} onClick= {this.selectRadio} />
                                                        </div>
                                                        <div className="col-xs-3">
                                                            <span className="a-hidden" id="share-insight-dontuse-0-label">Don't Use</span>
                                                            <input aria-labelledby="share-insight-dontuse-0-label" id="radio7" type="radio" value="0" name="radio4" onChange={this.selectRadio} onClick= {this.selectRadio} />
                                                        </div>
                                                    </div>
                                                </div>
                                                </div>
                                            </div>)
                                    }

                                    {/* Case 1: Both Email and Mobile Verified */}
                                    {((enauth && enauth.two_factor_flag == '1' || radioButtonselect && enauth.email_is_verified == 'Y' && enauth.mdn_is_capable == 'Y')) &&

                                        <div className="row">
                                            {(this.state.radioselected != "0"||(enauth && enauth.two_factor_flag == '1' && !this.state.radioClicked)) && <div className="userbio">
                                                {enauth.two_factor_flag == '1' || enauth.two_factor_flag == '0'  && <div> <p className="col-xs-6" style={{ marginBottom: 25, marginTop: -10 }}>When logging in or calling customer care you will be able to choose from the following options to verify your identity</p> </div>}
                             
                                                <div className="col-xs-6 radio_table__header ">Email</div> <div className="col-xs-3 email"> <p>{enauth.email}</p> </div>
                                                <div className='col-xs-3 edit'> <p><a href='#/contactbilling/email' className="btn btn-anchor" role="button" tabIndex="0">Edit</a></p> </div>
                                                <div className="col-xs-6 radio_table__header textmessage">Text Message</div> <div className="col-xs-3"> <p>{this.mobileNumberFormat(enauth.mdn)}</p> </div>
                                               
                                                {/* <div className="col-xs-6 radio_table__header">Mobile Notification</div> <div className="col-xs-3"> <p>xxx-xxx-4023</p> </div>  */}

                                            </div>}

                                            <div className="footer col-xs-12">
                                                <a className="btn btn--round-invert" role="button" onClick={() => this.props.handleEditCancel('cancelblock')}>Cancel</a>
                                                <button className="btn btn--round" disabled={disableflag && this.props.enhancedAuthFlag.enhancedEdit.two_factor_flag=='1' && this.state.radioselected != "0"} onClick={this.handleSave}>Save Changes</button>
                                            </div>
                                        </div>}


                                    {/* Case 2: Both Email and Mobile Not Verified */}
                                    {(
                                        (radioButtonselect && enauth.two_factor_flag == '0' && enauth.mdn_is_capable == 'N' && enauth.email_is_verified == 'N')) &&
                                        (
                                            <div>
                                                   {this.props.enhancedAuthFlag.verifyemail && this.props.enhancedAuthFlag.isFetching ?<Spinner/> :
                                                <EmailVerificationNeeded emailAddress={enauth.email} verifyEmailClicked={this.state.verifyEmailClicked} verifyModal={this.verifyModal} reverifyModal={this.reverifyModal} handleEditCancel={this.props.handleEditCancel} />
                                                   }
                                                <div className="row"> <hr /> </div>
                                                <PhoneVerificationNeeded mobileNumber={this.mobileNumberFormat(enauth.mdn)} handleEditCancel={this.props.handleEditCancel} />
                                                <Modal
                                                    modalStatus={this.state.modalStatus}
                                                    closeModal={this.closeModal}
                                                    tagId="enhancedauth_verifyemail">
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
                                        (radioButtonselect && this.props.enhancedAuthFlag.enhancedEdit.email_is_verified == 'Y' && this.props.enhancedAuthFlag.enhancedEdit.mdn_is_capable == 'N')) &&
                                        (
                                            <PhoneVerificationNeeded mobileNumber={this.mobileNumberFormat(enauth.mdn)} handleEditCancel={this.props.handleEditCancel} />
                                        )}


                                    {/* Case 4: Email NotVerified and Mobile Verified */}
                                    {(
                                        (radioButtonselect && this.props.enhancedAuthFlag.enhancedEdit.email_is_verified == 'N' && this.props.enhancedAuthFlag.enhancedEdit.mdn_is_capable == 'Y')) &&
                                        (
                                            <div>
                                                
                                                             {this.props.enhancedAuthFlag.verifyemail && this.props.enhancedAuthFlag.isFetching ?<Spinner/> :
                                                <EmailVerificationNeeded emailAddress={enauth.email} verifyEmailClicked={this.state.verifyEmailClicked} verifyModal={this.verifyModal} reverifyModal={this.reverifyModal} handleEditCancel={this.props.handleEditCancel}/>
                                                
                                                }
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
                        <a className="btn btn-anchor" role="button" onClick={() => this.props.handleEditCancel('enhancedauthblock')} tabIndex="0">Edit</a>
                        </div>}

                        {
                            this.state.enauthSaved && this.props.enhancedSaved && <span className="text-success fa fa-check-circle col-xs-12 section-saved"> Saved </span>
                        }

                    </div>
                </div>
            </div>


        )
    }
}

const mapStateToProps = state => {
    // console.log(state);
    return {
        isFetching: state.enhancedAuth.isFetching,
        twoFactorAuth: state.enhancedAuth.enhancedEdit,
        enhancedAuthData: state.enhancedAuth.setenhancedAuth,
        enhancedAuthFlag: state.enhancedAuth,
        twoFactor: state.security.metaData,
        enhancedError: state.enhancedAuth.enhancedautherror, 
    }
}

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actions, dispatch),
})


export default connect(mapStateToProps, mapDispatchToProps)(EnhancedAuth)  
