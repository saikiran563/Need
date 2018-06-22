import React, { Component } from 'react'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import styled from 'styled-components'

import * as actions from './actions'
import QuickUpdates from './QuickUpdates'

class QuickUpdatesContainer extends Component {
  componentDidMount() {
    //console.log('this.props:', this.props);
    this.props.actions.fetchQuickUpdateTiles()
  }

  render() {
    return (
      <QuickUpdates
        quickUpdateTiles={this.props.quickUpdateTiles}
        visible={true}
        isFetching={this.props.isFetching}
      />
    )
  }
}

const mapStateToProps = state => {
  console.log('mapStateToProps: ', state)
  return {
    quickUpdateTiles: state.quickUpdates.quickUpdateTiles,
    isFetching: state.quickUpdates.isFetching,
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(
  QuickUpdatesContainer
)
