import {
  FETCH_DEVICE_TILES_BEGIN,
  FETCH_DEVICE_TILES_SUCCESS,
  SHOW_DEVICE_TILES,
  SHOWPOPUP,
  CLOSEPOPUP
} from '../actions'

import {
  createReducer,
  updateObject,
  updateItemInArray,
} from '../../../../utils/reducer'

const initialState = {
  deviceTiles: [{}, {}, {}],
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

const overviewReducer = (state = initialState, action) => {
  const { type } = action
  switch (type) {
    case FETCH_DEVICE_TILES_BEGIN:
      return fetchDeviceTilesBegin(state, action)
    case FETCH_DEVICE_TILES_SUCCESS:
      return fetchDeviceTilesSuccess(state, action)
    case SHOW_DEVICE_TILES:
      return showDeviceTiles(state, action)
       case SHOWPOPUP:
      return  Object.assign({}, state, {"showpopup":true})
        case CLOSEPOPUP:
      return  Object.assign({}, state, {"showpopup":false})
    default:
      return state
  }
}

export default overviewReducer
