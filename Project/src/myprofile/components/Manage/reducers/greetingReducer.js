import {
  POST_GREETING_NAME_BEGIN,
  POST_GREETING_NAME_SUCCESS,
  POST_GREETING_NAME_FAIL,
} from '../actions/greeting'

import {
  FETCH_MANAGE_LANDING_BEGIN,
  FETCH_MANAGE_LANDING_SUCCESS,
  FETCH_MANAGE_LANDING_FAIL
} from '../actions/manage'

const initialState = {
  greetingName: '',
  getStatus: '',
  postStatus: '',
}

import {
  createReducer,
  updateObject,
  updateItemInArray,
} from '../../../../utils/reducer'

const greetingReducer = (state = initialState, action) => {
  const { type } = action
  switch (type) {
    case FETCH_MANAGE_LANDING_BEGIN:
      return updateObject(state, {
        getStatus: 'begin'
      })
    case FETCH_MANAGE_LANDING_SUCCESS:
      return updateObject(state, {
        greetingName: action.response.greetingName,
        getStatus: 'success'
      })
    case FETCH_MANAGE_LANDING_FAIL:
      return updateObject(state, {
        getStatus: 'failed'
      })
    case POST_GREETING_NAME_BEGIN:
      return updateObject(state, {
        postStatus: 'begin'
      })
    case POST_GREETING_NAME_SUCCESS:
      return updateObject(state, {
        greeting: action.response.greetingName,
        postStatus: 'success'
      })
    case POST_GREETING_NAME_FAIL:
      return updateObject(state, {
        greetingName: action.response.greetingName,
        postStatus: 'failed'
      })
    default:
        return state
  }
}

export default greetingReducer
