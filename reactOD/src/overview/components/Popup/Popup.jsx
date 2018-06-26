import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import  * as actions from '../QuickLinks/actions';

import AccessRoles from './AccessRoles'

class Popup extends Component {
constructor(){
    super();
    this.closepop=this.closepop.bind(this);

}
closepop(){
     this.props.actions.close_popup("my data sample"); /* calling to action */
}

    render() {
    
        return (

        
         <div id="overlayContainer" className={this.props.state?'visible':'hidden'}>
            <div id="overlayBackground"></div>
            <div id="overlayFrame" className="animated fadeIn a-fast">
              <span className="close-wrapper"><a id="overlayClose" onClick={this.closepop} href="#" role="button"><span className="a-sr a-sr-fix" aria-hidden="false">Close</span><span className="a-icon-overlay-close" aria-hidden="true"></span></a></span>
              <div>
                <div id="security-modal" className="aMyProfile aMyProfile__modal overlay-content">

<AccessRoles />
                </div>
                </div>
                </div>
                

         

         </div>
  )
    }
}


const mapStateToProps = state => {
  //console.log('mapStateToProps; ', state);
  return {
    isFetching: state.overview.isFetching,
    state:state.overview.showpopup
 
  }
}

const mapDispatchToProps = dispatch => ({
 actions: bindActionCreators(actions, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(Popup)