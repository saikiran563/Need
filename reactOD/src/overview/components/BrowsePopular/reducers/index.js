import {
  FETCH_POPULAR_TILES_BEGIN,
  FETCH_POPULAR_TILES_SUCCESS,
  SHOW_POPULAR_TILES,
} from '../actions'

import {
  createReducer,
  updateObject,
  updateItemInArray,
} from '../../../../utils/reducer'

const initialState = {
  popularTiles: [],
  isFetching: false,
  visible: false,
}

const fetchPopularTilesBegin = (state, action) => {
  return updateObject(state, { isFetching: true })
}

const fetchPopularTilesSuccess = (state, action) => {
  return updateObject(state, {
    isFetching: false,
    popularTiles: action.popularTiles,
  })
}

const showPopularTiles = (state, action) => {
  return updateObject(state, { visible: true })
}

const browsePopularReducer = (state = initialState, action) => {
  const { type } = action
  switch (type) {
    case FETCH_POPULAR_TILES_BEGIN:
      return fetchPopularTilesBegin(state, action)
    case FETCH_POPULAR_TILES_SUCCESS:
      return fetchPopularTilesSuccess(state, action)
    case SHOW_POPULAR_TILES:
      return showPopularTiles(state, action)
    default:
      return state
  }
}

export default browsePopularReducer
