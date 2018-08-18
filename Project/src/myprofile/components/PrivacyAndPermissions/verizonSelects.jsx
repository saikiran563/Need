import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from './actions'
import InputField from '../FormElements/InputComponent'

class VerizonSelects extends Component {
    constructor(props) {
        super(props)
        this.state = {
            verizonSelects: this.props.verizonSelectsInfo,
        }
    }


    render() {
        const verizondata = this.props.verizonSelect && this.props.verizonSelect.verizonSelectsInfo;

        const { verizonSelectsInfo, showPrivacyEdit, verizonSelectsEditMode } = this.props;
        // console.log(this.props);
        const editableClassName = verizonSelectsEditMode ? "" : "description_box_disabled";

        return (


            <div className={`row description_box ${editableClassName}`}>

                <div className="col-sm-4 description_box__header">
                    <h4>Verizon Selects</h4>
                    <p>Manage settings for the Verizon Selects Program.</p>
                </div>
                <div className="col-sm-8 description_box__large-container">
                    <div className="row">
                        <div className="col-xs-12 description_box__details">
                            <a href="https://qa2billpay.verizonwireless.com/vzw/secure/mcm/mcmDisplayPreferences.action" role="button" 
                            className="btn btn--round-invert btn-transfer" analyticstrack="privacy-verizon-settings">Change setting</a>
                        </div>
                    </div>
                </div>
            </div>


        )
    }

}

const mapStateToProps = state => {

    return {
        verizonSelect: state.privacyDetails,
    }
}

const mapDispatchToProps = dispatch => ({

})
export default connect(mapStateToProps, mapDispatchToProps)(VerizonSelects)

