import {
  FETCH_QUICK_UPDATE_TILES_BEGIN,
  FETCH_QUICK_UPDATE_TILES_SUCCESS,
} from '../actions/fetchQuickUpdateTiles'

import {
  createReducer,
  updateObject,
  updateItemInArray,
} from '../../../../utils/reducer'

const initialState = {
  quickUpdateTiles: [{}, {}, {}],
  isFetching: true,
}

const fetchQuickUpdateTilesBegin = (state, action) => {
  return updateObject(state, { isFetching: true })
}

const fetchQuickUpdateTilesSuccess = (state, action) => {
  return updateObject(state, {
    isFetching: false,
    quickUpdateTiles: action.quickUpdateTiles,
  })
}

const quickUpdatesReducer = (state = initialState, action) => {
  const { type } = action
  switch (type) {
    case FETCH_QUICK_UPDATE_TILES_BEGIN:
      return fetchQuickUpdateTilesBegin(state, action)
    case FETCH_QUICK_UPDATE_TILES_SUCCESS:
      return fetchQuickUpdateTilesSuccess(state, action)
    default:
      return state
  }
}

export default quickUpdatesReducer
