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
      requiredError: true,
      touched: false,
      useridInvalidMessages: [
        { name: "1-10 characters", error: false, type: "characterCount" },
        {
          name: "Does not contain certain special characters",
          error: false,
          type: "special"
        }
      ],
      greetingName: this.props.greetingName
    };
  }

  handleOnChange = e => {
    if(e.target.value.length <= 10){
          this.setState({ greetingName: e.target.value }, () => this.onChangeInput());
    }
  };

  onChangeInput = () => {
    const val = this.state.greetingName;
    const useridInvalidMessages = JSON.parse(
      JSON.stringify(this.state.useridInvalidMessages)
    );
    if (val.length === 0) {
      this.setState({
        requiredError: true,
        useridInvalidMessages: [
          { name: "1-10 characters", error: false, type: "characterCount" },

          {
            name: "Does not contain certain special characters",
            error: false,
            type: "special"
          }
        ]
      });
    } else {
      this.setState({ requiredError: false });

      if (val.length > 10) {
        let inavlidMessage = useridInvalidMessages.find(
          message => message.type === "characterCount"
        );
        inavlidMessage.error = true;
        this.setState({ useridInvalidMessages });
      } else {
        let inavlidMessage = useridInvalidMessages.find(
          message => message.type === "characterCount"
        );
        inavlidMessage.error = false;
        this.setState({ useridInvalidMessages });
      }

      if (val.match(/[-!@#$%^&*()_+|~=`{}\[\]:";'<>?,.\/]/)) {
        let inavlidMessage = useridInvalidMessages.find(
          message => message.type === "special"
        );
        inavlidMessage.error = true;
        this.setState({ useridInvalidMessages });
      } else {
        let inavlidMessage = useridInvalidMessages.find(
          message => message.type === "special"
        );
        inavlidMessage.error = false;
        this.setState({ useridInvalidMessages });
      }
    }
  };

  handleSaveGreetingName(){
    this.props.actions.postGreetingName(this.state.greetingName)
  }

  render() {
    const {
      controlButtons,
      useridInvalidMessages,
      useridValid,
      requiredError,
      greetingName
    } = this.state;
    const { showGreetingEdit, greetingEditMode } = this.props;
    const editableClassName = greetingEditMode ? "description_box--edit-view" : "description_box_disabled";
    return (
        <div className={`row description_box ${editableClassName}`}>
          <div className="clearfix" />
            <div className="body">
            <div className="col-xs-12 col-sm-4 description_box__header">
              <h4 tabIndex="0">Greeting Name</h4>
            </div>
            <div className="col-xs-12 col-sm-8 description_box__large-container">
              {
                showGreetingEdit  &&  (
                <div>
                  <p>{this.props.greetingName}</p>
                </div>
              )}
              { !showGreetingEdit && greetingEditMode && (
                <div>
                  <div className="greeting-fields col-md-5">
                      <label>Change Greeting Name</label>
                      <InputField
                        type="text"
                        handleOnChange={this.handleOnChange}
                        placeholder="Name"
                        name="greeting"
                        value={this.state.greetingName}
                        valid={requiredError}
                      />
                    </div>
                  <div className="greeting-fields-req col-xs-12 col-sm-6  col-md-5">
                    <h3>Greeting Name Requirements</h3>
                    <ul className="fieldErrors">
                      {useridInvalidMessages.map(message => {
                        return (
                          <li key={message.name}>
                            {!requiredError &&
                              (message.error ? (
                                <span className="text-danger">
                                  <i className="fa fa-times-circle" />
                                </span>
                              ) : (
                                <span className="text-success">
                                  <i className="fa fa-check-circle" />
                                </span>
                              ))}
                            {requiredError && (
                              <span>
                                <i className="fa fa-check-circle" />
                              </span>
                            )}
                            {message.name}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                    <div className="col-md-1">
                        <a className='btn btn-anchor'  onClick={() => this.props.handleEditCancel('cancelblock')}>Cancel</a>
                    </div>
                </div>
              )}

              {showGreetingEdit && (
                <div className="description_box__edit description_box__edit_section">
                  <a
                    className="btn btn-anchor"
                    onClick={() => this.props.handleEditCancel("greetingblock")}
                    role="button"
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
                onClick={() => this.props.handleEditCancel("cancelblock")}
              >
                Cancel
              </a>
              <button className="btn btn--round" disabled={requiredError} onClick={()=>{this.handleSaveGreetingName()}}>
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
