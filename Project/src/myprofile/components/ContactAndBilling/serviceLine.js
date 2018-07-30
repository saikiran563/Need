import React, { Component } from 'react'
import InputField from '../FormElements/InputComponent'

class ServiceLine extends Component {
  constructor(props) {
    super(props)
    this.state = {
     editLine: false,
     serviceLine: this.props.serviceLine
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
    const { editLine, serviceLine } = this.state;
    const renderServiceLineEdit = (line) => {
        return(<div>
            <div className="form-group phone-block-input">
            <label htmlFor="primary phone number">Change Service Line Address</label>
                
                

            </div>
        </div>);
    }
    const renderServiceLineRead = (line) => {
        return(<div className="row">
            <div className="service-line description_box__read col-md-6">

              <p>{line} [Device Nickname]</p>

           </div>
           <div className="serviceline-phone-edit col-md-6">
                  <a className="btn btn-anchor description_box__btn-edit" onClick={this.handleServiceLineEdit} role="button">Edit line</a>
            </div>
        </div>)
    }
    return (
     <div className="serviceLine_templ">
                  
                 {editLine ? renderServiceLineEdit(serviceLine) : renderServiceLineRead(serviceLine)}
         
      </div>
    )
  }
}

export default ServiceLine;
