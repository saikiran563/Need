import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from './actions'
import InputField from '../FormElements/InputComponent'
import './style.css'

class AccountBlock extends Component {
  constructor(props) {
    super(props)
    this.state= {
      requiredError: true,
      userId : "1234", /*props.userId,*/
       isValid: '',
       isCurrentPinValid: '',
      istouched: false,
      currentAccountPin: "", newAccountPin: "", confirmAccountPin: "",
      errorMessages: [
        { name: '4 numbers in length', error: false, type: 'minmax'},
        { name: 'Does not match your SSN', error: false, type: 'onSSN' },
        { name: 'Is not easy to guess', error: false, type: 'onEasyGuess' }
      ],
    }
  }

  handleOnChange= (e) => {
    var typeOfpin = e.target.name;
    var value = e.target.value ;
    if(value.length>4) return;
    if(typeOfpin === "newAccountPin") {
    this.setState({ newAccountPin: value}, () => this.onChangeInput());
    } else {
      this.setState({ confirmAccountPin: value }, () => this.onChangeInput());
    }
  }
  
  handleOnSave = (e) => {
       let pin = '1234'; // TODO suppose make server call to get pin with pin getPWd(userId);
       let  {userId , currentAccountPin , requiredError , newAccountPin,isCurrentPinValid} = this.state;
       if(pin === currentAccountPin )
           { 
             this.setState({ isCurrentPinValid: true });
             if(!requiredError)
             {
              this.props.handleSave('pinForm',{ userId, newAccountPin},event)
             } 
          }
          else {
            this.setState({ isCurrentPinValid: false }); 
          }
  }
  
  handleOnChangeCurrentPin= (e) => {
    this.setState({ currentAccountPin: e.target.value });
  }

  updateUser = (currentUser) => {
    this.setState({userId:currentUser});
  }
  onChangeInput = () => {
    const newPin = this.state.newAccountPin;
    const confirmPin = this.state.confirmAccountPin;
    this.setState({istouched: true});
    const errorMessages = JSON.parse(JSON.stringify(this.state.errorMessages));
    if(newPin.length === 0) {
      this.setState( { requiredError : true,istouched: false, isValid: false,  errorMessages: [
        { name: '4 numbers in length', error: false, type: 'minmax'},
        { name: 'Does not match your SSN', error: false, type: 'onSSN' },
        { name: 'is not easy to guess', error: false, type: 'onEasyGuess' }
      ] });
    } else {
      this.setState( { requiredError: false });
       if(newPin.match(/^[0-9]{4}$/)) {
         let invalidMessage = errorMessages.find(message => message.type === 'minmax');
        invalidMessage.error = false;
        this.setState({ errorMessages });
      } else {
        let invalidMessage = errorMessages.find(message => message.type === 'minmax');
        invalidMessage.error = true;
        this.setState({ errorMessages });
      }
        if (newPin != this.state.userId){
            let invalidMessage =  errorMessages.find(message => message.type === 'onSSN');
            invalidMessage.error = false;
            this.setState({ errorMessages });
        } else {
          let invalidMessage =  errorMessages.find(message => message.type === 'onSSN');
            invalidMessage.error = true;
            this.setState({ errorMessages });
        }
        if (newPin === confirmPin){
            let invalidMessage =  errorMessages.find(message => message.type === 'onEasyGuess');
            invalidMessage.error = false;
            this.setState({ errorMessages });
        } else {
          let invalidMessage =  errorMessages.find(message => message.type === 'onEasyGuess');
            invalidMessage.error = true;
            this.setState({ errorMessages });
        }
    }
  }

  render() {
    const { controlButtons, errorMessages, userId, requiredError, istouched, currentAccountPin, newAccountPin, confirmAccountPin,isCurrentPinValid } = this.state;
    const { accountPinInfo, showAccountPinEdit, accountPinEditMode ,pinSaved } = this.props;
     const isValid = !errorMessages.find(user => user.error)
     const isCPValid= isCurrentPinValid;
    const editableClassName = accountPinEditMode ? "description_box--edit-view" : "description_box_disabled";
    return (
        <div className={`row description_box ${editableClassName}`}>
	
	<div className="col-xs-12 col-sm-4 description_box__header">
		<h4 tabIndex="0">Account Pin</h4>
		<p>{accountPinInfo.desc}</p>
    </div>
      
          
	<div className="col-xs-12 col-sm-8 description_box__large-container">
		<div className="row">
			<div className="col-xs-12 description_box__details">
				{
					showAccountPinEdit &&  
					<div className="description_box__read">
						<p>{accountPinInfo.read}</p>
					</div>
			    }
				{
					!showAccountPinEdit && accountPinEditMode  && 
					<div className="description_box__form">
						<div className="row">
							<div className="col-xs-12 col-sm-5">
								<div className="form-group">
								  <label htmlFor="newAccountPin">Create Account PIN</label>
								  <InputField type="password"
								  handleOnChange={this.handleOnChange}
								  placeholder="****"
								  name="newAccountPin"
								  valid={isValid}
								  touched={istouched}
								  value={newAccountPin} />
								</div>
								<div className="form-group">
								  <label htmlFor="confirmAccountPin">Confirm Account PIN</label>
								  <InputField type="password"
								  handleOnChange={this.handleOnChange}
								  placeholder="****"
								  name="confirmAccountPin"
								  valid={isValid}
								  touched={istouched}
								  value={confirmAccountPin} />
								</div>
							</div>
							<div className="col-xs-12 col-sm-6">
								<h3>AccountPin Requirements</h3>
								<ul className="fieldErrors">
									{
									errorMessages.map((message) => {
									return ( 
									  <li key={message.name}>
										{!requiredError &&
											( message.error ? <span className="text-danger"><i className="fa fa-times-circle"></i> </span> : 
										<span className="text-success"><i className="fa fa-check-circle"></i> </span> )  }
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
              showAccountPinEdit && accountPinEditMode && pinSaved && <span className="section_saved text-success fa fa-check-circle"> Saved </span>
            }
			{ 
        !showAccountPinEdit && accountPinEditMode && 
             <div className="description_box__edit description_box__edit_section">
				<a className="btn btn-anchor"  onClick={() => this.props.handleEditCancel('cancelblock')} role="button">Cancel</a>
			</div>
            }
			
            {
			showAccountPinEdit &&  
			<div className="description_box__edit description_box__edit_section">
				<a className="btn btn-anchor"  onClick={() => this.props.handleEditCancel('accountPinblock')} role="button">Edit</a>
			</div>
			}
			
			{
               !showAccountPinEdit && accountPinEditMode && 
			   <div className="footer col-xs-12">
                  <a className="btn btn--round-invert" role="button"  onClick={() => this.props.handleEditCancel('cancelblock')}>Cancel</a>
                  <button className="btn btn--round"  disabled={!isValid} onClick={this.handleOnSave}>Save Changes</button>
                </div>
             }
		</div>
	</div>
</div>




    )
  }
}

export default AccountBlock;
