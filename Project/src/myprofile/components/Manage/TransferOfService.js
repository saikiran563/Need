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
            <h4 tabIndex="1">Transfer Lines of Service </h4>
            <p>Transfer control of a line to another account, or take responsibility of a line from another account. </p>
          </div>
          {
            showTransferOfServiceEdit && (
              <div>
                  <div className="col-xs-12 col-sm-4">
                  </div>
                  <div className="col-xs-12 col-sm-4 transferofservice-cont">
                    <a
                      className="btn btn--round-invert"
                      role="button"
                      href='https://www.verizonwireless.com/UFDRender/Flows/RelinquishingService'
                    >
                      Transfer  Service
                    </a>
                  </div>
              </div>
            )
          }
          {
            !showTransferOfServiceEdit && transferOfServiceEditMode && (
            <div>
                <div className="col-xs-12 col-sm-4">
                </div>
                {
                  reactGlobals.role.toLocaleLowerCase() !="mobilesecure" &&
                  <div className="col-xs-12 col-sm-4 transferofservice-cont">
                    <a
                      className="btn btn--round-invert"
                      role="button"
                      href='https://www.verizonwireless.com/UFDRender/Flows/RelinquishingService'
                    >
                      Transfer Service
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
