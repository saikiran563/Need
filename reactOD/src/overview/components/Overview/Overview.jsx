import React, { Component } from 'react'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as actions from './actions'

import HeaderContent from './HeaderContent';

import TileProfile from './TileProfile';



import LeftContent from './leftcontent';
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
    return (
      <React.Fragment>

        <div className="main_content">
         <Popup showpop={showpopup.overview.showpopup}/>

      <div id="aMyProfile" className="oneD-wrapper aMyProfile aMyProfile__landing">
        <div className="col-md-3 menu-container">
          <LeftContent />
        </div>
        <div className="col-md-9 a-quicklinks">
          <HeaderContent />
          <div className="row quicklinks-list">
            {profileobj.map((item, i) => <TileProfile key={i} imagePath={item.imagePath} title={item.overline} urlPath={item.urlPath} subheader={item.subheader} />)}


          </div>
          {/* { profileobj.map(item => <TileProfile title={item.overline}/>)} */}
          {/*<Devices profile={this.props.profile} /> */}
          {/*<AccountCheckup profile={this.props.profile} />*/}
        </div>

      </div>
        </div >
       
      
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
