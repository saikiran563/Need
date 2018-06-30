import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from './actions'
import InputField from '../FormElements/InputComponent'

class VerizonSelects extends Component {
    constructor(props) {
        super(props)
    }


    render() {
        const verizondata= this.props.verizonSelect && this.props.verizonSelect.verizonSelectsInfo;
        return (
           
            
            <div className="row description_box ">
            
                <div className="col-sm-4 description_box__header">
                    <h4>{ verizondata.title}</h4>
                    <p>{ verizondata.desc} </p>
                </div>
                <div className="col-sm-8 description_box__large-container">
                    <div className="row">
                        <div className="description_box__details">
                            <a href="#" role="button" className="btn btn--round-invert btn-transfer">Change settings</a>
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
 
