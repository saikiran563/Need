import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from './actions'
import InputField from '../FormElements/InputComponent'
import './style.css'

class TransferofService extends Component {
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

    const { showTransferOfServiceEdit, transferOfServiceEditMode } = this.props;
    const editableClassName = transferOfServiceEditMode ? "description_box--edit-view" : "description_box_disabled";
    return (
        <div className={`row description_box ${editableClassName}`}>
        <div className="clearfix"></div>
        <div className="body row">
          <div className="col-xs-12 col-sm-4 description_box__header">
            <h4 tabIndex="0">Transfer of service </h4>
            <p>[Short Description of what it is and how it's used.] </p>
          </div>
          {
            showTransferOfServiceEdit && (
              <div>
                  <div className="col-xs-12 col-sm-4">
                    <p>Transfer of Service Lorem Ipsum</p>
                  </div>
                  <div className="col-xs-12 col-sm-4 transferofService-cont">
                    <a
                      className="btn btn--round-invert"
                      role="button"
                      href='https://www.verizonwireless.com/UFDRender/Flows/RelinquishingService'
                    >
                      Transfer of Service
                    </a>
                  </div>
              </div>
            )
          }
          {
            !showTransferOfServiceEdit && transferOfServiceEditMode && (
            <div>
                <div className="col-xs-12 col-sm-4">
                  <p>Transfer of Service Lorem Ipsum</p>
                </div>
                <div className="col-xs-12 col-sm-4 transferofService-cont">
                  <a
                    className="btn btn--round-invert"
                    role="button"
                    href='https://www.verizonwireless.com/UFDRender/Flows/RelinquishingService'
                  >
                    Transfer of Service
                  </a>
                </div>
            </div>
            )
          }

        </div>
      </div>
    )
  }
}

export default TransferofService;
