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
    const { showGreetingEdit } = this.props;
    return (
      <div className='row description_box'>
        <div className="clearfix"></div>
        <div className="body">
          <div className="col-xs-12 col-sm-4 description_box__header">
            <h4 tabIndex="0">Greeting Name</h4>
            <p>Short Description</p>
          </div>
          <div className="col-xs-12 col-sm-8 description_box__large-container">
              { showGreetingEdit &&
                 <div>
                  <p>Name</p>
                </div>
               }
               { !showGreetingEdit &&
                  <div>
                    <div className="greeting-fields col-md-5">
                        <label >Change Greeting Name</label>
                        <InputField type="text" handleOnChange={this.handleOnChange} placeholder="Name" name="greeting" valid={requiredError} />
                    </div>
                    <div className="greeting-fields col-md-5">
                         <label>Greeting Name Requirements</label>

                    </div>
                 </div>
                }
               {
                 showGreetingEdit &&
                 <div className="description_box__edit description_box__edit_section">
                   <a className="btn btn-anchor"  onClick={() => this.props.handleEditCancel('greetingblock')} role="button">Edit</a>
                 </div>
               }
               {
                 !showGreetingEdit &&
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

export default PasswordBlock;
