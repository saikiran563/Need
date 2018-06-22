import React, { Component } from 'react'
import InputField from '../FormElements/InputComponent'
import './style.css'

class BillingAddressBlock extends Component {
  constructor(props) {
    super(props)
    this.state = {
      firstAddressLine: "",
      secondAddressLine: "",
      requiredError: true,
      isValid: '',
      istouched: false,
      useridInvalidMessages: [
        { name: '6-60 characters', error: false, type: 'character' }
      ],
    }
  }

//   handleOnChange = (e) => {
//     this.setState({ userId: e.target.value }, () => this.onChangeInput());
//   }

//   onChangeInput = () => {
//     this.setState({istouched: true});
//     const val = this.state.userId;
//     const useridInvalidMessages = JSON.parse(JSON.stringify(this.state.useridInvalidMessages));
//     if (val.length === 0) {
//       this.setState({
//         requiredError: true, isValid: false, useridInvalidMessages: [
//           { name: '6-60 characters', error: false, type: 'character' },
//           { name: 'Not all numbers', error: false, type: 'number' },
//           { name: 'Contains no spaces', error: false, type: 'space' }
//         ]
//       });
//     } else {
//       this.setState({ requiredError: false });
//       if(val.length < 6 || val.length > 60) {
//          let inavlidMessage = useridInvalidMessages.find(message => message.type === 'character');
//         inavlidMessage.error = true;
//         this.setState({ useridInvalidMessages });
//       } else {
//         let inavlidMessage = useridInvalidMessages.find(message => message.type === 'character');
//         inavlidMessage.error = false;
//         this.setState({ useridInvalidMessages });
//       }
//       if (val.indexOf(" ") !== -1) {
//         let inavlidMessage = useridInvalidMessages.find(message => message.type === 'space');
//         inavlidMessage.error = true;
//         this.setState({ useridInvalidMessages });
//       } else {
//         let inavlidMessage = useridInvalidMessages.find(message => message.type === 'space');
//         inavlidMessage.error = false;
//         this.setState({ useridInvalidMessages });
//       }
//       if (val.match(/^\d*[a-zA-Z]{1,}\d*/)) {
//         let inavlidMessage = useridInvalidMessages.find(message => message.type === 'number');
//         inavlidMessage.error = false;
//         this.setState({ useridInvalidMessages });
//       } else {
//         let inavlidMessage = useridInvalidMessages.find(message => message.type === 'number');
//         inavlidMessage.error = true;
//         this.setState({ useridInvalidMessages });
//       }
//     }
//   }

  render() {
    const {  useridInvalidMessages, requiredError, firstAddressLine, secondAddressLine } = this.state;
     const { userBillingInfo, showUserEdit, billingAddressEditMode } = this.props;
//    const isValid = !useridInvalidMessages.find(user => user.error)
     const editableClassName = billingAddressEditMode ? "" : "description_box_disabled";
    return (
     <div className={`row description_box ${editableClassName}`}>
                    <div className="col-xs-12 col-sm-4 description_box__header">
                        <h4 tabIndex="0">{userBillingInfo.title}</h4>
                        <p>{userBillingInfo.desc}</p>
                    </div>
                    <div className="col-xs-12 col-sm-8 description_box__large-container">
                        <div className="row">

                                <div className="col-xs-12 col-sm-10 description_box__details">
                                {
                                    showEmailEdit &&  <div className="description_box__read">

                                        <p>{userBillingInfo.read}</p>

                                    </div>
                                }
                                {
      !showEmailEdit && userEditMode && <div className="description_box__form">
                    <div className="row">
                      <div className="col-xs-12 col-sm-5">
                        <div className="form-group email-block-input">
                          <label htmlFor="email">Change Email Address</label>
                          <InputField type="text" handleOnChange={this.handleOnChange} placeholder="name@domain.com" name="emailid" valid={isValid} touched={this.state.istouched} value={userEmail} />
                        </div>
                      </div>
                    </div>
                  </div>
                }
              </div>
              {
                showEmailEdit && <div className="description_box__edit description_box__edit_section">
                  <a className="btn btn-anchor" onClick={() => this.props.handleEditCancel('emailBlock')} role="button">Edit</a>
                </div>
              }
            </div>
          </div>
      
        {
          !showEmailEdit && userEditMode && <div className="footer col-xs-12">
            <a className="btn btn--round-invert" role="button" onClick={() => this.handleOnEditCancel('cancelBlock')}>Cancel</a>
            <button className="btn btn--round" disabled={requiredError} onClick={() => this.props.handleSave('emailBlock', userEmail, event)}>Save Changes</button>
          </div>
        }
      </div>
);
  }
}

export default BillingAddressBlock;
