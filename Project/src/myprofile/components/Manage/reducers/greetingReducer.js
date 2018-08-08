const initialState = {
  greeting: ''
}

import {
  createReducer,
  updateObject,
  updateItemInArray,
} from '../../../../utils/reducer'

const greetingReducer = (state = initialState, action) => {
  const { type } = action
  switch (type) {
    case 'FETCH_MANAGE_LANDING_SUCCESS':
      return updateObject(state, {
        greeting: action.response.greetingName
      })
    case 'FETCH_MANAGE_SUCCESS':
      return state
    default:
      return state
  }
}

export default greetingReducer
