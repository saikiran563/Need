import {
  FETCH_TRENDING_TILES_BEGIN,
  FETCH_TRENDING_TILES_SUCCESS,
} from '../actions/fetchTrendingTiles'

import {
  FETCH_ANSWER_TILES_BEGIN,
  FETCH_ANSWER_TILES_SUCCESS,
} from '../actions/fetchAnswerTiles'

import {
  FETCH_SUGGESTIONS_BEGIN,
  FETCH_SUGGESTIONS_SUCCESS,
} from '../actions/fetchSuggestions'

import {
  createReducer,
  updateObject,
  updateItemInArray,
} from '../../../../utils/reducer'

const initialState = {
  trendingTiles: [],
  isFetching: false,
  suggestions: [],
}

const fetchTrendingTilesBegin = (state, action) => {
  return updateObject(state, { isFetching: true })
}

const fetchTrendingTilesSuccess = (state, action) => {
  return updateObject(state, {
    isFetching: false,
    trendingTiles: action.trendingTiles,
    isDevice: false,
  })
}

const fetchAnswerTilesBegin = (state, action) => {
  return updateObject(state, { isFetching: true })
}

const fetchAnswerTilesSuccess = (state, action) => {
  return updateObject(state, {
    isFetching: false,
    answerTiles: action.answerTiles,
  })
}

export const fetchSuggestionsBegin = (state, action) => {
  return updateObject(state, { isFetching: true })
}

export const fetchSuggestionsSuccess = (state, action) => {
  //console.log('search reducer: ', action);
  return updateObject(state, {
    isFetching: false,
    suggestions: action.suggestions,
  })
}

const searchReducer = (state = initialState, action) => {
  const { type } = action
  switch (type) {
    case FETCH_TRENDING_TILES_BEGIN:
      return fetchTrendingTilesBegin(state, action)
    case FETCH_TRENDING_TILES_SUCCESS:
      return fetchTrendingTilesSuccess(state, action)
    case FETCH_ANSWER_TILES_BEGIN:
      return fetchAnswerTilesBegin(state, action)
    case FETCH_ANSWER_TILES_SUCCESS:
      return fetchAnswerTilesSuccess(state, action)
    case FETCH_SUGGESTIONS_BEGIN:
      return fetchSuggestionsBegin(state, action)
    case FETCH_SUGGESTIONS_SUCCESS:
      return fetchSuggestionsSuccess(state, action)
    default:
      return state
  }
}

export default searchReducer

export const getIsFetching = state => state.isFetching
