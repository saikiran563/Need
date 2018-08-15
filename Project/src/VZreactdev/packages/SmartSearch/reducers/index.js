import {
  FETCH_TRENDING_TILES_BEGIN,
  FETCH_TRENDING_TILES_SUCCESS
} from "../actions/fetchTrendingTiles";

import {
  FETCH_ANSWER_TILES_BEGIN,
  FETCH_ANSWER_TILES_SUCCESS
} from "../actions/fetchAnswerTiles";

import {
  FETCH_SUGGESTIONS_BEGIN,
  FETCH_SUGGESTIONS_SUCCESS
} from "../actions/fetchSuggestions";

import { FETCH_TOKEN_BEGIN, FETCH_TOKEN_SUCCESS } from "../actions/fetchToken";
import {
  createReducer,
  updateObject,
  updateItemInArray
} from "../../../util/reducer";

const initialState = {
  trendingTiles: [],
  isFetching: false,
  suggestionsVisible: false,
  suggestions: []
};

const fetchTrendingTilesBegin = (state, action) => {
  return updateObject(state, { isFetching: true });
};

const fetchTrendingTilesSuccess = (state, action) => {
  return updateObject(state, {
    isFetching: false,
    trendingTiles: action.data.liveTiles,
    isDevice: false
  });
};

const fetchAnswerTilesBegin = (state, action) => {
  return updateObject(state, {
    isFetching: true,
    answerTiles: undefined
  });
};

const fetchAnswerTilesSuccess = (state, action) => {
  debugger;
  if (action.data.conversationToken) {
    return updateObject(state, {
      isFetching: false,
      answerTiles: action.data.cards,
      token: { conversationToken: action.data.conversationToken }
    });
  }
  return updateObject(state, {
    isFetching: false,
    answerTiles: action.data.cards
  });
};

export const fetchSuggestionsBegin = (state, action) => {
  return updateObject(state, {
    isFetching: true,
    suggestionsVisible: false,
    suggestions: undefined
  });
};

export const fetchSuggestionsSuccess = (state, action) => {
  //console.log('search reducer: ', action);
  return updateObject(state, {
    isFetching: false,
    suggestionsVisible: true,
    suggestions: action.suggestions
  });
};

export const fetchTokenBegin = (state, action) => {
  return updateObject(state, { isFetching: true });
};
export const fetchTokenSuccess = (state, action) => {
  debugger;
  return updateObject(state, {
    isFetching: false,
    token: action.token
  });
};
const searchReducer = (state = initialState, action) => {
  const { type } = action;
  switch (type) {
    case FETCH_TRENDING_TILES_BEGIN:
      return fetchTrendingTilesBegin(state, action);
    case FETCH_TRENDING_TILES_SUCCESS:
      return fetchTrendingTilesSuccess(state, action);
    case FETCH_ANSWER_TILES_BEGIN:
      return fetchAnswerTilesBegin(state, action);
    case FETCH_ANSWER_TILES_SUCCESS:
      return fetchAnswerTilesSuccess(state, action);
    case FETCH_SUGGESTIONS_BEGIN:
      return fetchSuggestionsBegin(state, action);
    case FETCH_SUGGESTIONS_SUCCESS:
      return fetchSuggestionsSuccess(state, action);
    case FETCH_TOKEN_BEGIN:
      return fetchTokenBegin(state, action);
    case FETCH_TOKEN_SUCCESS:
      return fetchTokenSuccess(state, action);
    default:
      return state;
  }
};

export default searchReducer;

export const getIsFetching = state => state.isFetching;
