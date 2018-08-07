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
      isMismatch: false,
      currentAccountPin: "", newAccountPin: "", confirmAccountPin: "",
      errorMessages: [
        { name: '4 numbers in length', error: false, type: 'minmax'},
        { name: 'Can’t be sequential', error: false, type: 'onSeq' },
        { name: 'Can’t be repetitive', error: false, type: 'onRepeat' }
        
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
  
 /* handleOnSave = (e) => {
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
  }*/
  
  handleOnChangeCurrentPin= (e) => {
    this.setState({ currentAccountPin: e.target.value });
  }

  updateUser = (currentUser) => {
    this.setState({userId:currentUser});
  }
  isSequential(numberStr) {
    var digitArr = numberStr.split("");
    return this.isSeq(digitArr) || this.isSeq(digitArr.reverse());
  }
  isSeq(numbers) {
    return  numbers.every((digit,i)=> i===0  ||  digit == parseInt(numbers[i-1])+1);
  }
  onChangeInput = () => {
    const newPin = this.state.newAccountPin;
    const confirmPin = this.state.confirmAccountPin;
    this.setState({istouched: true});
    const errorMessages = JSON.parse(JSON.stringify(this.state.errorMessages));
    if(newPin.length === 0) {
      this.setState( { requiredError : true,istouched: false, isValid: false,  errorMessages: [
        { name: '4 numbers in length', error: false, type: 'minmax'},
        { name: 'Can’t be sequential', error: false, type: 'onSeq' },
        { name: 'Can’t be repetitive', error: false, type: 'onRepeat' }
       
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
        if (!this.isSequential(newPin)){ //sequential 1234, 2345, 4321,,,etc
            let invalidMessage =  errorMessages.find(message => message.type === 'onSeq');
            invalidMessage.error = false;
            this.setState({ errorMessages });
        } else {
          let invalidMessage =  errorMessages.find(message => message.type === 'onSeq');
            invalidMessage.error = true;
            this.setState({ errorMessages });
        }
        if (newPin%1111 !=0){ //repetitive 1111,2222,etc
            let invalidMessage =  errorMessages.find(message => message.type === 'onRepeat');
            invalidMessage.error = false;
            this.setState({ errorMessages });
        } else {
          let invalidMessage =  errorMessages.find(message => message.type === 'onRepeat');
            invalidMessage.error = true;
            this.setState({ errorMessages });
        }
        if (newPin === confirmPin){ //to check match 
            this.setState({ isMismatch:true });
        } else {
          this.setState({ isMismatch:false });
        }
    }
  }

  render() {
    const { controlButtons, errorMessages, userId, requiredError, istouched, 
          currentAccountPin, newAccountPin, confirmAccountPin,isCurrentPinValid ,  isMismatch } = this.state;
    const { accountPinInfo, showAccountPinEdit, accountPinEditMode ,pinSaved } = this.props;
     const isValid = !errorMessages.find(user => user.error) ;
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
			<div className="col-xs-12 col-sm-10 description_box__details">
				{
					(!accountPinEditMode || showAccountPinEdit) && 
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
								  <label htmlFor="accountpinInfo">Set an account PIN</label>
								  <p id="accountpinInfo">
                     Create your PIN by setting a customer number below. Be sure not to use your SSN.
								  </p>
								</div>
                <div className="form-group">
								  <label htmlFor="newAccountPin">Create custom PIN</label>
								  <InputField type="password"
								  handleOnChange={this.handleOnChange}
								  placeholder="****"
								  name="newAccountPin"
								  valid={isValid}
								  touched={istouched}
								  value={newAccountPin} />
                   {/* !isValid && 
                  <p className="errorDisplay">InValid Entry</p> */
                  }
								</div>
								<div className="form-group">
								  <label htmlFor="confirmAccountPin">Confirm custom PIN</label>
								  <InputField type="password"
								  handleOnChange={this.handleOnChange}
								  placeholder="****"
								  name="confirmAccountPin"
								  valid={isMismatch}
								  touched={istouched}
								  value={confirmAccountPin} />
                  { /* !isMismatch && confirmAccountPin.length>0 && 
                  <p className="errorDisplay">Mismatch</p> */
                 }
								</div>
							</div>
							<div className="col-xs-12 col-sm-7">
								<h3>PIN Requirements</h3>
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
        !showAccountPinEdit && accountPinEditMode && 
             <div className="col-sm-2 description_box__edit description_box__edit_section cancel">
				<a className="btn btn-anchor"  onClick={() => this.props.handleEditCancel('cancelblock')} role="button">Cancel</a>
			</div>
            }
			
            {
			showAccountPinEdit &&  
			<div className="col-sm-2 description_box__edit description_box__edit_section">
				<a className="btn btn-anchor"  onClick={() => this.props.handleEditCancel('accountPinblock')} role="button">Edit</a>
			</div>
			}
				{
              showAccountPinEdit && accountPinEditMode && pinSaved && <span className="col-xs-12 section-saved text-success fa fa-check-circle"> Saved </span>
            }
			{
               !showAccountPinEdit && accountPinEditMode && 
			   <div className="footer col-xs-12">
                  <a className="btn btn--round-invert" role="button"  onClick={() => this.props.handleEditCancel('cancelblock')}>Cancel</a>
                  <button className="btn btn--round"  disabled={!isValid || !isMismatch} onClick={() => this.props.handleSave('pinForm', {enteredPin: newAccountPin,reEnteredPin: confirmAccountPin}, event)}>Save Changes</button>
                </div>
             }
		</div>
	</div>
</div>




    )
  }
}

export default AccountBlock;
