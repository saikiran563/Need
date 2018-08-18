import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "./actions";
import InputField from "../FormElements/InputComponent";
import "./style.css";

class GreetingBlock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isValid: true,
      istouched: false,
      errorMessages: [
        { name: '1-10 characters', error: false, type: 'minmax'},
        { name: 'Does not contain certain special characters', error: false, type: 'special' }
      ],
      greetingName: this.props.greetingName,
      moveCancelButton:0
    };
  }

  componentWillReceiveProps(newProps){
    this.setState({
      greetingName: newProps.greetingName
    })
  }

  handleOnChange = e => {
    const newGreetingName = e.target.value
    if(newGreetingName.length <= 10){
          this.setState({ greetingName: e.target.value }, () => this.onChangeInput());
    }
  };

  onChangeInput = () => {
    //const state = this.state;
    //const list = this.props.passwordInfo.list;
    const newPwd = this.state.greetingName;
    // const confirmPwd = state.confirmPassword;
    // const exactList = list.exactList;
    // const containsList =  list.containsList
    this.setState({istouched: true});
    const errorMessages = JSON.parse(JSON.stringify(this.state.errorMessages));
    if(newPwd.length === 0) {
      this.setState( { isValid : false, istouched: false, errorMessages: [
        { name: '1-10 characters', error: false, type: 'minmax'},
        { name: 'Does not contain certain special characters', error: false, type: 'special' }
      ] });
    } else {
      this.setState( { isValid: true });
       if(newPwd.length > 10) {
        this.setState( { isValid: false });
         let invalidMessage = errorMessages.find(message => message.type === 'minmax');
        invalidMessage.error = true;
        this.setState({ errorMessages });
      } else {
        let invalidMessage = errorMessages.find(message => message.type === 'minmax');
        invalidMessage.error = false;
        this.setState({ errorMessages });
      }

      if(newPwd.match(/[!#$%^&*()+|~=_`{}\[\]:";'<>,.\/]/)){
          this.setState( { isValid: false });
          let invalidMessage =  errorMessages.find(message => message.type === 'special');
          invalidMessage.error = true;
          this.setState({ errorMessages });
      } else {
        this.setState( { isValid: true });
        let invalidMessage =  errorMessages.find(message => message.type === 'special');
          invalidMessage.error = false;
          this.setState({ errorMessages });
      }
    }
  }

  handleSaveGreetingName(){
    this.props.actions.postGreetingName({greetingName:this.state.greetingName})
    this.props.handleEditCancel("cancelblock")
  }

  handleCancelGreetingName(){
    this.setState({
      greetingName : this.props.greetingname
    })
    this.props.handleEditCancel("cancelblock")
  }

  componentDidMount(){
    this.handleResize()
    window.addEventListener('resize', this.handleResize)
  }

  handleResize = () => {
    if(window.innerWidth < 990 && window.innerWidth > 715){
      this.setState({
        moveCancelButton: 1
      })
    } else if (window.innerWidth < 715 ) {
      this.setState({
        moveCancelButton: 2
      })
    }
    else {
      this.setState({
        moveCancelButton: 0
      })
    }
  }
  render() {
    const {
      controlButtons,
      errorMessages,
      useridValid,
      isValid,
      greetingName,
      istouched
    } = this.state;
    const { showGreetingEdit, greetingEditMode } = this.props;
    const editableClassName = greetingEditMode ? "description_box--edit-view" : "description_box_disabled";
    return (
        <div className={`row description_box ${editableClassName}`}>
          <div className="clearfix" />
            <div className="body">
            <div className="col-xs-12 col-sm-4 description_box__header" style={{padding: '0'}} >
            {this.state.moveCancelButton === 2 && greetingEditMode && !showGreetingEdit ? <a className='btn btn-anchor' style={{float: 'right'}} onClick={() => this.props.handleEditCancel('cancelblock')}>Cancel</a> : ""}
              <h4 tabIndex="0">Greeting Name</h4>
              <p>Tell us the name you would like to go by.</p>
            </div>
            <div className="col-xs-12 col-sm-8 description_box__large-container">
              {
                showGreetingEdit  &&  (
                <div>
                  <p>{this.state.greetingName}</p>
                </div>
              )}
              { !showGreetingEdit && greetingEditMode && (
                <div>
                                {this.state.moveCancelButton === 1 && greetingEditMode && !showGreetingEdit ? <a className='btn btn-anchor' style={{float: 'right'}} onClick={() => this.props.handleEditCancel('cancelblock')}>Cancel</a> : ""}
                  <div className="greeting-fields col-md-5">
                      <label>Change Greeting Name</label>
                      <InputField
                        type="text"
                        handleOnChange={this.handleOnChange}
                        placeholder="Name"
                        name="greeting"
                        value={this.state.greetingName}
                        valid={isValid}
                        touched={istouched}
                        analyticstrack="greeting-nametxt"
                      />
                    </div>
                  <div className="greeting-fields-req col-xs-12 col-sm-6  col-md-5">
                    <h3>Greeting Name Requirements</h3>
                    <ul className="fieldErrors">
                      {
    									errorMessages.map((message) => {
                        if(!istouched){
                          return(
                            <li key={message.name}>
                                <span className="text"><i className="fa fa-check-circle"></i> </span>
                                {message.name}
                            </li>
                          )
                        }
    									return (
    									  <li key={message.name}>
    										{
                          isValid == true &&
    											(
                              message.error ?
                              <span className="text-danger"><i className="fa fa-times-circle"></i> </span> :
      										    <span className="text-success"><i className="fa fa-check-circle"></i> </span>
                            )
                         }
                         {
                           isValid == false &&
     											(
                               message.error ?
                               <span className="text-danger"><i className="fa fa-times-circle"></i> </span> :
       										    <span className="text-success"><i className="fa fa-check-circle"></i> </span>
                             )
                          }
    										 {/*
                           isValid === false && <span className="text-danger"><i className="fa fa-times-circle"></i> </span>
                        */}
    										{message.name}
    									  </li>
    									)
    									})
    									}
                    </ul>
                  </div>

                </div>
              )}

              {showGreetingEdit && (
                <div className="description_box__edit description_box__edit_section">
                  <a
                    className="btn btn-anchor"
                    onClick={() => this.props.handleEditCancel("greetingnameblock")}
                    role="button"
                    analyticstrack="greeting-edit"
                  >
                    Edit
                  </a>
                </div>
              )}
            </div>
          </div>

          {!showGreetingEdit && greetingEditMode && (
            <div className="footer col-xs-12">
              <a
                className="btn btn--round-invert"
                role="button"
                onClick={() => this.handleCancelGreetingName() ("cancelblock")}
                analyticstrack="greeting-cancel"
              >
                Cancel
              </a>
              <button className="btn btn--round" disabled={!isValid} onClick={()=>{this.handleSaveGreetingName()}} analyticstrack="greeting-save">
                Save Changes
              </button>
            </div>
          )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    greetingName: state.greetingReducer.greetingName
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(GreetingBlock)
