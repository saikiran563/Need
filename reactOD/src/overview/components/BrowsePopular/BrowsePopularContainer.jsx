import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import BrowsePopular from './BrowsePopular'

import * as actions from './actions'

class BrowsePopularContainer extends Component {
  componentDidMount() {
    //console.log('*** Devices: this.props:', this.props);
    this.props.actions.fetchPopularTiles()
  }

  render() {
    return (
      <BrowsePopular
        visible={this.props.visible}
        onEnter={this.props.actions.showPopularTiles}
        {...this.props}
      />
    )
  }
}

const mapStateToProps = state => {
  //console.log('mapStateToProps; ', state);
  return {
    isFetching: state.popular.isFetching,
    popularTiles: state.popular.popularTiles,
    visible: state.popular.visible,
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(
  BrowsePopularContainer
)
