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
      ]
    };
  }

  handleOnChange = e => {
    this.setState({ user: e.target.value }, () => this.onChangeInput());
  };

  onChangeInput = () => {
    const val = this.state.user;
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

  render() {
    const {
      controlButtons,
      useridInvalidMessages,
      useridValid,
      requiredError
    } = this.state;

    const { showGreetingEdit } = this.props;

    return (
      <div className="row description_box">
        <div className="clearfix" />
        <div className="body">
          <div className="col-xs-12 col-sm-4 description_box__header">
            <h4 tabIndex="0">Greeting Name</h4>
            <p>Short Description</p>
          </div>
          <div className="col-xs-12 col-sm-8 description_box__large-container">
            {showGreetingEdit && (
              <div>
                <p>Name</p>
              </div>
            )}
            {!showGreetingEdit && (
              <div>
                <div className="greeting-fields col-md-5">
                  <label>Change Greeting Name</label>
                  <InputField
                    type="text"
                    handleOnChange={this.handleOnChange}
                    placeholder="Name"
                    name="greeting"
                    valid={requiredError}
                  />
                </div>
                <div className="greeting-fields-req col-xs-12 col-sm-6">
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

            {!showGreetingEdit && (
              <div className="description_box__edit description_box__edit_section">
                <a
                  className="btn btn-anchor"
                  onClick={() => this.props.handleEditCancel("cancelblock")}
                  role="button"
                >
                  Cancel
                </a>
              </div>
            )}
          </div>
        </div>

        {!showGreetingEdit && (
          <div className="footer col-xs-12">
            <a
              className="btn btn--round-invert"
              role="button"
              onClick={() => this.props.handleEditCancel("cancelblock")}
            >
              Cancel
            </a>
            <button className="btn btn--round" disabled={requiredError}>
              Save Changes
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default GreetingBlock;
