import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, NavLink, withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux'
import * as actions from './actions'
import './style.css'

class EnhancedAuth extends Component {
    constructor(props) {
        super(props)

        this.selectRadio=this.selectRadio.bind(this);
    }

   selectRadio(e){
  let selectedRadio= document.querySelectorAll('.enhanced-auth .radio_table input:checked')[0].value;
  selectedRadio =='Y' && this.props.actions.setEnhancedAuth();
    }
    componentDidMount() {
        if (!this.props.showEnhancedAuthEdit && this.props.enAuthEditMode) {
             this.props.twoFactorAuth.twoFactorFlag == 'Y' ?
                document.querySelectorAll('.enhanced-auth .radio_table input')[0].checked = true :
                 document.querySelectorAll('.enhanced-auth .radio_table input')[1].checked = true;
            //document.querySelectorAll('.enhanced-auth .radio_table input:checked')[0].value;
        }

        // if (document.querySelectorAll('.enhanced-auth .radio_table input:checked')[0].value == 'Y') {
        //     this.setState ({ twoFactorEn: true });
        //     console.log("Hi");
        // }
        // if (document.querySelectorAll('.enhanced-auth .radio_table input:checked')[0].value == 'N') {
        //     this.setState ({ twoFactorDb: true });
        //     console.log("Bye");
        // }
    }
    render() {
        
        const { passwordEditMode, showUserEdit, userEditMode, enAuthEditMode, accountPinEditMode, questionEditMode, showEnhancedAuthEdit, enhancedAuthData } = this.props;
        let enauth = this.props.twoFactorAuth;
        // let radioButtonselect= (enauth.twoFactorFlag == 'Y');
        // let radioButtonselectN= (enauth.twoFactorFlag == 'N');
        let hideRadioPanel= this.props.enhancedAuthFlag.setEnhancedloaded?( (this.props.enhancedAuthFlag.setEnhancedloaded) && 
        (this.props.enhancedAuthFlag.setenhancedAuth.data.data.isMdnCapable!='N'  || this.props.enhancedAuthFlag.setenhancedAuth.data.data.isEmailVerified!='N' ) &&
        (this.props.enhancedAuthFlag.setenhancedAuth.data.data.twoFactorFlag=='Y') ):true;

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
                                {enauth.twoFactorFlag == 'Y' ? <p>On</p> : <p>Off</p>}
                            </div>}
                            {!showEnhancedAuthEdit && enAuthEditMode &&
                                <div className="description_box__edit description_box__edit_section">
                                    <a className="btn btn-anchor" onClick={() => this.props.handleEditCancel('cancelblock')} role="button">Cancel</a>
                                </div>
                            }
                            {
                                !showEnhancedAuthEdit && enAuthEditMode &&
                                <div>
                                     <p>Enhanced Authentication Keeps your account protected when you log in to My Verizon or call Customer Care by requiring you to conifrm your identity via your mobile device.</p>
                                {( ( !showEnhancedAuthEdit && enAuthEditMode && hideRadioPanel) || (  hideRadioPanel && (this.props.enhancedAuthFlag.setEnhancedloaded) && 
                                 (this.props.enhancedAuthFlag.setenhancedAuth.data.data.isMdnCapable!='N'  || this.props.enhancedAuthFlag.setenhancedAuth.data.data.isEmailVerified!='N' ) &&
                                 (this.props.enhancedAuthFlag.setenhancedAuth.data.data.twoFactorFlag=='Y') )) && 
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
                                                <input aria-labelledby="share-insight-use-0-label" id="radio6" type="radio" value="Y" name="radio4" onChange={this.selectRadio} />
                                            </div>
                                            <div className="col-xs-3">
                                                <span className="a-hidden" id="share-insight-dontuse-0-label">Don't Use</span>
                                                <input aria-labelledby="share-insight-dontuse-0-label" id="radio7" type="radio" value="N" name="radio4"  onChange={this.selectRadio}  />
                                            </div>
                                        </div>
                            </div> 

                            { enauth.twoFactorFlag == 'Y' && <div> <p>When logging in or calling customer care you will be able to choose from the following options to verify your identity</p> </div> } </div>
 </div>)
                                }

                             {/* Case 1: Both Email and Mobile Verified */}
                                    {((enauth.twoFactorFlag == 'Y') || (enhancedAuthData && enhancedAuthData.isEmailVerified=='Y' && enhancedAuthData.isMdnCapable=='Y')) && <div className="row"> <div className="col-xs-6 radio_table__header">Email</div> <div className="col-xs-3"> <p>name@domain.com</p> </div>
                                        <div className='col-xs-3'> <p><a href='#/contactbilling/email' className="btn btn-anchor" role="button">Edit</a></p> </div>
                                        <div className="col-xs-6 radio_table__header">Text Message</div> <div className="col-xs-3"> <p>xxx-xxx-4023</p> </div>

                                        <div className="col-xs-6 radio_table__header">Mobile Notification</div> <div className="col-xs-3"> <p>xxx-xxx-4023</p> </div>

                                        <div className="footer col-xs-12">
                                            <a className="btn btn--round-invert" role="button" onClick={() => this.props.handleEditCancel('cancelblock')}>Cancel</a>
                                            <button className="btn btn--round">Save Changes</button>
                                        </div> </div>}


                                         {/* Case 2: Both Email and Mobile Not Verified */}
                                         {( (this.props.enhancedAuthFlag.setEnhancedloaded) && 
                                 (this.props.enhancedAuthFlag.setenhancedAuth.data.data.isMdnCapable=='N'  || this.props.enhancedAuthFlag.setenhancedAuth.data.data.isEmailVerified=='N' ) &&
                                 (this.props.enhancedAuthFlag.setenhancedAuth.data.data.twoFactorFlag=='Y') )&& ( <div> <p> <span className="text-warning"><i className="fa fa-times-circle"></i> </span> You must have have a verified email address to use this feature </p>
                                    <div className="row"> <div className="col-xs-6 radio_table__header">Email</div> <div className="col-xs-3"> <p>name@domain.com</p> </div>
                                        <div className='col-xs-3'> <p><a href='#/contactbilling/email' className="btn btn-anchor" role="button">Edit</a></p> </div>

                                        <div className="footer col-xs-12">
                                            
                                            <button className="btn btn--round">Verify my email</button>
                                        </div> </div> 

                                     <div className="row"> <hr/> </div> 

 <p> <span className="text-warning"><i className="fa fa-times-circle"></i> </span> The Account Owner's device must be to receive text messages in order to use this feature</p>
                               <div className="row">  <div className="col-xs-6 radio_table__header">Text Message</div> <div className="col-xs-3"> <p>xxx-xxx-4023</p> </div>

                                        <div className="footer col-xs-12">
                                            <a className="btn btn--round-invert" role="button" onClick={() => this.props.handleEditCancel('cancelblock')}>Cancel</a>
                                            <button className="btn btn--round">Change Device</button>
                            </div> </div> </div>)}
                                        
                                          

                                </div>
                            }
                        </div>
                        {showEnhancedAuthEdit && <div className="description_box__edit description_box__edit_section">
                            <a className="btn btn-anchor" role="button" onClick={() => this.props.handleEditCancel('enhancedauthblock')}>Edit</a>
                        </div>}

                    </div>
                </div>
            </div>


        )
    }
}

const mapStateToProps = state => {
    return {
        isFetching: state.enhancedAuth.isFetching,
        twoFactorAuth: state.enhancedAuth.enhancedAuth,
        enhancedAuthData: state.enhancedAuth.setenhancedAuth,
        enhancedAuthFlag: state.enhancedAuth,
    }
}

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actions, dispatch),
})


export default connect(mapStateToProps, mapDispatchToProps)(EnhancedAuth)  
