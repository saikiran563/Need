import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from './actions'
import InputField from '../FormElements/InputComponent'
import './style.css'
import Popup from './Popup/Popup'
import RevokeAccess from './Popup/RevokeAccess'
import RequestSent  from './Popup/RequestSent'

const MAXIMUM_ACCOUNT_MANAGERS = 3

class AccountManagerBlock extends Component {
  constructor(props) {
    super(props)
    this.state = this.getinitialState()
  }

  getAccountManagerRequestCard=(request)=>{
    const { managers } = this.props
    const isMaxManagersReached = managers.length > MAXIMUM_ACCOUNT_MANAGERS
    if( isMaxManagersReached == false ){
      return(
        <div key={request.phoneNumber}>
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
      phoneNumber: '',
      emailId: '',
      showPopup: false,
      managerToRemove: {},
      isEditEmailOnAccountMemberSelected: false
    }
}

  handleClosePopup(){
    this.setState({
      showPopup: false
    })
  }

  handleRevokeAccess(){
    this.handleClosePopup()
   this.props.handleRemoveManager(this.state.managerToRemove)
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

  getManagersView(){
    const { managers } = this.props
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
              return(
                <div className='row owner-info-second' key={eachManager.phoneNumber}>
                     <div className='row col-xs-12 col-sm-11'>
                         <h4 className='manager-name'>{ eachManager.firstName } { eachManager.lastName }</h4>
                         <p>{eachManager.phoneNumber}</p>
                         <p>{eachManager.emailId}</p>
                     </div>
                       {
                         this.props.addedManager.phoneNumber  === eachManager.phoneNumber &&
                         <span className='text-success fa fa-check-circle'> Added </span>
                       }
                </div>
              )
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
    return(
        <div>
          {
            managers.map((eachManager)=>{
              if(eachManager.role === 'accountHolder'){
                return(
                  <div key={eachManager.phoneNumber}>
                    <div className='row'>
                        <div className='row col-xs-12 col-sm-1 col-md-11'>
                            <h1>Current Account Manager</h1>
                        </div>
                      <div className='row col-xs-12 col-sm-1 col-md-1'>
                           <a className='btn btn-anchor'  onClick={() => this.props.handleEditCancel('cancelblock')}>Cancel</a>
                      </div>
                    </div>
                     <div className='row owner-info'>
                         <h4 className='manager-name'>{eachManager.firstName+ ' '+ eachManager.lastName}( Account Owner )</h4>
                         <p>{eachManager.phoneNumber}</p>
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
                             <p>{eachManager.phoneNumber}</p>
                             <p>{eachManager.emailId}</p>
                         </div>
                         {
                           reactGlobals.role.toLocaleLowerCase()=='ao' &&
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
                  <p className='undo-message'>Account Manager { revokedManager.firstName  + ' '+ revokedManager.lastName } revoked</p>
                </div>
                <div className='row col-xs-12 col-sm-1'>
                    <a className='undo' role='button' onClick={() => this.props.handleUndoRevoke()}>Undo</a>
                </div>
              </div>
          }
        </div>
    )
  }

  // <div className='undo-cont' style={{display:'inline-flex',marginLeft:'38%'}}>
  //     <span className='text-success fa fa-check-circle' style={{paddingTop:'18px'}}></span>
  //     <p style={{paddingLeft:'2%',paddingTop:'18px'}}>Account Manager Firstname Lastname removed</p>
  //     <a className='undo' role='button' onClick={() => this.props.handleUndoRevoke()}>Undo</a>
  // </div>
  // <div className='row col-xs-12 col-sm-11'>
  //     <h4 tabIndex='0'>{ eachManager.firstName } { eachManager.lastName }</h4>
  //     <p>{eachManager.phoneNumber}</p>
  //     <p>{eachManager.emailId}</p>
  // </div>
  // <div className='row col-xs-12 col-sm-1'>
  //      <a className='btn btn-anchor'  onClick={() => this.showConfirmPopUp(eachManager)} role='button'>Remove</a>
  // </div>


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
    this.props.handleDenyAccountManagerRequest(newRequest)
  }

  handleAppproveAccountManagerRequest(newRequest){
    this.props.handleAppproveAccountManagerRequest(newRequest)
  }

  getAccountManagerRequestsView(){
    if(reactGlobals.role.toLocaleLowerCase()=='am') return <div /> // Account Members do not see pending requests
    const { accountManagerRequests, deniedAccountManagerRequests } = this.props
    if(accountManagerRequests.length || deniedAccountManagerRequests){
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

  handleSave = (e)=>{
    this.props.handleSave('accountManagerBlock', this.state, e)
    this.setState(this.getinitialState())
  }

  getManagerAddView( managers, firstName, lastName, phoneNumber, emailId ){
    if(reactGlobals.role.toLocaleLowerCase()=='ao'){
    return(
      <div className='row add-manager-cont'>
          <h4 tabIndex='0'>Add Account Managers</h4>
          <a className='question'> What can an Account Manager do ?</a>
          <p className='answer'>
            An Account Manager does NOT have to have a mobile number on your
            account. By providing a name only, they will be able to manage all lines
             on the account in retails stores and by calling Customer Service.
          </p>
          <div>
           {
             managers.length < 4 ?
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
                   <button className='btn btn--round'  onClick={(e) =>this.handleSave(e)}>Add Manager</button>
                 </div>
               </div> :
               <div className='warning'>
                    <p>You may have a maximum of three additional Account Managers at a time. To add a new Account Manger, please remove one first.</p>
                </div>
             }
            </div>
          </div>
        ) }

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
            <h3 className='account-manager-request-pending'>
                You have one (1) request currently pending. Please contact your Account Owner for updates on open requests.
            </h3>
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
          <a className='question'> What can an Account Manager do ?</a>
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
                        <InputField type='text' handleOnChange={(e)=>{this.handleOnChange('firstName',e.target.value)}} placeholder='Name' name='firstName' value={firstName}/>
                     </div>
                     <div className='manager-ln-cont '>
                         <label htmlFor='userId'>Last Name</label>
                         <InputField type='text' handleOnChange={(e)=>{this.handleOnChange('lastName',e.target.value)}}  placeholder='Name' name='lastName'value={lastName}/>
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
                        <InputField type='text' handleOnChange={(e)=>{this.handleOnChange('emailId',e.target.value)}} placeholder='name@domain.com' name='email' value={emailId}/> :
                        <p>samurai.jack@verizon.com</p>
                      }
                    </div>
                    <div className='col-sm-1'>
                      {
                        this.state.isEditEmailOnAccountMemberSelected  ?
                        <a className='edit-btn' onClick={()=>this.handleSaveNewMemberEmail()}>Save</a> :
                        <a className='edit-btn' onClick={()=>this.handleEditNewMemberEmail()}>Edit</a>
                      }
                    </div>
                    <div className='footer col-xs-12'>
                          <a className='btn' role='button' onClick={() => this.props.handleEditCancel('cancelblock')}>Cancel</a>
                          <button className='btn btn--round'  onClick={(e) =>{this.props.handleSendRequestForAccountManager(this.state)}}>Send Request</button>
                    </div>
                    {/*
                      this.state.isEditEmailOnAccountMemberSelected ?
                      <div className='row'>
                        <div className='col-sm-6'>
                          <InputField type='text' handleOnChange={(e)=>{this.handleOnChange('emailId',e.target.value)}} placeholder='name@domain.com' name='email' value={emailId}/> :
                        </div>
                        <div className='col-sm-6'>
                          <p>samurai.jack@verizon.com</p> <a>edit </a>
                        </div>
                      </div>   :
                      <div className='row col-sm-6'>
                        <div className='col-sm-6'>
                          <InputField type='text' handleOnChange={(e)=>{this.handleOnChange('emailId',e.target.value)}} placeholder='name@domain.com' name='email' value={emailId}/> :
                        </div>
                        <div className='col-sm-6'>
                          <p>samurai.jack@verizon.com</p> <a>edit </a>
                        </div>
                      </div>
                    */}
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

  render() {
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
          <div className='clearfix'></div>
          <div className='body'>
            <div className='col-xs-12 col-sm-4 description_box__header'>
              <h4 tabIndex='0'>Account Managers</h4>
              <p>[Account Managers can manage all lines on the account in retail stores and by calling Customer Service.]</p>
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
                  showManagerEdit &&
                  <div className='description_box__edit description_box__edit_section'>
                    <a className='btn btn-anchor'  onClick={() => this.props.handleEditCancel('accountManagerblock')} role='button'>Edit</a>
                  </div>
              }
            </div>
          </div>
        </div>
    )
  }
}

export default AccountManagerBlock;
