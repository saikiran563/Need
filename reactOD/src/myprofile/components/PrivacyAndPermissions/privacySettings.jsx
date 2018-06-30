import React, { Component } from 'react'
import InputField from '../FormElements/InputComponent'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import DetailsMarkup from './privacyDetails'

class PrivacySettings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editMode: false
        };

        this.clickEdit = this.clickEdit.bind(this);
        this.cancelHanlder = this.cancelHanlder.bind(this);

    }

    clickEdit() {
        this.setState({ editMode: true })
    }
    cancelHanlder() {
        this.setState({ editMode: false })
    }

    render() {
        return (

            <div className={`row description_box${this.state.editMode ? '--edit-view' : ''} `}>
                <div className="col-xs-12 col-sm-4 description_box__header">
                    <h4>Privacy settings</h4>
                    <p>Specify the kind of information Verizon can collect from you. </p>
                </div>

                <div className={`col-xs-12 col-sm-8 description_box__large-container description_box__read ${this.state.editMode ? 'showDetails' : 'hideDetails'}`}>
                    <div className="row">
                        <div className="col-xs-12 description_box__details">
                            <p>{this.props.privacyDetails.privacySettingsInfo.read}</p>


                        </div>
                        <div className="description_box__edit description_box__edit_section">
                            <a className="description_box__btn-edit" onClick={this.clickEdit} >Edit</a>
                            <a className="description_box__btn-cancel" >Cancel</a>
                        </div>

                    </div>
                </div>
                <div className={`{col-xs-12 col-sm-8 description_box__large-container description_box__form ${this.state.editMode ? 'showDetails' : 'hideDetails'}`}>
                    <div className="row">
                        <div className="description_box__edit description_box__edit_section">


                            <DetailsMarkup handlecancel={this.cancelHanlder}
                              phoneNumber={this.props.privacyDetails.phonenumbers}/>

                        </div>
                    </div>
                </div>

            </div>



        )
    }

}


const mapStateToProps = state => {

    return {
        privacyDetails: state.privacyDetails,
    }
}

const mapDispatchToProps = dispatch => ({

})
export default connect(mapStateToProps, mapDispatchToProps)(PrivacySettings)
