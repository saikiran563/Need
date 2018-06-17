import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from './actions'
import InputField from '../FormElements/InputComponent'
import './style.css'

class PasswordBlock extends Component {
  constructor(props) {
    super(props)
    this.state= {
      requiredError: true,
      touched: false,
      useridInvalidMessages: [
        { name: '6-60 characters', error: false, type: 'character'},
        { name: 'Not all numbers', error: false, type: 'number' },
        { name: 'Contains no spaces', error: false, type: 'space'}
      ],
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
    const { controlButtons, useridInvalidMessages, useridValid, requiredError } = this.state;
    const { passwordInfo, showPasswordEdit, passwordEditMode } = this.props;

    const editableClassName = passwordEditMode ? "" : "description_box_disabled";
    
    return (
        <div className={`row description_box ${editableClassName}`}>
            <div className="clearfix"></div>
            <div className="body">
              <div className="col-xs-12 col-sm-4 description_box__header">
                <h4 tabIndex="0">{passwordInfo.title}</h4>
                <p>{passwordInfo.desc}</p>
              </div>
              <div className="col-xs-12 col-sm-8 description_box__large-container">
                <div className="row">
                  <div className="col-xs-12 description_box__details">
                    {
                      showPasswordEdit &&  <div className="description_box__read">
                        <p>{passwordInfo.read}</p>
                      </div>
                   }
                     {
                   !showPasswordEdit && passwordEditMode && <div className="description_box__form">
                      <div className="row">
                        <div className="col-xs-12 col-sm-5">
                          <div className="form-group">
                              <label htmlFor="userId">User ID</label>
                              <InputField type="text" handleOnChange={this.handleOnChange} placeholder="User id" name="userid" valid={requiredError} />
                              <p className="help-block">If avaliable, you may use you're email Address as your UserID.</p>
                          </div>
                        </div>
                        <div className="col-xs-12 col-sm-6">
                          <h3>User ID Requirements</h3>
                          <ul className="fieldErrors">
                            {
                              useridInvalidMessages.map((message) => {
                                return ( 
                                  <li key={message.name}>
                                    {!requiredError &&
                                        ( message.error ? <span className="text-danger"><i className="fa fa-check-circle"></i></span> : 
                                    <span className="text-success"><i className="fa fa-check-circle"></i></span>)  }
                                    {requiredError && <span><i className="fa fa-check-circle"></i></span>}
                                    {message.name}
                                  </li>
                                )
                              })
                            }
                          </ul>
                        </div>
                      </div>
                    </div>
  }
                  </div>
                  {
                      showPasswordEdit &&  <div className="description_box__edit description_box__edit_section">
                        <a className="btn btn-anchor"  onClick={() => this.props.handleEditCancel('passwordblock')} role="button">Edit</a>
                      </div>
                 }
                </div>
              </div>
            </div>
            {
               !showPasswordEdit && passwordEditMode && <div className="footer col-xs-12">
                  <a className="btn btn--round-invert" role="button"  onClick={() => this.props.handleEditCancel('cancelblock')}>Cancel</a>
                  <button className="btn btn--round" disabled={requiredError}>Save Changes</button>
                </div>
             }
        </div>
    )
  }
}

export default PasswordBlock;
