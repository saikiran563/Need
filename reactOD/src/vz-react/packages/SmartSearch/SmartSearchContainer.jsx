import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import SmartSearch from './SmartSearch'

import * as actions from './actions'

class SmartSearchContainer extends Component {
  componentDidMount() {
    //console.log('this.props:', this.props);
    this.props.actions.fetchTrendingTiles('trending')
  }

  render() {
    return (
      <SmartSearch
        profile={this.props.profile}
        suggestions={this.props.suggestions}
        isFetching={this.props.isFetching}
        onFetchSuggestions={this.props.actions.fetchSuggestions}
        onFetchAnswers={this.props.actions.fetchAnswers}
        answerTiles={this.props.answerTiles}
        trendingTiles={this.props.trendingTiles}
        small={this.props.small}
      />
    )
  }
}

const mapStateToProps = state => {
  //console.log('mapStateToProps; ', state);
  return {
    isFetching: state.search.isFetching,
    suggestions: state.search.suggestions,
    trendingTiles: state.search.trendingTiles,
    answerTiles: state.search.answerTiles,
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(
  SmartSearchContainer
)
