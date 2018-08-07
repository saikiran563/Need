import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from './actions'
import InputField from '../FormElements/InputComponent';
import Modal from "../Modal/modal";
import axios from "axios";
import './style.css'

class SecurityQuestionBlock extends Component {
  constructor(props) {
    super(props)
    this.state = {
      requiredError: true,
      userId: "1234", /*props.userId,*/
      isValid: '',
      isCurrentPinValid: '',
      istouched: false,
      currentQuestion: "", newQuestion: "", newAnswer: "",
      errorMessages: [
        { name: '3-40 characters in length', error: false, type: 'minmax' },
        { name: 'Letters, numbers, spaces, and/or periods (.) only', error: false, type: 'onCharset' }
      ],
      modalStatus: false,
      selectedPhone: null,
      listOfAccountNumbersModal: false,
      authorizationCodeModal: false,
      finalAuthorizationModal: false,
      authorizationCode: "",
      afterGetRequest: [],
      wrongCodeErrorMessage: ""
    }
  }

  componentDidMount(){
    this.setState({
      newQId: this.props.metaBlock.qId
    })
  }

  handleOnChange = (e) => {
    var value = e.target.value;
    if (value.length > 40) return;
    this.setState({ newAnswer: value }, () => this.onChangeInput());
  }

  handleOnSave = (e) => {
    let { newAnswer, requiredError, newQuestion } = this.state;  
      if (!requiredError) {
        this.props.handleSave('questionForm', { newAnswer, newQuestion }, event)
   
     }   
  }

  handleOnChangeCurrentPin = (e) => {
    this.setState({ currentQuestion: e.target.value });
  }

  onChangeInput = () => {
    const newques = this.state.newAnswer;
    this.setState({ istouched: true });
    const errorMessages = JSON.parse(JSON.stringify(this.state.errorMessages));
    if (newques.length === 0) {
      this.setState({
        requiredError: true, istouched: false, isValid: false, errorMessages: [
          { name: '3-40 characters in length', error: false, type: 'minmax' },
          { name: 'Letters, numbers, spaces, and/or periods (.) only', error: false, type: 'onCharset' }
        ]
      });
    } else {
      this.setState({ requiredError: false });
      if (newques.length < 3 || newques.length > 40) {
        let inavlidMessage = errorMessages.find(message => message.type === 'minmax');
        inavlidMessage.error = true;
        this.setState({ errorMessages });
      } else {
        let inavlidMessage = errorMessages.find(message => message.type === 'minmax');
        inavlidMessage.error = false;
        this.setState({ errorMessages });
      }

      if (newques.match(/^[a-zA-Z0-9]+(?:[ .][a-zA-Z0-9]+)?$/)) {
        let inavlidMessage = errorMessages.find(message => message.type === 'onCharset');
        inavlidMessage.error = false;
        this.setState({ errorMessages });
      } else {
        let inavlidMessage = errorMessages.find(message => message.type === 'onCharset');
        inavlidMessage.error = true;
        this.setState({ errorMessages });
      }
    }
  }

  onQuestionChange = (e) => {
    this.setState({
      newQId: e.target.value
    });
  }

  getQuestions = (selectedVal) => {
    return (
      <select className="state-select" name="USA State" onChange={this.onQuestionChange} defaultValue={selectedVal} analyticstrack="secqueblock-selList">
        {
          this.props.questionBlock.map((que) => {
            return (<option key={que.Id} value={que.Id} analyticstrack={`secqueblock-option${que.Id}`}>{que.Question}</option>)
          })
        }
      </select>
    )
  }

  closeModal = () => {
    this.setState({
      modalStatus: false,
      selectedPhone: null,
      authorizationCode: ""
    })
  }

  saveChangesClickedHandler = () => {
    axios.get("http://www.mocky.io/v2/5b6354f93000005a006503c7").then(res => {
      this.setState({
        modalStatus: true,
        listOfAccountNumbersModal: true,
        afterGetRequest: res.data.data.deviceList
      })
    })
  }

  sendCodeToPhoneHandler = () => {
    axios.post("http://www.mocky.io/v2/5b6354f93000005a006503c7", {phoneNumber: this.state.selectedPhone.mtn, authCode: "11223344"})
      .then(res => {
        const data = JSON.parse(res.config.data)
        this.setState({
          listOfAccountNumbersModal: false,
          authorizationCodeModal: true,
          authCode: data.authCode
        })
      })
  }

  authorizationCodeConformation = event => {
    const { newQId, newAnswer } = this.state;
    if(this.state.authorizationCode === this.state.authCode){
      this.props.handleSave('questionForm', {challengeQuestionID: newQId, challengeAnswer: newAnswer}, event)
      this.setState({
        authorizationCodeModal: false,      
        listOfAccountNumbersModal: false,
        finalAuthorizationModal: true,
      })
    } else {
      this.setState({
        wrongCodeErrorMessage: "Invalid code."        
      })
      setTimeout(() => {
        this.setState({
          wrongCodeErrorMessage: ""        
        })
      }, 2000)
    }
  }

  handleAuthCodeChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    })
  }

  handleRadioInputChange = event => {
    const afterGetRequest = this.state.afterGetRequest.map(el => {
      if (el.formattedMtn == event.target.name) {
        this.setState({ selectedPhone: el })
        return Object.assign({}, el, { picked: true })
      } else {
        return Object.assign({}, el, { picked: false })
      }
    })
    this.setState({ afterGetRequest })
  }

  renderModalContent(){
    if(this.state.listOfAccountNumbersModal){
      return (
        <div>
        <h1 className="title title--lg">Which device should we send the code to?</h1>
        <p>For the security of your account, we ask that you complete an online authorization step before you continue with your request.</p>
        <p>Select the device where we can send you the online authorization code.</p>
        {this.state.afterGetRequest.map(item => {
          if(item.securePinEligible){
            return (
              <p key={item.formattedMtn}>
                <input
                  type="radio"
                  value={item.picked || false}
                  onChange={this.handleRadioInputChange}
                  name={item.formattedMtn}
                  id={`phoneLine-${item.formattedMtn}`}
                  checked={item.picked || false}
                />
                <label htmlFor={`phoneLine-${item.formattedMtn}`}>
                  {/* <span className="a-block">{item.name}</span> */}
                  <span className="a-block">{item.formattedMtn}</span>
                </label>
              </p>
            )
          }
        }
        )}
        <button
          className="btn btn--round"
          disabled={!this.state.selectedPhone}
          style={{ marginRight: "10px" }}
          onClick={this.sendCodeToPhoneHandler}
        >
          Send Code
          </button>
        <button
          className="btn btn--round-invert"
          onClick={this.closeModal}
        >
          Cancel
        </button>
      </div>
      )
    } else if (this.state.authorizationCodeModal){
      return (
        <div>
          <h1 className="title title--lg">Now enter your authorization code below.</h1>
          <p>We just texted you a new code. You should receive your code in less than a minute.</p>
          <p><strong>Authorization Code (all numeric):</strong></p>
          <input
            type="text"
            value={this.state.authorizationCode}
            name="authorizationCode"
            onChange={this.handleAuthCodeChange}
            style={{marginBottom: this.state.wrongCodeErrorMessage ? "0" : ""}}
          />
          <p style={{color: "red"}} >
          {this.state.wrongCodeErrorMessage}
          </p>
          <button
            className="btn btn--round"
            disabled={!this.state.authorizationCode || isNaN(parseInt(this.state.authorizationCode)) || this.state.authorizationCode.length < 6 }
            style={{ marginRight: "10px" }}
            onClick={this.authorizationCodeConformation}
          >
            Confirm
            </button>
          <button
            className="btn btn--round-invert"
            onClick={this.closeModal}
          >
            Cancel
            </button>
        </div>
      )
    } else {
      return (
        <div>
          <p>Your Account Managers have been updated.</p>
          <p>Account Manager(s) added.</p>
          {this.state.selectedPhone ? (
            <div>
              {/* <p>{this.state.selectedPhone.name}</p>  */}
              <p>{this.state.selectedPhone.formattedMtn}</p> 
            </div>
          ): ""}


          <button
            className="btn btn--round"
          >
            Confirm
            </button>
        </div>
      )
    }
  }

  render() {
    const { controlButtons, errorMessages, userId, requiredError, istouched,
      currentQuestion, newQuestion, newQId, newAnswer, isCurrentPinValid } = this.state;
    const { questionInfo, showQuestionEdit, questionEditMode, questionSaved, questionBlock, metaBlock } = this.props;
    const isValid = !errorMessages.find(user => user.error) && newAnswer.length > 0;
    const isCPValid = isCurrentPinValid;
    let errorDisplay;
    let errorMsg;
    if (questionSaved) {
      if (questionBlock && questionBlock.status) {
        errorDisplay = "dontDisplay";
        errorMsg = "";
      }
      else {
        errorDisplay = "errorDisplay";
        errorMsg = "Error response";
      }
    }
    const editableClassName = questionEditMode ? "description_box--edit-view" : "description_box_disabled";
    return (
      <div className={`row description_box ${editableClassName}`}>

        <div className="col-xs-12 col-sm-4 description_box__header">
          <h4 tabIndex="0">{questionInfo.title}</h4>
          <p>{questionInfo.desc}</p>
        </div>
        <div className="col-xs-12 col-sm-8 description_box__large-container">
          <div className="row">
            <div className="col-xs-12 col-sm-10 description_box__details">
              {
                (!questionEditMode || showQuestionEdit) && 
                <div className="description_box__read">
                  <p>{metaBlock.question}</p>
                </div>
              }
              {
                !showQuestionEdit && questionEditMode && questionBlock &&
                <div className="description_box__form">
                  <div className="row">
                    <div className="col-xs-12 col-sm-12">
                      <div className="form-group">
                        <label htmlFor="questionInfo">Current Question</label>
                        <p id="questionInfo">
                          {metaBlock.question}
                        </p>
                      </div>
                      <div className="form-group">
                        <label htmlFor="newQuestion">New Question </label>
                        {this.getQuestions(metaBlock.qId)}
                      </div>
                    </div>
                    <div className="col-xs-12 col-sm-6">
                      <div className="form-group">
                        <label htmlFor="newAnswer">Answer</label>
                        <InputField type="text"
                          handleOnChange={this.handleOnChange}
                          placeholder=""
                          name="newAnswer"
                          valid={isValid}
                          touched={istouched}
                          value={newAnswer} 
                          nalyticstrack="secqueblock-anstxt"/>
                        <p className={errorDisplay}>{errorMsg}</p>
                      </div>
                    </div>
                    <div className="col-xs-12 col-sm-6">
                      <h3>Answer Requirements</h3>
                      <ul className="fieldErrors">
                        {
                          errorMessages.map((message) => {
                            return (
                              <li key={message.name}>
                                {!requiredError &&
                                  (message.error ? <span className="text-warning"><i className="fa fa-times-circle"></i> </span> :
                                    <span><i className="fa fa-check-circle"></i> </span>)}
                                {requiredError && <span><i className="fa fa-check-circle"></i> </span>}
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
              !showQuestionEdit && questionEditMode &&
              <div className="col-sm-2 description_box__edit description_box__edit_section cancel ">
                <a className="btn btn-anchor" onClick={() => this.props.handleEditCancel('cancelblock')} role="button" analyticstrack="secqueblock-cancel">Cancel</a>
              </div>
            }
            {
              showQuestionEdit &&
              <div className="col-sm-2 description_box__edit description_box__edit_section">
                <a className="btn btn-anchor" onClick={() => this.props.handleEditCancel('questionblock')} role="button" analyticstrack="secqueblock-edit">Edit</a>
              </div>
            }
            {
              showQuestionEdit && questionEditMode && questionSaved && <span className="col-xs-12 section-saved text-success fa fa-check-circle"> Saved </span>
            }
            {
              !showQuestionEdit && questionEditMode &&
              <div className="footer col-xs-12">
                <a className="btn btn--round-invert" role="button" onClick={() => this.props.handleEditCancel('cancelblock')} analyticstrack="secqueblock-cancel">Cancel</a>
                <button className="btn btn--round" disabled={!isValid} onClick={this.saveChangesClickedHandler} analyticstrack="secqueblock-save">Save Changes</button>
              </div>
            }
            <Modal
              modalStatus={this.state.modalStatus}
              closeModal={this.closeModal}
            >
            {this.renderModalContent()}
           </Modal>
          </div>
        </div>
      </div>
    )
  }
}

export default SecurityQuestionBlock;
