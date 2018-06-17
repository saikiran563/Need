import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from './actions'
import InputField from '../FormElements/InputComponent'
import './style.css'

class AccountManagerBlock extends Component {
  constructor(props) {
    super(props)
    this.state= {
      fName: "",
      lName: ""
    }
  }

  handleOnChange = (e) => {
    this.setState({ user: e.target.value }, () => this.onChangeInput());
  }

  onChangeInput = () => {
    const val = this.state.user;
    const useridInvalidMessages = JSON.parse(JSON.stringify(this.state.useridInvalidMessages));
    if(val.length === 0) {
      this.setState( { requiredError : true,  useridInvalidMessages: [
        { name: '6-60 characters', error: false, type: 'character'},
        { name: 'Not all numbers', error: false, type: 'number' },
        { name: 'Contains no spaces', error: false, type: 'space'}
      ] });
    } else {
      this.setState( { requiredError: false });
        if (val.indexOf(" ") !== -1) {
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
    }
  }

  render() {
    const { fName, lName } = this.state;
    const { passwordInfo, showManagerEdit, showGreetingEdit } = this.props;
    return (
        <div className='row description_box'>
          <div className="clearfix"></div>
          <div className="body">
            <div className="col-xs-12 col-sm-4 description_box__header">
              <h4 tabIndex="0">Account Managers</h4>
              <p>This is a Sample description</p>
            </div>
            <div className="col-xs-12 col-sm-8 description_box__large-container">
              { showManagerEdit &&
                 <div>
                  <div className="row owner-info">
                      <h4 tabIndex="0">Firstname Lastname( Account Owner )</h4>
                      <p>xxx.xxx.xxx</p>
                      <p>name@domain.com</p>
                  </div>
                  <div className="row owner-info-second">
                      <h4 tabIndex="0">Firstname Lastname</h4>
                      <p>xxx.xxx.xxx</p>
                      <p>name@domain.com</p>
                  </div>
                </div>
               }
               {
                 !showManagerEdit &&
                  <div>
                  <div className="row">
                      <h1>Current Account Manager</h1>
                  </div>
                   <div className="row owner-info">
                       <h4 tabIndex="0">Firstname Lastname( Account Owner )</h4>
                       <p>xxx.xxx.xxx</p>
                       <p>name@domain.com</p>
                   </div>
                   <div className="row owner-info-second">
                        <div className="row col-xs-12 col-sm-11">
                            <h4 tabIndex="0">Firstname Lastname</h4>
                            <p>xxx.xxx.xxx</p>
                            <p>name@domain.com</p>
                        </div>
                        <div className="row col-xs-12 col-sm-1">
                             <a className="btn btn-anchor"  onClick={() => this.props.handleEditCancel('cancelblock')} role="button">Remove</a>
                        </div>
                   </div>
                   <div className="row add-manager-cont">
                       <h4 tabIndex="0">Add Account Managers</h4>
                       <a className='question'> What can an Account Manager do ?</a>
                       <p className='answer'>
                          Lorem Ipusm Lorem Ipusm Lorem Ipusm Lorem Ipusm Lorem Ipusm Lorem Ipusm Lorem Ipusm Lorem Ipusm Lorem Ipusm Lorem Ipusm Lorem Ipusm Lorem Ipusm
                       </p>
                       <div>
                           <div className="add-manager-fields">
                              <div className="manager-fn-cont ">
                                 <label htmlFor="userId">First Name</label>
                                 <InputField type="text" handleOnChange={()=>{}} placeholder="Name" name="fName" value={fName}/>
                              </div>
                              <div className="manager-ln-cont ">
                                  <label htmlFor="userId">Last Name</label>
                                  <InputField type="text" handleOnChange={()=>{}} placeholder="Name" name="lName"value={lName}/>
                              </div>

                           </div>
                       </div>
                   </div>
                 </div>
                }
                {
                  showManagerEdit &&
                  <div className="description_box__edit description_box__edit_section">
                    <a className="btn btn-anchor"  onClick={() => this.props.handleEditCancel('manageblock')} role="button">Edit</a>
                  </div>
                }
                {
                  !showManagerEdit &&
                  <div className="description_box__edit description_box__edit_section">
                    <a className="btn btn-anchor"  onClick={() => this.props.handleEditCancel('cancelblock')} role="button">Cancel</a>
                  </div>
                }
            </div>
          </div>
        </div>
    )
  }
}

export default AccountManagerBlock;
