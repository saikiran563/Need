import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from './actions'
import InputField from '../FormElements/InputComponent'
import './style.css'

class TransferofService extends Component {  
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
                {
                  reactGlobals.role.toLocaleLowerCase() !="am" &&
                  <div className="col-xs-12 col-sm-4 transferofService-cont">
                    <a
                      className="btn btn--round-invert"
                      role="button"
                      href='https://www.verizonwireless.com/UFDRender/Flows/RelinquishingService'
                    >
                      Transfer of Service
                    </a>
                  </div>
                }
            </div>
            )
          }

        </div>
      </div>
    )
  }
}

export default TransferofService;
