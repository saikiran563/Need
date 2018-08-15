import React, { Component } from 'react'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as actions from './actions'

import HeaderContent from './HeaderContent';

import TileProfile from './TileProfile';

import VendorScripts from '../../ProfileTagging/VendorScripts'


import LeftNav from '../LeftNavBar/leftNav';
import Popup from '../Popup/Popup';

require('../../../assets/css/main.css');
require('../../../assets/css/my-profile.css');
require('../../../assets/css/oneD-Global.css');
require('../../../assets/css/phoenixGlobal.css');

class QuickLinks extends Component {
  componentDidMount() {
    this.props.actions.fetchDeviceTiles()
    this.props.actions.showDeviceTiles();
  }

  render() {
    let profileobj = this.props.deviceTiles;

    return (
      <React.Fragment>
        <HeaderContent />
        <TileProfile />
        <VendorScripts />
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  //console.log('mapStateToProps; ', state);
  return {
    isFetching: state.myprofile.isFetching,
    deviceTiles: state.myprofile.deviceTiles,
    visible: state.myprofile.visible,
    state: state,
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(QuickLinks)
