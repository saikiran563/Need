import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import styled from "styled-components";
import SmartSearch from "./SmartSearch.jsx";

import * as actions from "./actions";
import { media } from "../../util/style";

class SmartSearchContainer extends Component {
  fetchToken = () => {
    if (!this.props.conversationToken) {
      this.props.actions.fetchToken("token");
    }
  };
  componentDidMount() {
    this.props.actions.fetchTrendingTiles("overview");
    //this.props.actions.fetchToken("token");
  }

  render() {
    return reactGlobals.discoverHub ? (
      <SmartSearch
        profile={this.props.profile}
        suggestions={this.props.suggestions}
        isFetching={this.props.isFetching}
        suggestionsVisible={this.props.suggestionsVisible}
        onFetchSuggestions={this.props.actions.fetchSuggestions}
        onFetchAnswers={this.props.actions.fetchAnswers}
        answerTiles={this.props.answerTiles}
        trendingTiles={this.props.trendingTiles}
        small={this.props.small}
        conversationToken={this.props.conversationToken}
        onFetchToken={this.fetchToken}
      />
    ) : null;
  }
}

const StaticBanner = styled.div`
  font-family: "NeueHaasGroteskDisplayBold", Arial, Helvetica, sans-serif;
  ${media.desktop`
  font-size: 4rem;
    `} ${media.mobile`
  font-size: 2rem;  
    `} padding: 1rem;
`;
const mapStateToProps = state => {
  return {
    isFetching: state.search.isFetching,
    suggestionsVisible: state.search.suggestionsVisible,
    suggestions: state.search.suggestions,
    trendingTiles: state.search.trendingTiles,
    answerTiles: state.search.answerTiles,
    conversationToken: state.search.token
      ? state.search.token.conversationToken
      : ""
  };
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(
  SmartSearchContainer
);
