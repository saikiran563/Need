import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import HeaderContent from "../Overview/HeaderContent";
import Devices from './Devices'

import * as actions from './actions'

class DevicesContainer extends Component {
  componentDidMount() {
    //console.log('*** Devices: this.props:', this.props);
    this.props.actions.fetchDeviceTiles()
  }

  render() {
    return (
      <div>
      <HeaderContent/>
      <Devices
        visible={this.props.visible}
        onEnter={this.props.actions.showDeviceTiles}
        {...this.props}
      />
      </div>
    )
  }
}

const mapStateToProps = state => {
  //console.log('mapStateToProps; ', state);
  return {
    isFetching: state.devices.isFetching,
    deviceTiles: state.devices.deviceTiles,
    visible: state.devices.visible,
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(DevicesContainer)
