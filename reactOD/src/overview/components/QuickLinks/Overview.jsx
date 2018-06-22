import React, { Component } from 'react'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as actions from './actions'

import HeaderContent from './HeaderContent';

import TileProfile from './TileProfile';



import LeftContent from './LeftContent';
import Popup from '../Popup/Popup';

require('../../../assets/css/main.css');
require('../../../assets/css/my-profile.css');
require('../../../assets/css/oneD-Global.css');
require('../../../assets/css/phoenixGlobal.css');

class Overview extends Component {
  componentDidMount() {
    //console.log('this.props:', this.props);
    this.props.actions.fetchDeviceTiles()
    this.props.actions.showDeviceTiles();
  }

  render() {
    let profileobj = this.props.deviceTiles;
    let showpopup=this.props.state;
    const aocheck= window.reactGlobals.deviceLandingUrl.indexOf("ao")>-1;
    return (
      <React.Fragment>
         <Popup showpop={showpopup.overview.showpopup}/>  
          <HeaderContent />
          <div className={`row quicklinks-list  ${!aocheck ? "disabled":''}`}>
            {profileobj.map((item, i) => <TileProfile key={i} imagePath={item.imagePath} title={item.overline} tiledisabled={aocheck} urlPath={item.urlPath} subheader={item.subheader} />)}


          </div>
          {/* { profileobj.map(item => <TileProfile title={item.overline}/>)} */}
          {/*<Devices profile={this.props.profile} /> */}
          {/*<AccountCheckup profile={this.props.profile} />*/}
       
       
      
      </React.Fragment >
    )
  }
}

const mapStateToProps = state => {
  //console.log('mapStateToProps; ', state);
  return {
    isFetching: state.overview.isFetching,
    deviceTiles: state.overview.deviceTiles,
    visible: state.overview.visible,
    state:state,
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(Overview)
