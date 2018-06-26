import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import AccountCheckup from './AccountCheckup'

import * as actions from './actions'

class AccountCheckupContainer extends Component {
  componentDidMount() {
    //console.log('*** AccountCheckup: this.props:', this.props);
    this.props.actions.fetchAccountTiles()
  }

  render() {
    return (
      <AccountCheckup
        visible={this.props.visible}
        onEnter={this.props.actions.showAccountTiles}
        {...this.props}
        onComplete={this.props.actions.completeAccountCheckup}
      />
    )
  }
}

const mapStateToProps = state => {
  //console.log('mapStateToProps; ', state);
  return {
    isFetching: state.account.isFetching,
    accountTiles: state.account.accountTiles,
    visible: state.account.visible && state.account.accountTiles.length > 0,
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(
  AccountCheckupContainer
)
