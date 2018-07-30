import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from './actions'
import InputField from '../FormElements/InputComponent'
import './style.css'

class SecurityQuestionBlock extends Component {
  constructor(props) {
    super(props)
    this.state= {
      requiredError: true,
      userId : "1234", /*props.userId,*/
       isValid: '',
       isCurrentPinValid: '',
      istouched: false,
      currentQuestion: "", newQuestion: "", newAnswer: "",
      errorMessages: [
        { name: '3-40 characters in length', error: false, type: 'minmax'},
        { name: 'Letters, numbers, spaces, and/or periods (.) only', error: false, type: 'onCharset' }
       
        
      ],
    }
  }

  handleOnChange= (e) => {
    var value = e.target.value ;
    this.setState({ newAnswer: value }, () => this.onChangeInput());
  }
  
  handleOnSave = (e) => {
       let pin = '1234'; // TODO suppose make server call to get pin with pin getPWd(userId);
       let  {userId , currentQuestion , requiredError , newQuestion,isCurrentPinValid} = this.state;
       if(pin === currentQuestion )
           { 
             this.setState({ isCurrentPinValid: true });
             if(!requiredError)
             {
              this.props.handleSave('pinForm',{ userId, newQuestion},event)
             } 
          }
          else {
            this.setState({ isCurrentPinValid: false }); 
          }
  }
  
  handleOnChangeCurrentPin= (e) => {
    this.setState({ currentQuestion: e.target.value });
  }

  onChangeInput = () => {
    const newques = this.state.newAnswer;
    this.setState({istouched: true});
    const errorMessages = JSON.parse(JSON.stringify(this.state.errorMessages));
    if(newques.length === 0) {
      this.setState( { requiredError : true,istouched: false, isValid: false,  errorMessages: [
        { name: '3-40 characters in length', error: false, type: 'minmax'},
        { name: 'Letters, numbers, spaces, and/or periods (.) only', error: false, type: 'onCharset' }
      ] });
    } else {
      this.setState( { requiredError: false });
      if(newques.length < 3 || newques.length > 40) {
         let inavlidMessage = errorMessages.find(message => message.type === 'minmax');
        inavlidMessage.error = true;
        this.setState({ errorMessages });
      } else {
        let inavlidMessage = errorMessages.find(message => message.type === 'minmax');
        inavlidMessage.error = false;
        this.setState({ errorMessages });
      }
       
       if(newques.match(/^[a-zA-Z0-9]+(?:[ .][a-zA-Z0-9]+)?$/)) {
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
      this.setState({ newQId: e.target.value });
    }
  getQuestions = (selectedVal) => {
      return (
        <select className="state-select" name="USA State" onChange={this.onQuestionChange} defaultValue={selectedVal}>
         {
         this.props.questionBlock.map((que)=> {
                return (<option key={que.Id} value={que.Id}>{que.Question}</option> )
            })
         }
        </select>
      )
 }
  render() {
    const { controlButtons, errorMessages, userId, requiredError, istouched, 
          currentQuestion, newQuestion,newQId, newAnswer,isCurrentPinValid } = this.state;
    const { questionInfo, showQuestionEdit, questionEditMode ,questionSaved ,questionBlock , metaBlock} = this.props;
     const isValid = !errorMessages.find(user => user.error) && newAnswer.length>0;
     const isCPValid= isCurrentPinValid;
     let errorDisplay;
     let errorMsg;
     if(questionSaved) {
      if(questionBlock && questionBlock.status)
      {
       errorDisplay = "dontDisplay";
       errorMsg="";
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
					showQuestionEdit &&  
					<div className="description_box__read">
						<p>{metaBlock.question}</p>
					</div>
			    }
				{
					!showQuestionEdit && questionEditMode  && questionBlock &&
					<div className="description_box__form">
						<div className="row">
							<div className="col-xs-12 col-sm-12">
								<div className="form-group">
								  <label htmlFor="questionInfo">Current Question</label>
								  <p id="questionInfo">
                    { metaBlock.question}
								  </p>
								</div>
                <div className="form-group">
								  <label htmlFor="newQuestion">New Question </label>
								   { this.getQuestions(metaBlock.qId) }
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
								  value={newAnswer} />
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
											( message.error ? <span className="text-warning"><i className="fa fa-times-circle"></i> </span> : 
										<span><i className="fa fa-check-circle"></i> </span> )  }
										{requiredError && <span><i className="fa fa-check-circle"></i> </span> }
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
             <div className="col-sm-2 description_box__edit description_box__edit_section">
				<a className="btn btn-anchor"  onClick={() => this.props.handleEditCancel('cancelblock')} role="button">Cancel</a>
			</div>
            }
			
            {
			showQuestionEdit &&  
			<div className="col-sm-2 description_box__edit description_box__edit_section">
				<a className="btn btn-anchor"  onClick={() => this.props.handleEditCancel('questionblock')} role="button">Edit</a>
			</div>
			}
				{
              showQuestionEdit && questionEditMode && questionSaved && <span className="col-xs-12 section-saved text-success fa fa-check-circle"> Saved </span>
            }
			{
               !showQuestionEdit && questionEditMode && 
			   <div className="footer col-xs-12">
                  <a className="btn btn--round-invert" role="button"  onClick={() => this.props.handleEditCancel('cancelblock')}>Cancel</a>
                  <button className="btn btn--round"  disabled={!isValid} onClick={() => this.props.handleSave('questionForm', {challengeQuestionID: newQId,challengeAnswer: newAnswer}, event)}>Save Changes</button>
                </div>
             }
		</div>
	</div>
</div>

    )
  }
}

export default SecurityQuestionBlock;
