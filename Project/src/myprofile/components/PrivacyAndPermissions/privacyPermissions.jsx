import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "./actions";
import axios from "axios"

import Spinner from "../Spinner/Spinner";

import PrivacySettings from "./privacySettings";

import VerizonSelects from "./verizonSelects";

import "./style.css";

require("../../../assets/css/main.css");
require("../../../assets/css/my-profile.css");
require("../../../assets/css/oneD-Global.css");
require("../../../assets/css/phoenixGlobal.css");

class PrivacyPermissions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPrivacyEdit: true,
      userEditMode: true,
      privacySettingsEditMode: true,
      verizonSelectsEditMode: true,
      count: 0,
      privacySaved: false,
      privacyDetailsState: null
    };
  }

  componentDidMount() {
    // console.log("MOUNT");
    if(!this.props.privacyDetails.privacySettings)
    this.props.actions.fetchPrivacyAndPermissions();
    // https://vzwqa2.verizonwireless.com/ui/acct/secure/data/secure/profile/privacyPermissions
     // http://www.mocky.io/v2/5b6c58102f00003700893d08
    // axios.get("http://www.mocky.io/v2/5b6c58102f00003700893d08").then(res => {
      // if(this.props.privacyDetails.privacySettings){
      //   this.checkUserSecurityItems(this.props.privacyDetails.privacySettings.privacySettingItems)

      // }
    //   this.setState({
    //     privacyDetailsState: res.data
    //   })
    // })
    const URL_MAP = this.props.match.url.split("/");
    const type = URL_MAP[URL_MAP.length - 1];
    type ? this.handleEditCancel(type + "block") : "";
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.privacyDetails.privacySettings != prevProps.privacyDetails.privacySettings) {
      // console.log("updated", this.props.privacyDetails);
      this.checkUserSecurityItems(this.props.privacyDetails.privacySettings.privacySettingItems)
      // this.setState({
      //   privacyDetailsState: this.props.privacyDetails
      // })
    }
  }

  checkUserSecurityItems = array => {
    let count = 0;    
    array.map(item => {
      Object.keys(item.mtnSettingsMap).map(objKey => {
        if(item.mtnSettingsMap[objKey] === "Y"){
            count++
          }
        })
    })
      this.setState({
          count
      })
  }

  onRadioChangeHandler = event => {
    // console.log(this.props)
    
    const { id, value } = event.target;
    const userNumber = event.target.getAttribute("data-number");
    const state = [...this.props.privacyDetails.privacySettings.privacySettingItems];
    if (state) {
        state.map(item => {
            if (item.settingType === id) {
                const arrayIndex = state.findIndex(theObj => theObj.settingType === id)
                Object.keys(item.mtnSettingsMap).map(number => {
                    if (number === userNumber) {
                        item.mtnSettingsMap[number] = value;
                        return state[arrayIndex] = item;
                    }
                })
                this.setState(prevState => ({
                    ...prevState,
                    privacyDetailsState: {
                        ...prevState.privacyDetailsState,
                            privacySettingItems: state
                    }
                }))
            }
        })
    }
}

  handleEditCancel = type => {
    switch (type) {
      case "privacysettingsblock":
        this.setState({
          showPrivacyEdit: false,
          privacySettingsEditMode: false,
          userEditMode: true,
          verizonSelectsEditMode: false,
          privacySaved: false
        });
        this.props.history.push("/privacypermissions/privacysettings");
        break;
      case "verizonselectsblock":
        this.setState({
          verizonSelectsEditMode: true,
          userEditMode: false,
          privacySettingsEditMode: false,
          showPrivacyEdit: false,
          privacySaved: false
        });
        this.props.history.push("/privacypermissions/verizonselects");
        break;
      default:
        this.props.history.push("/privacypermissions");
        this.setState({
          showPrivacyEdit: true,
          userEditMode: true,
          privacySettingsEditMode: true,
          verizonSelectsEditMode: true,
          privacySaved: false
        });
    }
  };

  handleSave = (formId, formData, event) => {
    // through an API call.
    event.preventDefault();
    switch (formId) {
      case "privacysettingsform":
        // this.props.actions.fetchPrivacyAndPermissions();
        this.setState({ privacySaved: true });
        break;
      case "verizonSelectsform":
        this.props.actions.setVerizonSelects(formData);
        break;
    }
    this.setState({
      showPrivacyEdit: true,
      userEditMode: true,
      privacySettingsEditMode: true,
      verizonSelectsEditMode: true
    });
  };

  render() {
    const { privacyDetails, showSpinner } = this.props;
    // console.log(this.props)
    return (
      <div>
        {!this.props.privacyDetails.privacySettings ? (
          <Spinner />
        ) : (
          <div>
            <h1 className="title title--lg">Privacy & Permissions</h1>
            <div className="col-xs-12">
              <PrivacySettings
                checkUserSecurityItems={this.checkUserSecurityItems}
                onRadioChangeHandler={this.onRadioChangeHandler}
                handleEditCancel={type => this.handleEditCancel(type)}
                handleSave={(type, data, e) => this.handleSave(type, data, e)}
                {...this.state}
              />
              <VerizonSelects {...this.state} />
            </div>{" "}
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    privacyDetails: state.privacyDetails,
    showSpinner: state.privacyDetails.isFetching
  };
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PrivacyPermissions);
