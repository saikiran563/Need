import React from 'react';

const AccessRoles = () => {

        // alert(reactGlobals.deviceLandingUrl.indexOf("ao")>-1);
        return (

            <div className="modal_content">
                <h1 className="title title--lg">Get to know your role.</h1>


                <p>
                    At Verizon, there are three different levels of online access for managing your account online: Account Owner, Account Manager and Account Member. Check out the differences between them below.
            <br aria-hidden="true" />
                    <br aria-hidden="true" />
                    <strong>Account Owners:</strong> In this role, you’re financially responsible for the entire account. You’ll have complete access to all the info, and you can also manage all mobile phones on the account. There can only be one registered Account Owner.
            <br aria-hidden="true" />
                    <br aria-hidden="true" />
                    <strong>Account Managers:</strong> As an Account Manager, you can access account info and manage all lines of service on the account. Your Account Owner can assign up to 3 different Account Managers at a time.
            <br aria-hidden="true" />
                    <br aria-hidden="true" />
                    <strong>Account Members:</strong> If you’re simply a user on your account, you’re considered an Account Member. This means you have access to info and certain functions for your specific line but aren’t able to access sensitive billing information or make plan changes.
        </p>



                <div className="row rol-permissions">
                    <form action="#">
                        <div className="rol-permissions__matrix">
                            <div className="col-xs-12">
                                <div className="row rol-permissions__row">
                                    <div className="col-xs-6">
                                        <strong>Role Access</strong>
                                    </div>
                                    <div className="col-xs-2">
                                        <strong>Owner</strong>
                                    </div>
                                    <div className="col-xs-2">
                                        <strong>Manager</strong>
                                    </div>
                                    <div className="col-xs-2">
                                        <strong>Member</strong>
                                    </div>
                                </div>


                                <div className="row rol-permissions__row">
                                    <div className="col-xs-6">
                                        <p>Assign Account Managers</p>
                                    </div>
                                    <div className="col-xs-2">
                                        <label className="custom-checkbox-gray">
                                            <span className="a-hidden" id="assign-account-managers-owner-label">Owner Toggle</span>
                                            <input type="checkbox" disabled="disabled" checked="checked" name="radio2" aria-labelledby="assign-account-managers-owner-label" />
                                            <span className="checkmark"></span>
                                        </label>
                                    </div>
                                    <div className="col-xs-2">
                                        <label className="custom-checkbox-gray" >
                                            <span className="a-hidden" id="assign-account-managers-manager-label">Manager Toggle</span>
                                            <input type="checkbox" name="radio2" aria-labelledby="assign-account-managers-manager-label" />
                                            <span className="checkmark"></span>
                                        </label>
                                    </div>
                                    <div className="col-xs-2">
                                        <label className="custom-checkbox-gray">
                                            <span className="a-hidden" id="assign-account-managers-member-label">Member Toggle</span>
                                            <input type="checkbox" name="radio2" aria-labelledby="assign-account-managers-member-label" />
                                            <span className="checkmark"></span>
                                        </label>
                                    </div>
                                </div>

                                <div className="row rol-permissions__row">
                                    <div className="col-xs-6">
                                        <p>Change Billing Password</p>
                                    </div>
                                    <div className="col-xs-2">
                                        <label className="custom-checkbox-gray">
                                            <span className="a-hidden" id="change-billing-password-owner-label">Owner Toggle</span>
                                            <input type="checkbox" disabled="disabled" checked="checked" name="radio1" aria-labelledby="change-billing-password-owner-label" />
                                            <span className="checkmark"></span>
                                        </label>
                                    </div>
                                    <div className="col-xs-2">
                                        <label className="custom-checkbox-gray">
                                            <span className="a-hidden" id="change-billing-password-manager-label">Manager Toggle</span>
                                            <input type="checkbox" name="radio1" aria-labelledby="change-billing-password-manager-label" />
                                            <span className="checkmark"></span>
                                        </label>
                                    </div>
                                    <div className="col-xs-2">
                                        <label className="custom-checkbox-gray">
                                            <span className="a-hidden" id="change-billing-password-member-label">Member Toggle</span>
                                            <input type="checkbox" name="radio1" aria-labelledby="change-billing-password-member-label" />
                                            <span className="checkmark"></span>
                                        </label>
                                    </div>
                                </div>


                                <div className="row rol-permissions__row">
                                    <div className="col-xs-6">
                                        <p>Upgrade all Phones on Account</p>
                                    </div>
                                    <div className="col-xs-2">
                                        <label className="custom-checkbox-gray">
                                            <span className="a-hidden" id="upgrade-owner-label">Owner Toggle</span>
                                            <input type="checkbox" disabled="disabled" checked="checked" name="radio3" aria-labelledby="upgrade-owner-label" />
                                            <span className="checkmark"></span>
                                        </label>
                                    </div>
                                    <div className="col-xs-2">
                                        <label className="custom-checkbox-gray">
                                            <span className="a-hidden" id="upgrade-manager-label">Manager Toggle</span>
                                            <input type="checkbox" disabled="disabled" checked="checked" name="radio3" aria-labelledby="upgrade-manager-label" />
                                            <span className="checkmark"></span>
                                        </label>
                                    </div>
                                    <div className="col-xs-2">
                                        <label className="custom-checkbox-gray">
                                            <span className="a-hidden" id="upgrade-member-label">Member Toggle</span>
                                            <input type="checkbox" name="radio3" aria-labelledby="upgrade-member-label" />
                                            <span className="checkmark"></span>
                                        </label>
                                    </div>
                                </div>


                                <div className="row rol-permissions__row">
                                    <div className="col-xs-6">
                                        <p>Add a New line of Service</p>
                                    </div>
                                    <div className="col-xs-2">
                                        <label className="custom-checkbox-gray">
                                            <span className="a-hidden" id="new-line-owner-label">Owner Toggle</span>
                                            <input type="checkbox" disabled="disabled" checked="checked" name="radio14" aria-labelledby="new-line-owner-label" />
                                            <span className="checkmark"></span>
                                        </label>
                                    </div>
                                    <div className="col-xs-2">
                                        <label className="custom-checkbox-gray">
                                            <span className="a-hidden" id="new-line-manager-label">Manager Toggle</span>
                                            <input type="checkbox" disabled="disabled" checked="checked" name="radio14" aria-labelledby="new-line-manager-label" />
                                            <span className="checkmark"></span>
                                        </label>
                                    </div>
                                    <div className="col-xs-2">
                                        <label className="custom-checkbox-gray">
                                            <span className="a-hidden" id="new-line-member-label">Member Toggle</span>
                                            <input type="checkbox" name="radio14" aria-labelledby="new-line-member-label" />
                                            <span className="checkmark"></span>
                                        </label>
                                    </div>
                                </div>



                                <div className="row rol-permissions__row">
                                    <div className="col-xs-6">
                                        <p>Make Plan Changes and Manage Data</p>
                                    </div>
                                    <div className="col-xs-2">
                                        <label className="custom-checkbox-gray">
                                            <span className="a-hidden" id="plan-changes-owner-label">Owner Toggle</span>
                                            <input type="checkbox" disabled="disabled" checked="checked" name="radio4" aria-labelledby="plan-changes-owner-label" />
                                            <span className="checkmark"></span>
                                        </label>
                                    </div>
                                    <div className="col-xs-2">
                                        <label className="custom-checkbox-gray">
                                            <span className="a-hidden" id="plan-changes-manager-label">Manager Toggle</span>
                                            <input type="checkbox" disabled="disabled" checked="checked" name="radio4" aria-labelledby="plan-changes-manager-label" />
                                            <span className="checkmark"></span>
                                        </label>
                                    </div>
                                    <div className="col-xs-2">
                                        <label className="custom-checkbox-gray">
                                            <span className="a-hidden" id="plan-changes-member-label">Member Toggle</span>
                                            <input type="checkbox" name="radio4" aria-labelledby="plan-changes-member-label" />
                                            <span className="checkmark"></span>
                                        </label>
                                    </div>
                                </div>



                                <div className="row rol-permissions__row">
                                    <div className="col-xs-6">
                                        <p>View <br className="visible-xs" />Bill</p>
                                    </div>
                                    <div className="col-xs-2">
                                        <label className="custom-checkbox-gray">
                                            <span className="a-hidden" id="view-bill-owner-label">Owner Toggle</span>
                                            <input type="checkbox" disabled="disabled" checked="checked" name="radio5" aria-labelledby="view-bill-owner-label" />
                                            <span className="checkmark"></span>
                                        </label>
                                    </div>
                                    <div className="col-xs-2">
                                        <label className="custom-checkbox-gray">
                                            <span className="a-hidden" id="view-bill-manager-label">Manager Toggle</span>
                                            <input type="checkbox" disabled="disabled" checked="checked" name="radio5" aria-labelledby="view-bill-manager-label" />
                                            <span className="checkmark"></span>
                                        </label>
                                    </div>
                                    <div className="col-xs-2">
                                        <label className="custom-checkbox-gray">
                                            <span className="a-hidden" id="view-bill-member-label">Member Toggle</span>
                                            <input type="checkbox" name="radio5" aria-labelledby="view-bill-member-label" />
                                            <span className="checkmark"></span>
                                        </label>
                                    </div>
                                </div>




                                <div className="row rol-permissions__row">
                                    <div className="col-xs-6">
                                        <p>Enroll in Paperless Billing</p>
                                    </div>
                                    <div className="col-xs-2">
                                        <label className="custom-checkbox-gray">
                                            <span className="a-hidden" id="paperless-owner-label">Owner Toggle</span>
                                            <input type="checkbox" disabled="disabled" checked="checked" name="radio6" aria-labelledby="paperless-owner-label" />
                                            <span className="checkmark"></span>
                                        </label>
                                    </div>
                                    <div className="col-xs-2">
                                        <label className="custom-checkbox-gray">
                                            <span className="a-hidden" id="paperless-manager-label">Manager Toggle</span>
                                            <input type="checkbox" disabled="disabled" checked="checked" name="radio6" aria-labelledby="paperless-manager-label" />
                                            <span className="checkmark"></span>
                                        </label>
                                    </div>
                                    <div className="col-xs-2">
                                        <label className="custom-checkbox-gray">
                                            <span className="a-hidden" id="paperless-member-label">Member Toggle</span>
                                            <input type="checkbox" name="radio6" aria-labelledby="paperless-member-label" />
                                            <span className="checkmark"></span>
                                        </label>
                                    </div>
                                </div>




                                <div className="row rol-permissions__row">
                                    <div className="col-xs-6">
                                        <p>Cancel Pending Order*</p>
                                    </div>
                                    <div className="col-xs-2">
                                        <label className="custom-checkbox-gray">
                                            <span className="a-hidden" id="cancel-pending-owner-label">Owner Toggle</span>
                                            <input type="checkbox" disabled="disabled" checked="checked" name="radio7" aria-labelledby="cancel-pending-owner-label" />
                                            <span className="checkmark"></span>
                                        </label>
                                    </div>
                                    <div className="col-xs-2">
                                        <label className="custom-checkbox-gray">
                                            <span className="a-hidden" id="cancel-pending-manager-label">Manager Toggle</span>
                                            <input type="checkbox" disabled="disabled" checked="checked" name="radio7" aria-labelledby="cancel-pending-manager-label" />
                                            <span className="checkmark"></span>
                                        </label>
                                    </div>
                                    <div className="col-xs-2">
                                        <label className="custom-checkbox-gray">
                                            <span className="a-hidden" id="cancel-pending-member-label">Member Toggle</span>
                                            <input type="checkbox" name="radio7" aria-labelledby="cancel-pending-member-label" />
                                            <span className="checkmark"></span>
                                        </label>
                                    </div>
                                </div>




                                <div className="row rol-permissions__row">
                                    <div className="col-xs-6">
                                        <p>Setup Recurring Payments</p>
                                    </div>
                                    <div className="col-xs-2">
                                        <label className="custom-checkbox-gray">
                                            <span className="a-hidden" id="recurring-payments-owner-label">Owner Toggle</span>
                                            <input type="checkbox" disabled="disabled" checked="checked" name="radio8" aria-labelledby="recurring-payments-owner-label" />
                                            <span className="checkmark"></span>
                                        </label>
                                    </div>
                                    <div className="col-xs-2">
                                        <label className="custom-checkbox-gray">
                                            <span className="a-hidden" id="recurring-payments-manager-label">Manager Toggle</span>
                                            <input type="checkbox" disabled="disabled" checked="checked" name="radio8" aria-labelledby="recurring-payments-manager-label" />
                                            <span className="checkmark"></span>
                                        </label>
                                    </div>
                                    <div className="col-xs-2">
                                        <label className="custom-checkbox-gray">
                                            <span className="a-hidden" id="recurring-payments-member-label">Member Toggle</span>
                                            <input type="checkbox" name="radio8" aria-labelledby="recurring-payments-member-label" />
                                            <span className="checkmark"></span>
                                        </label>
                                    </div>
                                </div>



                                <div className="row rol-permissions__row">
                                    <div className="col-xs-6">
                                        <p>Make One-time Payments</p>
                                    </div>
                                    <div className="col-xs-2">
                                        <label className="custom-checkbox-gray">
                                            <span className="a-hidden" id="onetime-owner-label">Owner Toggle</span>
                                            <input type="checkbox" disabled="disabled" checked="checked" name="radio9" aria-labelledby="onetime-owner-label" />
                                            <span className="checkmark"></span>
                                        </label>
                                    </div>
                                    <div className="col-xs-2">
                                        <label className="custom-checkbox-gray">
                                            <span className="a-hidden" id="onetime-manager-label">Manager Toggle</span>
                                            <input type="checkbox" disabled="disabled" checked="checked" name="radio9" aria-labelledby="onetime-manager-label" />
                                            <span className="checkmark"></span>
                                        </label>
                                    </div>
                                    <div className="col-xs-2">
                                        <label className="custom-checkbox-gray">
                                            <span className="a-hidden" id="onetime-member-label">Member Toggle</span>
                                            <input type="checkbox" disabled="disabled" checked="checked" name="radio9" aria-labelledby="onetime-member-label" />
                                            <span className="checkmark"></span>
                                        </label>
                                    </div>
                                </div>




                                <div className="row rol-permissions__row">
                                    <div className="col-xs-6">
                                        <p>View <br className="visible-xs" />Usage</p>
                                    </div>
                                    <div className="col-xs-2">
                                        <label className="custom-checkbox-gray">
                                            <span className="a-hidden" id="usage-owner-label">Owner Toggle</span>
                                            <input type="checkbox" disabled="disabled" checked="checked" name="radio9" aria-labelledby="usage-owner-label" />
                                            <span className="checkmark"></span>
                                        </label>
                                    </div>
                                    <div className="col-xs-2">
                                        <label className="custom-checkbox-gray">
                                            <span className="a-hidden" id="usage-manager-label">Manager Toggle</span>
                                            <input type="checkbox" disabled="disabled" checked="checked" name="radio9" aria-labelledby="usage-manager-label" />
                                            <span className="checkmark"></span>
                                        </label>
                                    </div>
                                    <div className="col-xs-2">
                                        <label className="custom-checkbox-gray">
                                            <span className="a-hidden" id="usage-member-label">Member Toggle</span>
                                            <input type="checkbox" disabled="disabled" checked="checked" name="radio9" aria-labelledby="usage-member-label" />
                                            <span className="checkmark"></span>
                                        </label>
                                    </div>
                                </div>



                                <div className="row rol-permissions__row">
                                    <div className="col-xs-6">
                                        <p>Change/Reset Voicemail Password</p>
                                    </div>
                                    <div className="col-xs-2">
                                        <label className="custom-checkbox-gray">
                                            <span className="a-hidden" id="voicemail-password-owner-label">Owner Toggle</span>
                                            <input type="checkbox" disabled="disabled" checked="checked" name="radio10" aria-labelledby="voicemail-password-owner-label" />
                                            <span className="checkmark"></span>
                                        </label>
                                    </div>
                                    <div className="col-xs-2">
                                        <label className="custom-checkbox-gray">
                                            <span className="a-hidden" id="voicemail-password-manager-label">Manager Toggle</span>
                                            <input type="checkbox" disabled="disabled" checked="checked" name="radio10" aria-labelledby="voicemail-password-manager-label" />
                                            <span className="checkmark"></span>
                                        </label>
                                    </div>
                                    <div className="col-xs-2">
                                        <label className="custom-checkbox-gray">
                                            <span className="a-hidden" id="voicemail-password-member-label">Member Toggle</span>
                                            <input type="checkbox" disabled="disabled" checked="checked" name="radio10" aria-labelledby="voicemail-password-member-label" />
                                            <span className="checkmark"></span>
                                        </label>
                                    </div>
                                </div>




                                <div className="row rol-permissions__row">
                                    <div className="col-xs-6">
                                        <p>Purchase Content for Phone</p>
                                    </div>
                                    <div className="col-xs-2">
                                        <label className="custom-checkbox-gray">
                                            <span className="a-hidden" id="purchase-content-owner-label">Owner Toggle</span>
                                            <input type="checkbox" disabled="disabled" checked="checked" name="radio11" aria-labelledby="purchase-content-owner-label" />
                                            <span className="checkmark"></span>
                                        </label>
                                    </div>
                                    <div className="col-xs-2">
                                        <label className="custom-checkbox-gray">
                                            <span className="a-hidden" id="purchase-content-manager-label">Manager Toggle</span>
                                            <input type="checkbox" disabled="disabled" checked="checked" name="radio11" aria-labelledby="purchase-content-manager-label" />
                                            <span className="checkmark"></span>
                                        </label>
                                    </div>
                                    <div className="col-xs-2">
                                        <label className="custom-checkbox-gray">
                                            <span className="a-hidden" id="purchase-content-member-label">Member Toggle</span>
                                            <input type="checkbox" disabled="disabled" checked="checked" name="radio11" aria-labelledby="purchase-content-member-label" />
                                            <span className="checkmark"></span>
                                        </label>
                                    </div>
                                </div>




                                <div className="row rol-permissions__row">
                                    <div className="col-xs-6">
                                        <p>Access Personal Photo Albums</p>
                                    </div>
                                    <div className="col-xs-2">
                                        <label className="custom-checkbox-gray">
                                            <span className="a-hidden" id="personal-photos-owner-label">Owner Toggle</span>
                                            <input type="checkbox" disabled="disabled" checked="checked" name="radio12" aria-labelledby="personal-photos-owner-label" />
                                            <span className="checkmark"></span>
                                        </label>
                                    </div>
                                    <div className="col-xs-2">
                                        <label className="custom-checkbox-gray">
                                            <span className="a-hidden" id="personal-photos-manager-label">Manager Toggle</span>
                                            <input type="checkbox" disabled="disabled" checked="checked" name="radio12" aria-labelledby="personal-photos-manager-label" />
                                            <span className="checkmark"></span>
                                        </label>
                                    </div>
                                    <div className="col-xs-2">
                                        <label className="custom-checkbox-gray">
                                            <span className="a-hidden" id="personal-photos-member-label">Member Toggle</span>
                                            <input type="checkbox" disabled="disabled" checked="checked" name="radio12" aria-labelledby="personal-photos-member-label" />
                                            <span className="checkmark"></span>
                                        </label>
                                    </div>
                                </div>




                                <div className="row rol-permissions__row">
                                    <div className="col-xs-6">
                                        <p>Manage Personal Preferences</p>
                                    </div>
                                    <div className="col-xs-2">
                                        <label className="custom-checkbox-gray">
                                            <span className="a-hidden" id="personal-pref-owner-label">Owner Toggle</span>
                                            <input type="checkbox" disabled="disabled" checked="checked" name="radio13" aria-labelledby="personal-pref-owner-label" />
                                            <span className="checkmark"></span>
                                        </label>
                                    </div>
                                    <div className="col-xs-2">
                                        <label className="custom-checkbox-gray">
                                            <span className="a-hidden" id="personal-pref-manager-label">Manager Toggle</span>
                                            <input type="checkbox" disabled="disabled" checked="checked" name="radio13" aria-labelledby="personal-pref-manager-label" />
                                            <span className="checkmark"></span>
                                        </label>
                                    </div>
                                    <div className="col-xs-2">
                                        <label className="custom-checkbox-gray">
                                            <span className="a-hidden" id="personal-pref-member-label">Member Toggle</span>
                                            <input type="checkbox" disabled="disabled" checked="checked" name="radio13" aria-labelledby="personal-pref-member-label" />
                                            <span className="checkmark"></span>
                                        </label>
                                    </div>
                                </div>


                            </div>
                        </div>



                        {reactGlobals.mdnRole.toLocaleLowerCase() == "accountholder" || reactGlobals.mdnRole.toLocaleLowerCase() == "accountmanager" ? <div className="rol-permissions__buttons">
                            <div className="col-xs-12 ">
                                <a href="#">Learn more</a>
                            <a href="#/manage/accountmanager" className="btn btn--round" role="button">Edit Account roles</a>
                            </div>
                        </div> : <div className="rol-permissions__buttons">
                                <div className="col-xs-12 ">
                                    <a href="#">Learn more</a>
                                    <a href="#/manage/accountmanager" className="btn btn--round" role="button">Request Access</a>
                                </div>
                            </div>}

                    </form>
                </div>
            </div>
        )
    }


export default AccessRoles;