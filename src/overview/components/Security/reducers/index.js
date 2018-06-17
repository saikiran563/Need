import {
  FETCH_SECURITY_BEGIN,
  FETCH_SECURITY_SUCCESS,
} from '../actions/fetchSecurities'

import {
  createReducer,
  updateObject,
  updateItemInArray,
} from '../../../../utils/reducer'

const initialState = {
  security: null,
  isFetching: false,
  show: false,
  userId: null
}

const fetchSecurityBegin = (state, action) => {
  return updateObject(state, { isFetching: true })
}

const fetchSecuritySuccess = (state, action) => {
  return updateObject(state, {
    isFetching: false,
    list: action.secutiries,
  })
}

const securityReducer = (state = initialState, action) => {
  const { type } = action
  switch (type) {
    case FETCH_SECURITY_BEGIN:
      return fetchSecurityBegin(state, action)
    case FETCH_SECURITY_SUCCESS:
      return fetchSecuritySuccess(state, action)
    default:
      return state
  }
}

export default securityReducer
