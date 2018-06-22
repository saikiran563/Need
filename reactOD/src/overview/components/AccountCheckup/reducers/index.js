import {
  FETCH_ACCOUNT_TILES_BEGIN,
  FETCH_ACCOUNT_TILES_SUCCESS,
  COMPLETE_ACCOUNT_CHECKUP_BEGIN,
  COMPLETE_ACCOUNT_CHECKUP_SUCCESS,
  SHOW_ACCOUNT_TILES,
} from '../actions'

import {
  createReducer,
  updateObject,
  updateItemInArray,
} from '../../../../utils/reducer'

const initialState = {
  accountTiles: [],
  isFetching: false,
  visible: false,
}

const fetchAccountTilesBegin = (state, action) => {
  return updateObject(state, { isFetching: true })
}

const fetchAccountTilesSuccess = (state, action) => {
  //console.log('fetchAccountTilesSuccess: ', action);
  return updateObject(state, {
    isFetching: false,
    accountTiles: action.accountTiles,
  })
}

const completeAccountCheckupBegin = (state, action) => {
  return updateObject(state, { isFetching: true })
}

const completeAccountCheckupSuccess = (state, action) => {
  //console.log('completeAccountCheckupSuccess: ', action);
  const updatedTile = action.accountTile
  const newAccountTiles = updateItemInArray(
    state.accountTiles,
    updatedTile.id,
    accountTile => {
      //console.log('accountTile: ', updatedTile);
      return updateObject(accountTile, updatedTile)
    }
  )
  //console.log('newAccountTiles:', newAccountTiles);
  return updateObject(state, { accountTiles: newAccountTiles })
}

const showAccountTiles = (state, action) => {
  return updateObject(state, { visible: true })
}

const accountCheckupReducer = (state = initialState, action) => {
  const { type } = action
  //console.log('accountCheckupReducer: ', type);
  switch (type) {
    case FETCH_ACCOUNT_TILES_BEGIN:
      return fetchAccountTilesBegin(state, action)
    case FETCH_ACCOUNT_TILES_SUCCESS:
      return fetchAccountTilesSuccess(state, action)
    case SHOW_ACCOUNT_TILES:
      return showAccountTiles(state, action)
    case COMPLETE_ACCOUNT_CHECKUP_BEGIN:
      return completeAccountCheckupBegin(state, action)
    case COMPLETE_ACCOUNT_CHECKUP_SUCCESS:
      return completeAccountCheckupSuccess(state, action)
    default:
      return state
  }
}

export default accountCheckupReducer
