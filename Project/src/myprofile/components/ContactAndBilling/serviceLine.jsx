import React, { Component } from 'react'
import InputField from '../FormElements/InputComponent'
import ServiceLineEdit from './serviceLineEdit'

class ServiceLine extends Component {
  constructor(props) {
    super(props)
    this.state = {
     editLine: false,
     serviceLine: this.props.serviceLine,
     serviceAddress: this.props.serviceAddress
    }
  }

   handleOnChange = (e) => {
     this.setState({ serviceLine: e.target.value });
   }

  handleServiceLineEdit = () => {
      this.setState({
        editLine: !this.state.editLine
      });
    }

  render() {
    const { editLine, serviceLine, serviceAddress } = this.state;
    const renderLineRead = (line) => {
      return(
          <p>{line} [Device Nickname] </p>
      );
    }
    const renderAddressRead = (address) => {
      return (
         <p>
            <strong>{address.address.address}</strong>
            <strong>{address.address.apartment}</strong><br/>
            <strong>{address.address.city} {address.address.state} {address.address.zip}</strong>
                                    
         </p>
      );
    }
    const renderServiceLineEdit = (line) => {
        return(<div className="row">
            <div className="form-group phone-block-input col-xs-12 col-sm-10 description_box__details">
               {serviceLine ? renderLineRead(line) : renderAddressRead(line)} 
                <ServiceLineEdit onCancel={() => this.handleServiceLineEdit()}/>
            </div>
            <div className="serviceline-phone-edit description_box__edit description_box__edit_section">
                  <a className="btn btn-anchor description_box__btn-edit" onClick={() => this.handleServiceLineEdit()} role="button">Cancel</a>
            </div>
        </div>);
    }
    const renderServiceLineRead = (line) => {
        return(<div className="row">
            <div className="service-line col-xs-12 col-sm-8 description_box__details">

              {serviceLine ? renderLineRead(line) : renderAddressRead(line)} 

           </div>
           <div className="serviceline-phone-edit description_box__edit description_box__edit_section">

                  <a className="btn btn-anchor description_box__btn-edit" onClick={this.handleServiceLineEdit} role="button">
                 {serviceLine ? 'Edit line' : 'Edit Address'}
                  
                  </a>
            </div>
        </div>)
    }
    return (
     <div className="serviceLine_templ">
                  
                 {editLine ? renderServiceLineEdit(serviceLine ? serviceLine : this.state.serviceAddress) : renderServiceLineRead(serviceLine ? serviceLine : this.state.serviceAddress)}
         
      </div>
    )
  }
}

export default ServiceLine;
