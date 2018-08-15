import React, { Component } from 'react';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import * as actions from "./actions";

import './Accordion.css';


class Accordion extends Component{
    constructor(props){
        super(props);
        this.handleKeyDown=this.handleKeyDown.bind(this);
        this.open=false;
        this.idNum=this.props.accordion.idNum+1;
        this.props.actions.createID();
    }
    
handleKeyDown(evt){
  var keyCode=evt.keyCode || evt.which;
  if (keyCode === 13 || keyCode === 32) {
          this.handleClick();
  }
}
handleKeyUp(evt,id){
  var keyCode=evt.keyCode || evt.which;
  if(id !== 1){
      document.getElementById('accordion__title-'+(id-1)).className='accordion__title';
  }
  if(keyCode === 9 || keyCode === 16 || keyCode === 13){
    document.getElementById('accordion__title-'+id).className='accordion__title focused';
  }
}
handleClick(){
  document.getElementById('accordion__title-'+this.idNum).className='accordion__title';
  this.open=!this.open;
  this.props.actions.handleClick(this.open);
  if(this.open && this.props.onExpand){
    this.props.onExpand();
  }
  if(!this.open && this.props.onCollapse){
    this.props.onCollapse();
  }
}

  render() {
     return (
      <div className="">
        <div className="accordion">
   <div className="accordion__item">
      <div id={'accordion__title-'+this.idNum} analyticstrack={this.props.anlyticsProps} onKeyUp={(e)=>{this.handleKeyUp(e,this.idNum)}} onClick={()=>this.handleClick()} onKeyDown={this.handleKeyDown} aria-expanded={this.open?'true':'false'} aria-controls={'accordion__body-'+this.idNum} className="accordion__title" role="button" tabIndex="0">
         <div className="u-position-relative">
            <div className="accordion-title">{this.props.title}</div>
            <div className="accordion__arrow" role="presentation"></div>
         </div>
      </div>
      <div id={'accordion__body-'+this.idNum} className={this.open?'accordion__body':'accordion__body accordion__body--hidden'} aria-hidden={this.open?'false':'true'} aria-labelledby={'accordion__title-'+this.idNum}>
         {this.props.children}
      </div>
   </div>
</div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    accordion: state.accordionState
  };
};
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
});
export default connect(mapStateToProps,mapDispatchToProps)(Accordion);