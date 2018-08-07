import {
  FETCH_PROFILE_TILES_BEGIN,
  FETCH_PROFILE_TILES_SUCCESS,
  SHOW_PROFILE_TILES,
  SHOWPOPUP,
  CLOSEPOPUP,
  EDIT_EMAIL
} from '../actions'

import {
  createReducer,
  updateObject,
  updateItemInArray,
} from '../../../../utils/reducer'

const initialState = {
  deviceTiles: {},
  showpopup:false,
  isFetching: true,
}

const fetchDeviceTilesBegin = (state, action) => {
  return updateObject(state, { isFetching: true })
}

const fetchDeviceTilesSuccess = (state, action) => {
  return updateObject(state, {
    isFetching: false,
    deviceTiles: action.deviceTiles,
     showpopup:false,
  })
}

const showDeviceTiles = (state, action) => {
  return updateObject(state, { visible: true })
}

const myprofileReducer = (state = initialState, action) => {
  const { type } = action
  switch (type) {
    case FETCH_PROFILE_TILES_BEGIN:
      return fetchDeviceTilesBegin(state, action)
    case FETCH_PROFILE_TILES_SUCCESS:
      return fetchDeviceTilesSuccess(state, action)
    case SHOW_PROFILE_TILES:
      return showDeviceTiles(state, action)
       case SHOWPOPUP:
      return  Object.assign({}, state, {"showpopup":true})
        case CLOSEPOPUP:
      return  Object.assign({}, state, {"showpopup":false})
       case EDIT_EMAIL:
      return Object.assign({}, state, {"editemail":action.flag})
      
    default:
      return state
  }
}

export default myprofileReducer
