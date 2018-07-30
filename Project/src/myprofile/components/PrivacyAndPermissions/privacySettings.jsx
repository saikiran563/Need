import React, { Component } from 'react'
import InputField from '../FormElements/InputComponent'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { join } from 'path';

class PrivacySettings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            privacySettings: this.props.privacySettingsInfo,
        }
    }


    handleOnEditCancel = (type) => {
        this.setState({
            privacySettings: this.props.privacySettingsInfo
        });
        this.props.handleEditCancel(type);
    }

    render() {
        const { privacySettings } = this.state;
        const { privacySettingsInfo, showPrivacyEdit, privacySettingsEditMode, userEditMode } = this.props;

        const privacydata= this.props.privacyDetails.privacySettingsInfo;

        const editableClassName = userEditMode ? "description_box--edit-view" : "description_box_disabled";
        let radiocunt1= 0;
        let radiocunt2= 1;
        return (
            <div className="aMyProfile__privacy">
                <div className={`row description_box ${editableClassName}`}>
                    <div className="col-xs-12 col-sm-4 description_box__header">
                        <h4 tabIndex="0">Privacy Settings</h4>
                        <p>Specify the kind of information Verizon can collect from you.</p>
                    </div>



                    <div className="col-xs-12 col-sm-8 description_box__large-container">
                        <div className="row">

                            <div className="col-xs-12 col-sm-10 description_box__details">
                                {
                                    !(!showPrivacyEdit && userEditMode) && <div className="description_box__read">

                                        <p>{privacydata.read}</p>

                                    </div>
                                }
                                {
                                    !showPrivacyEdit && userEditMode &&


                                    <div>
                                        <p>Your privacy is an important priority at Verizon Wireless. Our Privacy Policy informs you about information we collect and how we use it. Read our Privacy Policy.</p>

                                        <h3 className="details__title">Customer Proprietary Network Information Settings</h3>

                                        <p>Verizon shares customer information within our family of companies for a variety of purposes, including, for example, providing you with the latest information about our products and services and offering you our latest promotions. You can limit the sharing of certain types of customer information, known as Customer Proprietary Network Information, or CPNI, within the Verizon family of companies for marketing services to you different from your current services.</p>

                                        <p>Customer Proprietary Network Information (CPNI) is information that relates to the type, quantity, destination, technical configuration, location, amount of use and related billing information of your telecommunications or interconnected Voice over Internet Protocol (VoIP) services. Federal law governs our use and sharing of CPNI.</p>

                                        <div className="radio_table">
                                            <div className="row">
                                                <div className="col-xs-6 radio_table__header"><h4 className="details__title">Do you want to share your CPNI?</h4></div>
                                                <div className="col-xs-3"><p className="radio_table__share">Share</p></div>
                                                <div className="col-xs-3"><p className="radio_table__share">Don’t share</p></div>
                                            </div>
                                            {privacydata.phonenumbers && privacydata.phonenumbers.map(function(i,j){
                                          
                                            return (<div className="row">
                                                <div className="col-xs-6 radio_table__header">{i}</div>
                                                <div className="col-xs-3">
                                                    <span className="a-hidden" id="share-cpni-share-0-label">Share</span>
                                                    <input aria-labelledby="share-cpni-share-0-label" id={"radio"+(radiocunt1+1)} type="radio" name={"radio"+j} value="true" />
                                                </div>
                                                <div className="col-xs-3">
                                                    <span className="a-hidden" id="share-cpni-dontshare-0-label">Don't Share</span>
                                                    <input aria-labelledby="share-cpni-dontshare-0-label" id={"radio"+(radiocunt2+2)} type="radio" name={"radio"+j} value="false" defaultChecked />
                                                </div>
                                            </div>)
                                            }
                                        )
                                            }
                                            {/* <div className="row">
                                                <div className="col-xs-6 radio_table__header">xxx.xxx.xxxx</div>
                                                <div className="col-xs-3">
                                                    <span className="a-hidden" id="share-cpni-share-1-label">Share</span>
                                                    <input aria-labelledby="share-cpni-share-1-label" id="radio2" type="radio" name="radio2" value="true" />
                                                </div>
                                                <div className="col-xs-3">
                                                    <span className="a-hidden" id="share-cpni-dontshare-1-label">Don't Share</span>
                                                    <input aria-labelledby="share-cpni-dontshare-1-label" id="radio3" type="radio" name="radio2" value="false" defaultChecked />
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-xs-6 radio_table__header">xxx.xxx.xxxx</div>
                                                <div className="col-xs-3">
                                                    <span className="a-hidden" id="share-cpni-share-2-label">Share</span>
                                                    <input aria-labelledby="share-cpni-share-2-label" id="radio4" type="radio" name="radio3" value="true" />
                                                </div>
                                                <div className="col-xs-3">
                                                    <span className="a-hidden" id="share-cpni-dontshare-2-label">Don't Share</span>
                                                    <input aria-labelledby="share-cpni-dontshare-2-label" id="radio5" type="radio" name="radio3" value="false" defaultChecked />
                                                </div>
                                            </div> */}
                                        </div>

                                        <h3 className="details__title">Business & Marketing Insights</h3>

                                        <p>The Business and Marketing Insights program combines and analyzes customer information in a way that does not identify you personally. The program uses information about how you use your mobile device including web addresses of sites you visit and similar information about apps and features you use, and information about the location of your device, as well as certain information about your Verizon products and services (such as device type) and information we obtain from other companies (such as gender, age range, and interests) or that you provide. We may use information provided by business and marketing clients who want us to develop aggregate insights about their own customers.</p>

                                        <p>Business and Marketing Insights may be used by Verizon and others who want to better understand customer actions in aggregate. For example, a company could find it valuable to understand the number of customers in different age groups who visited a website, used an app, or visited a retail store or stadium.</p>

                                        <p>Verizon may share location information that does not identify you personally with certain other companies to allow them to produce limited business and marketing insights. For example, de-identified location information we provide could be combined with similar information provided by other wireless carriers to create traffic reports.</p>

                                        <p>See our Frequently Asked Questions for more information.</p>

                                        <p>You have a choice about whether your information is used in the Business and Marketing Insights program.</p>




                                        <div className="radio_table">
                                            <div className="row">
                                                <div className="col-xs-6 radio_table__header"><h4 className="details__title">May we use your information for Business and Marketing Insights?</h4></div>
                                                <div className="col-xs-3"><p className="radio_table__share">Use</p></div>
                                                <div className="col-xs-3"><p className="radio_table__share">Don’t use</p></div>                         
                                            </div>
                                            <div className="row">
                                                <div className="col-xs-6 radio_table__header">xxx.xxx.xxxx</div>
                                                <div className="col-xs-3">
                                                    <span className="a-hidden" id="share-insight-use-0-label">Use</span>
                                                    <input aria-labelledby="share-insight-use-0-label" id="radio6" type="radio" name="radio4" value="true" />
                                                </div>
                                                <div className="col-xs-3">
                                                    <span className="a-hidden" id="share-insight-dontuse-0-label">Don't Use</span>
                                                    <input aria-labelledby="share-insight-dontuse-0-label" id="radio7" type="radio" name="radio4" value="false" defaultChecked />
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-xs-6 radio_table__header">xxx.xxx.xxxx</div>
                                                <div className="col-xs-3">
                                                    <span className="a-hidden" id="share-insight-use-1-label">Use</span>
                                                    <input aria-labelledby="share-insight-use-1-label" id="radio8" type="radio" name="radio5" value="true" />
                                                </div>
                                                <div className="col-xs-3">
                                                    <span className="a-hidden" id="share-insight-dontuse-1-label">Don't Use</span>
                                                    <input aria-labelledby="share-insight-dontuse-1-label" id="radio9" type="radio" name="radio5" value="false" defaultChecked />
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-xs-6 radio_table__header">xxx.xxx.xxxx</div>
                                                <div className="col-xs-3">
                                                    <span className="a-hidden" id="share-insight-use-2-label">Use</span>
                                                    <input aria-labelledby="share-insight-use-2-label" id="radio10" type="radio" name="radio6" value="true" />
                                                </div>
                                                <div className="col-xs-3">
                                                    <span className="a-hidden" id="share-insight-dontuse-2-label">Don't Use</span>
                                                    <input aria-labelledby="share-insight-dontuse-2-label" id="radio11" type="radio" name="radio6" value="false" defaultChecked />
                                                </div>
                                            </div>
                                        </div>


                                        <h3 className="details__title">Relevant Mobile Advertising</h3>

                                        <p>Verizon's Relevant Mobile Advertising program helps make the ads you see more interesting and useful. This program shares information with Oath (formed by the combination of AOL and Yahoo).</p>

                                        <p>The Relevant Mobile Advertising program uses your postal and email addresses, certain information about your Verizon products and services (such as device type), and information that you provide or we get from other companies (such as gender, age range, and interests). This information may be combined with information collected by Oath advertising services on devices you use to access Oath services and visit third-party websites and apps that include Oath advertising services (such as web browsing, app usage, and location), as well as information that we obtain from third-party partners and advertisers.</p>

                                        <p>We do not share information that identifies you personally in this program outside of Verizon other than with vendors and partners who do work for us. We require that these vendors and partners protect the information and use it only for the services they are providing us.</p>

                                        <p>The program uses online and device identifiers, including browser cookies, ad IDs from Apple and Google, and one created by Verizon, known as a Unique Identifier Header or UIDH. Unless you opt out of the Relevant Mobile Advertising program and have not opted in to the separate Verizon Selects program, a UIDH will be included in the address information of internet requests going to Verizon companies (including Oath) and to a small number of partners to help deliver services unrelated to advertising. Verizon partners are authorized to use the Verizon identifier only as part of Verizon and Oath services. More information is available about the Relevant Mobile Advertising program and the UIDH.</p>

                                        <p>You have a choice about whether to participate. If you opt out of Relevant Mobile Advertising and you have not joined the Verizon Selects program, Verizon will stop including a UIDH in traffic coming from your device. The UIDH will still appear for a short period of time after you opt out. If you are a member of Verizon Selects, the UIDH will still be present even if you opt out of Relevant Mobile Advertising.</p>

                                        <p>You also have choices about how Oath uses information for advertising purposes.</p>



                                        <div className="radio_table">
                                            <div className="row">
                                                <div className="col-xs-6 radio_table__header"><h4 className="details__title">Do you want to participate in Relevant Mobile Advertising?</h4></div>
                                                <div className="col-xs-3"><p className="radio_table__share">Participate</p></div>
                                                <div className="col-xs-3"><p className="radio_table__share">Don’t participate</p></div>
                                            </div>
                                            <div className="row">
                                                <div className="col-xs-6 radio_table__header">xxx.xxx.xxxx</div>
                                                <div className="col-xs-3">
                                                    <span className="a-hidden" id="ad-yes-0-label">Participate</span>
                                                    <input aria-labelledby="ad-yes-0-label" id="radio12" type="radio" name="radio7" value="true" />
                                                </div>
                                                <div className="col-xs-3">
                                                    <span className="a-hidden" id="ad-no-0-label">Don't Participate</span>
                                                    <input aria-labelledby="ad-no-0-label" id="radio13" type="radio" name="radio7" value="false" defaultChecked />
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-xs-6 radio_table__header">xxx.xxx.xxxx</div>
                                                <div className="col-xs-3">
                                                    <span className="a-hidden" id="ad-yes-1-label">Participate</span>
                                                    <input aria-labelledby="ad-yes-1-label" id="radio14" type="radio" name="radio8" value="true" />
                                                </div>
                                                <div className="col-xs-3">
                                                    <span className="a-hidden" id="ad-no-1-label">Don't Participate</span>
                                                    <input aria-labelledby="ad-no-1-label" id="radio15" type="radio" name="radio8" value="false" defaultChecked />
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-xs-6 radio_table__header">xxx.xxx.xxxx</div>
                                                <div className="col-xs-3">
                                                    <span className="a-hidden" id="ad-yes-2-label">Participate</span>
                                                    <input aria-labelledby="ad-yes-2-label" id="radio16" type="radio" name="radio9" value="true" />
                                                </div>
                                                <div className="col-xs-3">
                                                    <span className="a-hidden" id="ad-no-2-label">Don't Participate</span>
                                                    <input aria-labelledby="ad-no-2-label" id="radio17" type="radio" name="radio9" value="false" defaultChecked />
                                                </div>
                                            </div>
                                        </div>


                                    </div>


                                }
                            </div>
                            {
                                showPrivacyEdit && <div className="description_box__edit description_box__edit_section">
                                    <a className="btn btn-anchor" onClick={() => this.props.handleEditCancel('privacysettingsblock')} role="button">Edit</a>
                                </div>
                            }
                
           
                  {
                        !showPrivacyEdit && userEditMode && <div className="row description_box__control-btn">
                            <button className="btn btn--round-invert" role="button" onClick={() => this.handleOnEditCancel('cancelBlock')}>Cancel</button>
                            <button className="btn btn--round" >Save Changes</button>
                        </div>
                    }
                    </div>
 </div>
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

})
export default connect(mapStateToProps, mapDispatchToProps)(PrivacySettings)
