import React, { Component } from "react"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import * as actions from "./actions"
import InputField from "../FormElements/InputComponent"
import "./style.css"

class AccountManagerBlock extends Component {
  constructor(props) {
    super(props)
    this.state= {
      firstName:"",
      lastName: "",
      phoneNumber: "",
      emailId:""
    }
  }

  handleOnChange = (inputType,inputValue) => {
    this.setState({ [inputType]: inputValue }, () => this.onChangeInput());
  }

  onChangeInput = () => {
    // All  the validations goes here
  /*  const val = this.state.user;
    const useridInvalidMessages = JSON.parse(JSON.stringify(this.state.useridInvalidMessages));
    if(val.length === 0) {
      this.setState( { requiredError : true,  useridInvalidMessages: [
        { name: "6-60 characters", error: false, type: "character"},
        { name: "Not all numbers", error: false, type: "number" },
        { name: "Contains no spaces", error: false, type: "space"}
      ] });
    } else {
      this.setState( { requiredError: false });
        if (val.indexOf(" ") !== -1) {
          let inavlidMessage =  useridInvalidMessages.find(message => message.type === "space");
            inavlidMessage.error = true;
            this.setState({ useridInvalidMessages });
        } else {
            let inavlidMessage =  useridInvalidMessages.find(message => message.type === "space");
            inavlidMessage.error = false;
            this.setState({ useridInvalidMessages });
        }
        if (val.match(/^([^0-9]*)$/)) {
            let inavlidMessage =  useridInvalidMessages.find(message => message.type === "number");
            inavlidMessage.error = false;
            this.setState({ useridInvalidMessages });
        } else {
          let inavlidMessage =  useridInvalidMessages.find(message => message.type === "number");
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
              if(eachManager.type === 'accontOwner'){
                return(
                  <div>
                     <div className="row owner-info">
                         <h4 tabIndex="0">Firstname Lastname( Account Owner )</h4>
                         <p>{eachManager.phoneNumber}</p>
                         <p>{eachManager.emailId}</p>
                     </div>
                  </div>
                )
              }
              return(
                <div className="row owner-info-second">
                     <div className="row col-xs-12 col-sm-11">
                         <h4 tabIndex="0">{ eachManager.firstName } { eachManager.lastName }</h4>
                         <p>{eachManager.phoneNumber}</p>
                         <p>{eachManager.emailId}</p>
                     </div>
                </div>
              )
            })
          }
        </div>
    )
  }

  getManagersEditView(){
    const { managers } = this.props
    return(
        <div>
          {
            managers.map((eachManager)=>{
              if(eachManager.type === 'accontOwner'){
                return(
                  <div>
                    <div className="row">
                        <h1>Current Account Manager</h1>
                    </div>
                     <div className="row owner-info">
                         <h4 tabIndex="0">Firstname Lastname( Account Owner )</h4>
                         <p>{eachManager.phoneNumber}</p>
                         <p>{eachManager.emailId}</p>
                     </div>
                  </div>
                )
              }
              return(
                <div className="row owner-info-second">
                     <div className="row col-xs-12 col-sm-11">
                         <h4 tabIndex="0">{ eachManager.firstName } { eachManager.lastName }</h4>
                         <p>{eachManager.phoneNumber}</p>
                         <p>{eachManager.emailId}</p>
                     </div>
                     <div className="row col-xs-12 col-sm-1">
                          <a className="btn btn-anchor"  onClick={() => this.props.handleEditCancel("cancelblock")} role="button">Remove</a>
                     </div>
                </div>
              )
            })
          }
        </div>
    )
  }

  render() {
    const { firstName, lastName, phoneNumber, emailId } = this.state;
    const { passwordInfo, showManagerEdit, showGreetingEdit,managers } = this.props;
    //const editableClassName = showManagerEdit ? "" : "description_box_disabled";
    return (
        <div className="row description_box">
          <div className="clearfix"></div>
          <div className="body">
            <div className="col-xs-12 col-sm-4 description_box__header">
              <h4 tabIndex="0">Account Managers</h4>
              <p>[Account Managers can manage all lines on the account in retail stores and by calling Customer Service.]</p>
            </div>
            <div className="col-xs-12 col-sm-8 description_box__large-container">
              {
                showManagerEdit && this.getManagersView()
               }
               {
                 !showManagerEdit &&
                  <div>
                    {this.getManagersEditView()}
                     <div className="row add-manager-cont">
                         <h4 tabIndex="0">Add Account Managers</h4>
                         <a className="question"> What can an Account Manager do ?</a>
                         <p className="answer">
                           An Account Manager does NOT have to have a mobile number on your
                           account. By providing a name only, they will be able to manage all lines
                            on the account in retails stores and by calling Customer Service.
                         </p>
                <div>
                    { managers.length < 4 ?
                       <div>
                         <div>
                           <div className="add-manager-fields">
                              <div className="manager-fn-cont ">
                                 <label htmlFor="userId">First Name</label>
                                 <InputField type="text" handleOnChange={(e)=>{this.handleOnChange('firstName',e.target.value)}} placeholder="Name" name="firstName" value={firstName}/>
                              </div>
                              <div className="manager-ln-cont ">
                                  <label htmlFor="userId">Last Name</label>
                                  <InputField type="text" handleOnChange={(e)=>{this.handleOnChange('lastName',e.target.value)}}  placeholder="Name" name="lastName"value={lastName}/>
                              </div>
                          </div>
                         </div>
                         <div>
                              <p>If you assign a mobile number and email address, the Account
                                  Manager will be given My Verizon Online access to your account.</p>
                          </div>
                          <div className="contact-cont">
                              <div>
                                <h4>Mobile Number</h4>
                                <select>
                                    <option>No Line Assigned</option>
                                </select>
                              </div>
                              <div>
                                  <h4>Email Address</h4>
                                  <InputField type="text" handleOnChange={(e)=>{this.handleOnChange('emailId',e.target.value)}} placeholder="name@domain.com" name="email" value={emailId}/>
                              </div>
                          </div>
                          <div className="footer col-xs-12">
                            <a className="btn btn--round-invert" role="button" onClick={() => this.props.handleEditCancel("cancelblock")}>Cancel</a>
                            <button className="btn btn--round"  onClick={(e) => this.props.handleSave('accountManagerBlock', this.state, e)}>Add Manager</button>
                          </div>
                        </div> :
                        <div className='warning'>
                             <p>You may have a maximum of three additional Account Managers at a time. To add a new Account Manger, please remove one first.</p>
                         </div>
                      }
                     </div>
                </div>
                 </div>
                }
                {
                  showManagerEdit &&
                  <div className="description_box__edit description_box__edit_section">
                    <a className="btn btn-anchor"  onClick={() => this.props.handleEditCancel("manageblock")} role="button">Edit</a>
                  </div>
                }
            </div>
          </div>
        </div>
    )
  }
}

export default AccountManagerBlock;
