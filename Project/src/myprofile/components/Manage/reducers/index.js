import {
  FETCH_MANAGE_BEGIN,
  FETCH_MANAGE_SUCCESS,
} from '../actions/manage'

import {
  createReducer,
  updateObject,
  updateItemInArray,
} from '../../../../utils/reducer'

const initialState = {
  manageResponse: null,
  isFetching: false,
  show: false,
  userId: null,
}

const fetchManageBegin = (state, action) => {
  return updateObject(state, { isFetching: true })
}

const fetchManageSuccess = (state, action) => {
  return  updateObject(state, {
    isFetching: false,
    manageResponse: action.manage,
  })
}

const manageReducer = (state = initialState, action) => {
  const { type } = action
  switch (type) {
    case FETCH_MANAGE_BEGIN:
      return fetchManageBegin(state, action)
    case FETCH_MANAGE_SUCCESS:
      return fetchManageSuccess(state, action)
    default:
      return state
  }
}

export default manageReducer
