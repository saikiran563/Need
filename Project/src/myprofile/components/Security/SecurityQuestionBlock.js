import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from './actions'
import InputField from '../FormElements/InputComponent';
import Modal from "../Modal/modal";
import axios from "axios";
import './style.css';
import { getSecretPinStatus, getListOfUserNumbers, sendSecurePinToPhone, confirmSecurePinCode } from "./actions/fetchSecurities";
import SecurePin from "../SecurePin/SecurePin"

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
      errorModal: false,
      showSaved: false,
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

  componentWillUpdate(prevProps){
    if(prevProps.isSecurePinValidated != this.props.isSecurePinValidated){
       return this.setState({
        showSaved: true
      })
    } 
  }
  
  saveChangesClickedHandler = () => {
    this.props.getSecretPinStatus().then(() =>{
      const { securePin } = this.props;
      console.log(securePin)
      if(typeof securePin !== "string"){
        if(!securePin.securePinEnabled){
          console.log("secure pin not enabled")
          return this.props.handleSave('questionForm', {challengeQuestionID: this.state.newQId, challengeAnswer: this.state.newAnswer}, event)
        } 
        if (!securePin.securePinVerified) {
          console.log("secure pin not verified, go through secure pin flow")
          this.props.getListOfUserNumbers().then(() => {
              this.setState({
                  modalStatus: true,
                  listOfAccountNumbersModal: true,
                  afterGetRequest: this.props.listOfUserNumbers
              })
          })
        } else {
          console.log("secure pin already verified")
          return this.props.handleSave('questionForm', {challengeQuestionID: this.state.newQId, challengeAnswer: this.state.newAnswer}, event)
        }
      } else {
        this.setState({
          errorModal: true,
          afterGetRequest: this.props.securePin
        })
      }
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

  handleMouseClick = event => {
    if(this.state.showSaved && !this.state.modalStatus){
     this.setState({
       showSaved: false
     })
    }
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
      errorModal: false,
      modalStatus: false,
      selectedPhone: null,
      authorizationCode: ""
    })
  }

  handleErrors = error => {
    if(error == "1"){
        return "Something went wronggggg"
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
      <div ref={node => this.node = node} onClick={this.handleMouseClick} className={`row description_box ${editableClassName}`}>

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
                          anlyticstrack="secqueblock-anstxt"/>
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
              <div className="description_box__edit description_box__edit_section cancel ">
                <a className="btn btn-anchor" onClick={() => this.props.handleEditCancel('cancelblock')} role="button" analyticstrack="secqueblock-cancel">Cancel</a>
              </div>
            }
            {
              showQuestionEdit &&
              <div className="description_box__edit description_box__edit_section">
                <a className="btn btn-anchor" onClick={() => this.props.handleEditCancel('questionblock')} role="button" analyticstrack="secqueblock-edit">Edit</a>
              </div>
            }
            {this.state.showSaved ? <span className="col-xs-12 section-saved text-success fa fa-check-circle"> Saved </span> : ""}
            {
              !showQuestionEdit && questionEditMode &&
              <div className="footer col-xs-12">
                <a className="btn btn--round-invert" role="button" onClick={() => this.props.handleEditCancel('cancelblock')} analyticstrack="secqueblock-cancel">Cancel</a>
                <button className="btn btn--round" disabled={!isValid || reactGlobals.isCsr} onClick={this.saveChangesClickedHandler} analyticstrack="secqueblock-save">Save Changes</button>
              </div>
            }
            <Modal
              modalStatus={this.state.errorModal}
              closeModal={this.closeModal}
            >
              <div>{this.handleErrors(this.state.afterGetRequest)}</div>
            </Modal>
            <Modal
              modalStatus={this.state.modalStatus}
              closeModal={this.closeModal}
            >
              <SecurePin
                newQId={this.state.newQId}
                newAnswer={this.state.newAnswer}
                handleSave={this.props.handleSave}
              />
           </Modal>
          </div>
        </div>
      </div>
    )
  }
}
const mapStateToProps = state => {
  // console.log("STATEEEE",state)
  return {
    securePin: state.security.secretPin,
    isSecurePinValidated: state.security.isSecurePinValidated    
  }
}

export default connect(mapStateToProps, {getSecretPinStatus, getListOfUserNumbers})(SecurityQuestionBlock);