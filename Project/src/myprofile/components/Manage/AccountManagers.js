import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from './actions'
import InputField from '../FormElements/InputComponent'
import './style.css'
import Popup from './Popup/Popup'
import RevokeAccess from './Popup/RevokeAccess'
import RequestSent  from './Popup/RequestSent'
import AccessRoles  from './Popup/AccessRoles'
import ManagersListToAccountManager from './components/ManagersListToAccountManager'
import ManagerCard from './components/ManagerCard'
import { MAXIMUM_ACCOUNT_MANAGERS_ACTIVE } from './constants'

import Modal from "../Modal/modal"
import SecurePin from "../SecurePin/SecurePin"
import { handleErrors } from "../../../utils/errorHandler"

const accountOwner =  reactGlobals.mdnRole == 'accountHolder'
const accountMember = reactGlobals.mdnRole == 'mobileSecure'
const accountManager = reactGlobals.mdnRole == 'accountManager'

class AccountManagerBlock extends Component {
  constructor(props) {
    super(props)
    this.state = this.getinitialState()
  }

  addManagerClickedHandler = (e) => {
    this.props.actions.getSecretPinStatus().then(() =>{
      const { securePin } = this.props;
      console.log(securePin)
      if(!this.props.error){
        if(!securePin.securePinEnabled){
          console.log("secure pin not enabled")
          // this.handleSave(e)

        } 
        if (!securePin.securePinVerified) {
          console.log("secure pin not verified, go through secure pin flow")
          this.props.actions.getListOfUserNumbers().then(() => {
              this.setState({
                  modalStatus: true,
                  listOfAccountNumbersModal: true,
                  // afterGetRequest: this.props.listOfUserNumbers
              })
          })
        } else {
          console.log("secure pin already verified")
          // this.handleSave(e)
          // this.props.handleSave('accountmanagerBlock',this.state, e)
        //   this.props.actions.postAddManagerByAccountHolder({
        //     "firstName": this.state.firstName,
        //     "lastName": this.state.lastName,
        //     "phoneNumber": this.state.phoneNumber === 'noLineAssigned' ? 'Not Applicable' : this.state.phoneNumber,
        //     "emailId": this.state.emailId,
        //     "acctTypeCode": this.state.phoneNumber === 'noLineAssigned' ? 'FAC' : ''
        // })
          // return this.props.handleSave('questionForm', {challengeQuestionID: this.state.newQId, challengeAnswer: this.state.newAnswer}, event)
        }
      }
    })
  }

  componentWillReceiveProps(nextProps){
    const { memberPhoneNumber, memberEmailId } = nextProps
    if(this.props.memberEmailId !== nextProps.memberEmailId) {
      this.setState({
        phoneNumber: nextProps.memberPhoneNumber,
        emailId: nextProps.memberEmailId,
        showLearnMorePopUp: nextProps.showLearnMorePopUp
      })
    }
  }

  getAccountManagerRequestCard=(request)=>{
    const { managers } = this.props
    const isMaxManagersReached = managers.length > MAXIMUM_ACCOUNT_MANAGERS_ACTIVE
    if( isMaxManagersReached == false ){
      return(
        <div key={ request.phoneNumber + request.emailId }>
          <div className='row request-cont'>
              <p>Requested by { request.phoneNumber } </p>
          </div>
           <div className='row'>
               <h4 tabIndex='0'>{request.firstName+ '  ' + request.lastName}</h4>
               <p>{request.phoneNumber}</p>
               <p>{request.emailId}</p>
           </div>
           <div className='row'>
             <div className='col-md-1'/>
              <div className='col-md-5'>
                  <button className='btn btn--round-invert' onClick={(e) =>this.handleDenyAccountManagerRequest(request)}>Deny</button>
              </div>
              <div className='col-md-2'/>
              <div className='col-md-5'>
                <button className='btn btn--round' onClick={(e) =>this.handleAppproveAccountManagerRequest(request)}>Approve</button>
              </div>
              <div className='col-md-1'/>
           </div>
           <div className='row seperator'/>
        </div>
      )
    }
    return(
      <div>
        <div className='row max-account-managers-message'>
          <p >You may have a maximum of three Account Managers at a time.
            To add a new Account Manger, please remove one first. </p>
        </div>
        <div className='row request-cont'>
            <p>Requested by { request.phoneNumber } </p>
        </div>
         <div className='row'>
             <h4 tabIndex='0'>{request.firstName+ '  ' + request.lastName}</h4>
             <p>{request.phoneNumber}</p>
             <p>{request.emailId}</p>
         </div>
         <div className='row'>
           <div className='col-md-1'/>
            <div className='col-md-5'>
                <button className='btn btn--round-invert'  disabled={isMaxManagersReached} onClick={(e) =>this.handleDenyAccountManagerRequest(request)}>Deny</button>
            </div>
            <div className='col-md-2'/>
            <div className='col-md-5'>
              <button className='btn btn--round' disabled={isMaxManagersReached} onClick={(e) =>{}}>Approve</button>
            </div>
            <div className='col-md-1'/>
         </div>
         <div className='row seperator'/>
      </div>
    )
  }

getinitialState(){
  return {
      firstName: '',
      lastName: '',
      phoneNumber: this.props.memberPhoneNumber,
      emailId: this.props.memberEmailId,
      showPopup: false,
      managerToRemove: {},
      isEditEmailOnAccountMemberSelected: false,
      showLearnMorePopUp: this.props.showLearnMorePopUp,
      moveCancelButton: 0,
      modalStatus: false,
      listOfAccountNumbersModal: true,
      afterGetRequest: this.props.listOfUserNumbers,

    }
}

  handleClosePopup(){
    this.setState({
      showPopup: false
    })
  }

  handleRevokeAccess(){
    this.handleClosePopup()
    const { managerToRemove } = this.state
    const postPayload = {
        "firstName": managerToRemove.firstName,
        "lastName": managerToRemove.lastName,
        "phoneNumber": managerToRemove.phoneNumber === 'noLineAssigned' ? 'Not Applicable' : managerToRemove.phoneNumber,
        "emailId": managerToRemove.emailId,
        "acctTypeCode":managerToRemove.phoneNumber==='Not Applicable' ? 'FAC' :''
      }
    this.props.actions.postRemoveManagerByAccountHolder(postPayload)
    this.props.handleRemoveManager(this.state.managerToRemove)
  }

  onChangeInput = () => {
    // All  the validations goes here
  /*  const val = this.state.user;
    const useridInvalidMessages = JSON.parse(JSON.stringify(this.state.useridInvalidMessages));
    if(val.length === 0) {
      this.setState( { requiredError : true,  useridInvalidMessages: [
        { name: '6-60 characters', error: false, type: 'character'},
        { name: 'Not all numbers', error: false, type: 'number' },
        { name: 'Contains no spaces', error: false, type: 'space'}
      ] });
    } else {
      this.setState( { requiredError: false });
        if (val.indexOf(' ') !== -1) {
          let inavlidMessage =  useridInvalidMessages.find(message => message.type === 'space');
            inavlidMessage.error = true;
            this.setState({ useridInvalidMessages });
        } else {
            let inavlidMessage =  useridInvalidMessages.find(message => message.type === 'space');
            inavlidMessage.error = false;
            this.setState({ useridInvalidMessages });
        }
        if (val.match(/^([^0-9]*)$/)) {
            let inavlidMessage =  useridInvalidMessages.find(message => message.type === 'number');
            inavlidMessage.error = false;
            this.setState({ useridInvalidMessages });
        } else {
          let inavlidMessage =  useridInvalidMessages.find(message => message.type === 'number');
            inavlidMessage.error = true;
            this.setState({ useridInvalidMessages });
        }
    } */
  }

  handleOnChange = (inputType,inputValue) => {
    if(inputType == 'firstName' || inputType == 'lastName'){
      const validateName = /^[a-zA-Z]*$/// Avoid Special Characters and numbers as part of first name and last name
      if(validateName.test(inputValue)){
          this.setState({ [inputType]: inputValue })
      }
    }else{
          this.setState({ [inputType]: inputValue }, () => this.onChangeInput());
    }
  }

  getManagersView(){
    const { managers } = this.props
     if(accountManager){
       return <ManagersListToAccountManager managers={managers} toggleLearnMorePopup={()=>this.toggleLearnMorePopup()}/>
     }
    return(
        <div>
          {
            managers.map((eachManager)=>{
              if(eachManager.role === 'accountHolder'){
                return(
                  <div key={eachManager.phoneNumber}>
                     <div className='row owner-info'>
                         <h4 className='manager-name'>{eachManager.firstName+ ' '+ eachManager.lastName}( Account Owner )</h4>
                         <p>{eachManager.phoneNumber}</p>
                         <p>{eachManager.emailId}</p>
                     </div>
                  </div>
                )
              }
              return <ManagerCard managerInfo={eachManager} isNewlyAdded={this.props.addedManager.phoneNumber===eachManager.phoneNumber }/>
            })
          }
        </div>
    )
  }

  showConfirmPopUp(managerToRemove){
      this.setState({
        showPopup: true,
        managerToRemove
      })
  }

  getManagersEditView(){
    const { managers, revokedManager } = this.props
    if(accountManager){
      return <ManagersListToAccountManager managers={managers} toggleLearnMorePopup={()=>this.toggleLearnMorePopup()}/>
    }
    return(
        <div>
          {
            managers.map((eachManager)=>{
	                    const phoneNumber = eachManager.phoneNumber === 'Not Applicable' ? '' : eachManager.phoneNumber
              if(eachManager.role === 'accountHolder'){
                return(
                  <div key={eachManager.phoneNumber}>
                    <div className='row'>
                        <div className='row col-xs-12 col-sm-1 col-md-11'>
                            <h1>Current Account Managers</h1>
                        </div>
                      <div className='row col-xs-12 col-sm-1 col-md-1'>
                           <a className='btn btn-anchor'  onClick={() => this.props.handleEditCancel('cancelblock')}>Cancel</a>
                      </div>
                    </div>
                     <div className='row owner-info'>
                         <h4 className='manager-name'>{eachManager.firstName+ ' '+ eachManager.lastName}( Account Owner )</h4>
                         <p>{phoneNumber}</p>
                         <p>{eachManager.emailId}</p>
                     </div>
                     <div className='row seperator'/>
                  </div>
                )
              }
              return(
                <div>
                    <div className='row owner-info-second' key={eachManager.phoneNumber}>
                         <div className='row col-xs-12 col-sm-11'>
                             <h4 className='manager-name'>{ eachManager.firstName } { eachManager.lastName }</h4>
                             <p>{phoneNumber}</p>
                             <p>{eachManager.emailId}</p>
                         </div>
                         {
                           accountOwner &&
                           <div className='row col-xs-12 col-sm-1'>
                                <a className='btn btn-anchor'  onClick={() => this.showConfirmPopUp(eachManager)} role='button'>Remove</a>
                           </div>
                         }
                    </div>
                    <div className='row seperator'/>
                </div>
              )
            })
          }
          {
            revokedManager.phoneNumber &&
            <div className='row owner-info-second'>
                <div className='row col-xs-12 col-sm-11 undo-message-cont'>
                  <span className='text-success fa fa-check-circle'></span>
                  <p className='undo-message'>Account Manager { revokedManager.firstName  + ' '+ revokedManager.lastName } removed</p>
                </div>
                <div className='row col-xs-12 col-sm-1'>
                    <a className='undo' role='button' onClick={() => this.props.handleUndoRevoke()}>Undo</a>
                </div>
              </div>
          }
        </div>
    )
  }

  handleEditNewMemberEmail(){
    this.setState({
      isEditEmailOnAccountMemberSelected: true
    })
  }

  handleSaveNewMemberEmail(){
    this.setState({
      isEditEmailOnAccountMemberSelected: false
    })
  }

  handleDenyAccountManagerRequest(newRequest){
    const payload = {
        "role":'',
        "firstName": newRequest.firstName,
        "lastName": newRequest.lastName,
        "phoneNumber": newRequest.phoneNumber,
        "emailId": newRequest.emailId,
        "status":"DENIED"
 }
    this.props.actions.postDenyManagerByAccountHolder(payload)
    this.props.handleDenyAccountManagerRequest(newRequest)
  }

  // handleApproveAccountManagerClick = () => {
  //   this.setState({
  //     approveAccountManager: true
  //   })
  //   // this.handleAppproveAccountManagerRequest()
  // }

  handleAppproveAccountManagerRequest(newRequest){
    const payload = {
        "firstName": newRequest.firstName,
        "lastName": newRequest.lastName,
        "phoneNumber": newRequest.phoneNumber,
        "emailId": newRequest.emailId,
        "status":"APPROVED"
 }
    this.props.actions.postApproveManagerByAccountHolder(payload)
    this.props.handleAppproveAccountManagerRequest(payload)
  }

  handleSendRequestForAccountManager(newRequest){
    const payload = {
        "role":'',
        "firstName": this.state.firstName,
        "lastName": this.state.lastName,
        "phoneNumber": this.state.phoneNumber,
        "emailId": this.state.emailId,
        "status":"PENDING"
 }
    this.props.actions.postSendRequestForAccountManager(payload)
    this.props.handleSendRequestForAccountManager(newRequest)
  }

  getAccountManagerRequestsView(){
    if(accountMember) return <div /> // Account Members do not see pending requests
    const { accountManagerRequests, deniedAccountManagerRequests } = this.props
    if( accountManagerRequests.length || deniedAccountManagerRequests){
      return(
        <div>
            <div className='row request-header'>
                <h1> Account Manager Requests </h1>
            </div>
            {
              accountManagerRequests.map(eachRequest =>{
                  return (
                    <div key={eachRequest.phoneNumber}>
                        { this.getAccountManagerRequestCard(eachRequest) }
                    </div>
                  )
              })
            }
            {
              deniedAccountManagerRequests  &&
              <div className='row owner-info-second'>
                  <div className='row col-xs-12 col-sm-11 undo-message-cont'>
                    <span className='text-success fa fa-check-circle'></span>
                    <p className='undo-message'>Account Manager Request from {deniedAccountManagerRequests.phoneNumber} is denied </p>
                  </div>
                  <div className='row col-xs-12 col-sm-1'>
                      <a className='undo' role='button' onClick={() => this.props.handleUndoDenyAccountManagerRequest()}>Undo</a>
                  </div>
              </div>
            }
        </div>
      )
    }

    return <div/>
  }

  handleSave = (e) =>{
    // this.props.handleSave('accountManagerBlock',{firstName: this.state.firstName, emailId: this.state.emailId} , e)
	this.props.handleSave('accountmanagerBlock',this.state, e)
    this.props.actions.postAddManagerByAccountHolder({
        "firstName": this.state.firstName,
        "lastName": this.state.lastName,
        "phoneNumber": this.state.phoneNumber === 'noLineAssigned' ? 'Not Applicable' : this.state.phoneNumber,
        "emailId": this.state.emailId,
        "acctTypeCode": this.state.phoneNumber === 'noLineAssigned' ? 'FAC' : ''
    })
    this.setState(this.getinitialState())
  }

  getManagerAddView( managers, firstName, lastName, phoneNumber, emailId ){
  if(accountManager) return <div />
    const { newAccountMemberRequest, mtns } = this.props
    if( newAccountMemberRequest.status === 'not requested' ){
      if( accountOwner && managers.length <= MAXIMUM_ACCOUNT_MANAGERS_ACTIVE ){
      return(
        <div className='row add-manager-cont'>
                      {this.state.moveCancelButton === 1 && !this.props.showManagerEdit && this.props.managerEditMode ? <a className='btn btn-anchor' style={{float: 'right'}} onClick={() => this.props.handleEditCancel('cancelblock')}>Cancel</a> : ""}
            <h4 tabIndex='0'>Add Account Managers</h4>
            <a className='question' onClick={()=>{this.props.actions.showLearnMorePopUp()}}> What can an Account Manager do ?</a>
            <p className='answer'>
              An Account Manager does NOT have to have a mobile number on your
              account. By providing a name only, they will be able to manage all lines
               on the account in retails stores and by calling Customer Service.
            </p>
            <div>
                <div>
                  <div>
                    <div className='add-manager-fields'>
                       <div className='manager-fn-cont '>
                          <label htmlFor='userId'>First Name</label>
                          <InputField type='text' handleOnChange={(e)=>{this.handleOnChange('firstName',e.target.value)}} placeholder='Name' name='firstName' value={firstName}/>
                       </div>
                       <div className='manager-ln-cont '>
                           <label htmlFor='userId'>Last Name</label>
                           <InputField type='text' handleOnChange={(e)=>{this.handleOnChange('lastName',e.target.value)}}  placeholder='Name' name='lastName'value={lastName}/>
                       </div>
                   </div>
                  </div>
                  <div>
                       <p>If you assign a mobile number and email address, the Account
                           Manager will be given My Verizon Online access to your account.</p>
                   </div>
                   <div className='contact-cont'>
                       <div>
                         <h4>Mobile Number</h4>
                         <select value={this.state.phoneNumber} onChange={(e)=>this.handleOnChange('phoneNumber',e.target.value)}>
                             <option value='' >Select</option>
                             <option value='noLineAssigned' >No Line Assigned</option>
                             {
                               mtns.map(eachMtns=>{
                                 return <option value={eachMtns}>{eachMtns}</option>
                               })
                             }
                         </select>
                       </div>
                       {
                         this.state.phoneNumber != 'noLineAssigned' &&
                         <div>
                             <h4>Email Address</h4>
                             <InputField type='text' handleOnChange={(e)=>{this.handleOnChange('emailId',e.target.value)}} placeholder='name@domain.com' name='email' value={emailId}/>
                         </div>
                        }
                   </div>
                   <div className='footer col-xs-12'>
                     <a className='btn btn--round-invert' role='button' onClick={() => this.props.handleEditCancel('cancelblock')}>Cancel</a>
                     <button className='btn btn--round' disabled={reactGlobals.isCsr}  onClick={(e) =>this.handleSave(e) }>Add Manager</button>
                   </div>
                 </div>
              </div>
            </div>
          )
        }
        if(accountMember){
          return(
            <div className='row add-manager-cont'>
              <h4 tabIndex='0'>Request Account Manager Access</h4>
              <a className='question' onClick={()=>{this.props.actions.showLearnMorePopUp()}}> What can an Account Manager do ?</a>
              <p className='answer'>
              Submit a request to your Account Owner to gain Account Manager access and abilities.
              You must be 18 years or older to be an Account Manager.
              </p>
              <div>
                  <div>
                    <div>
                      <div className='add-manager-fields'>
                         <div className='manager-fn-cont '>
                            <label htmlFor='userId'>First Name</label>
                            <InputField type='text' handleOnChange={(e)=>{this.handleOnChange('firstName',e.target.value)}} placeholder='Name' name='firstName' value={firstName}/>
                         </div>
                         <div className='manager-ln-cont '>
                             <label htmlFor='userId'>Last Name</label>
                             <InputField type='text' handleOnChange={(e)=>{this.handleOnChange('lastName',e.target.value)}}  placeholder='Name' name='lastName'value={lastName}/>
                         </div>
                     </div>
                    </div>
                    
                     <div className='contact-cont'>
                         <div className='row'>
                             <div className='col-sm-3'>
                                 <label>Phone Number</label>
                             </div>
                             <div className='p-t-7 col-sm-3'>
                                 <p>{phoneNumber}</p>
                             </div>
                         </div>
                         <div className='row'>
                             <div className='col-sm-3'>
                                 <label>Email Address</label>
                             </div>
                             <div className='p-t-7 col-sm-3'>
                               {
                                 <p>{emailId}</p>
                               }
                             </div>
                         </div>
                     </div>
                     <div className='footer col-xs-12'>
                       <a className='btn btn--round-invert' role='button' onClick={() => this.props.handleEditCancel('cancelblock')}>Cancel</a>
                         <button className='btn btn--round'  onClick={() =>this.handleSendRequestForAccountManager(this.state) }>Send Request</button> :
                     </div>
                   </div>
                </div>
              </div>
            )
        }
      }

    if(this.props.newAccountMemberRequest.status === 'request pending'){
      return(
        <div className='row'>
              <h2 className='account-manager-request-heading'>Request to Become an Account Manager</h2>
              <p className='account-member-'>
                  Submit a request to your Account Owner to gain Account Manager access and abilities.
                  You must be 18 years or older to be an Account Manager.
                  <br/>
                  <br/>
                  <br/>
                  Your request will be provided to the Account Owner, mobile number xxx.xxx.xxxx.
                  If accepted, you will receive an email to change your role to Account Manager.
                  You will then have access to manage all lines on the account in retails stores, by calling Customer Service, or through My Verizon Online.
            </p>
            <h4 className='account-manager-request-pending'>
                You have one (1) request currently pending. Please contact your Account Owner for updates on open requests.
            </h4>
        </div>
      )
    }

    if(this.props.newAccountMemberRequest.status === 'request denied'){
      return(
        <div className='row'>
              <h2 className='account-manager-request-heading'>Request to Become an Account Manager</h2>
              <h3 className='account-manager-request-pending'>
                    Your Account Owner  has denied your request
              </h3>
              <p className='account-member-'>
                  you can always submit another request you can always submit another request you can always
                  submit another request you can always submit another request you can always submit another request
            </p>

        </div>
      )
    }

    return(
      <div className='row add-manager-cont'>
          <h4 tabIndex='0'>Request to Become an Account Manager</h4>
          <a className='question' onClick={()=>{this.props.actions.showLearnMorePopUp()}}> What can an Account Manager do ?</a>
          <p className='answer'>
            Submit a request to your Account Owner to gain Account Manager access and abilities. You must be 18 years or older to be an Account Manager.
          </p>
          <div>
           {
             managers.length < 4 ?
              <div>
                <div>
                  <div className='add-manager-fields'>
                     <div className='manager-fn-cont '>
                        <label htmlFor='userId'>First Name</label>
                        <InputField type='text' handleOnChange={(e)=>{this.handleOnChange('firstName',e.target.value)}} placeholder='Name' 
                        analyticstrack="accountmanager-add-fname"name='firstName' value={firstName}/>
                     </div>
                     <div className='manager-ln-cont '>
                         <label htmlFor='userId'>Last Name</label>
                         <InputField type='text' handleOnChange={(e)=>{this.handleOnChange('lastName',e.target.value)}}  placeholder='Name'
                         analyticstrack="accountmanager-add-lname" name='lastName'value={lastName}/>
                     </div>
                 </div>
                </div>
                <div className='row'>
                    <div className='col-sm-3'>
                        <label>Phone Number</label>
                    </div>
                    <div className='p-t-7 col-sm-3'>
                        <p>989.235.3666</p>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-sm-3'>
                        <label>Email Address</label>
                    </div>
                    <div className='p-t-7 col-sm-3'>
                      {
                        this.state.isEditEmailOnAccountMemberSelected  ?
                        <InputField type='text' handleOnChange={(e)=>{this.handleOnChange('emailId',e.target.value)}} 
                        analyticstrack="accountmanager-emailid" placeholder='name@domain.com' name='email' value={emailId}/> :
                        <p>samurai.jack@verizon.com</p>
                      }
                    </div>
                    <div className='col-sm-1'>
                      {
                        this.state.isEditEmailOnAccountMemberSelected  ?
                        <a className='edit-btn' onClick={()=>this.handleSaveNewMemberEmail()} analyticstrack="accountmanager-save">Save</a> :
                        <a className='edit-btn' onClick={()=>this.handleEditNewMemberEmail()} analyticstrack="accountmanager-edit">Edit</a>
                      }
                    </div>
                    <div className='footer col-xs-12'>
                          <a className='btn' role='button' onClick={() => this.props.handleEditCancel('cancelblock')} analyticstrack="accountmanager-cancel">Cancel</a>
                          <button className='btn btn--round'  onClick={(e) =>{this.handleSendRequestForAccountManager(this.state)}} analyticstrack="accountmanager-save">Send Request</button>
                    </div>
                </div>
               </div> :
               <div className='warning'>
                    <p>You may have a maximum of three additional Account Managers at a time. To add a new Account Manger, please remove one first.</p>
                </div>
             }
            </div>
          </div>
        )
  }

  handleEditCancel = () => {
    this.props.handleEditCancel('accountmanagerblock')
    this.props.actions.fetchMtns()
    this.props.actions.fetchManagerRequests()
  }

  toggleLearnMorePopup = () =>{

    if(this.props.showLearnMorePopUp){
      this.props.actions.hideLearnMorePopUp()
    }else {
      this.props.actions.showLearnMorePopUp()
    }
  }
  componentDidMount(){
    this.handleResize()
    window.addEventListener('resize', this.handleResize)
  }

  closeModal = () => {
    // this.props.clearErrorCodes()
    this.setState({
      // errorModal: false,
      modalStatus: false,
      // selectedPhone: null,
      // authorizationCode: ""
    })
  }

  handleResize = () => {
    if(window.innerWidth < 990 && window.innerWidth > 715){
      this.setState({
        moveCancelButton: 1
      })
    } else if (window.innerWidth < 715 ) {
      this.setState({
        moveCancelButton: 2
      })
    }
    else {
      this.setState({
        moveCancelButton: 0
      })
    }
  }

  render() {
    console.log('THIS PROPS', this.props)

    const { firstName, lastName, phoneNumber, emailId } = this.state;
    const { showManagerEdit, managerEditMode,managers,showRequestSuccessPopup } = this.props;
    const editableClassName = managerEditMode ? 'description_box--edit-view' : 'description_box_disabled';
    return (
        <div className={`row description_box ${editableClassName}`}>
          <Popup showPopup={this.state.showPopup} onClosePopup ={()=>{this.handleClosePopup()}} showCrossWires>
              <RevokeAccess handleRevokeAccess={()=>{this.handleRevokeAccess()}} onClosePopup ={()=>{this.handleClosePopup()}}/>
          </Popup>
          <Popup showPopup={this.props.showRequestSuccessPopup}>
              <RequestSent onClosePopup ={()=>{this.props.toggleRequestSuccessPopup()}}/>
          </Popup>
          <Popup showPopup={this.props.showLearnMorePopUp}>
              <AccessRoles onClosePopup ={()=>{this.toggleLearnMorePopup()}}/>
          </Popup>
          <div className='clearfix'></div>
          <div className='body'>
            <div className='col-xs-12 col-sm-4 description_box__header' style={{padding: "0"}} >
              <div className='col-xs-12' style={{padding: "0"}}>
              {this.state.moveCancelButton === 2 && !showManagerEdit && managerEditMode ? <a className='btn btn-anchor' style={{float: 'right'}} onClick={() => this.props.handleEditCancel('cancelblock')}>Cancel</a> : ""}
              
              <h4 tabIndex='0' >Account Managers</h4>
              {/*
                  showManagerEdit && ( accountOwner || accountMember ) &&
                  <div className='description_box__edit description_box__edit_section col-xs-4'>
                    <a className='btn btn-anchor'  onClick={() => this.handleEditCancel()} role='button'>Edit</a>
                  </div> */
              }
              </div>
              <p>Assign Account Managers to let others access and make changes to all information and lines on your account.</p>
            </div>
            <div className='col-xs-12 col-sm-8 description_box__large-container'>
              {
                showManagerEdit && this.getManagersView()
              }
              {
                 !showManagerEdit && managerEditMode &&
                  <div>
                      {this.getManagersEditView()}
                      {this.getAccountManagerRequestsView()}
                      {this.getManagerAddView(managers,firstName, lastName, phoneNumber, emailId)}
                  </div>
              }
              {
                  showManagerEdit && ( accountOwner || accountMember ) &&
                  <div className='description_box__edit description_box__edit_section'>
                    <a className='btn btn-anchor'  onClick={() => this.handleEditCancel()} role='button' analyticstrack="accountmanager-edit" >Edit</a>
                  </div>
              }
            </div>
          </div>
          {/* <Modal
              modalStatus={this.state.errorModal}
              closeModal={this.closeModal}
            >
              <div>{this.handleErrors(this.props.error)}</div>
            </Modal> */}
            <Modal
              modalStatus={this.state.modalStatus}
              closeModal={this.closeModal}
            >
              <SecurePin
                handleSaveType="accountmanagerBlock"
                handleSaveData={{"firstName": this.state.firstName,
                "lastName": this.state.lastName,
                "phoneNumber": this.state.phoneNumber === 'noLineAssigned' ? 'Not Applicable' : this.state.phoneNumber,
                "emailId": this.state.emailId,
                "acctTypeCode": this.state.phoneNumber === 'noLineAssigned' ? 'FAC' : ''}}
                closeModal={this.closeModal}
                handleSave={this.props.handleSave}
                // approveAccountManager={this.state.approveAccountManager}
                // approveAccountManagerFunction={this.handleAppproveAccountManagerRequest}
              />
           </Modal>
        </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    mtns: state.accManagerReducer.mtns,
    //accountManagerRequests: state.accManagerReducer.accountManagerRequests,
    memberEmailId: state.accManagerReducer.emailId,
    memberPhoneNumber: state.accManagerReducer.phoneNumber,
    showLearnMorePopUp: state.accManagerReducer.showLearnMorePopUp,
    securePin: state.security.secretPin,
    isSecurePinValidated: state.security.isSecurePinValidated,
    error: state.security.securePinError
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(AccountManagerBlock)
