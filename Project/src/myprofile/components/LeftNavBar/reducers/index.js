const FETCH_LEFTNAV_BEGIN = 'leftnav/FETCH_LEFTNAV_BEGIN'
const FETCH_LEFTNAV_SUCCESS = 'leftnav/FETCH_LEFTNAV_SUCCESS'

import {
  createReducer,
  updateObject,
  updateItemInArray,
} from '../../../../utils/reducer'


const initialState = {
  isFetching: false,
  leftNav: {},
}


const fetchLeftNavBegin = (state, action) => {
  return updateObject(state, { isFetching: true })
}


const fetchLeftNavSuccess = (state, action) => {
  return updateObject(state, {
    isFetching: false,
    leftNav: action.leftNav,
  })
}

const leftNavReducer = (state = initialState, action) => {
  const { type } = action
  switch (type) {
    case FETCH_LEFTNAV_BEGIN:
      return fetchLeftNavBegin(state, action)
    case FETCH_LEFTNAV_SUCCESS:
      return fetchLeftNavSuccess(state, action)
    default:
      return state
  }
}


export default leftNavReducer