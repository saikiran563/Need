import {
  FETCH_MANAGE_BEGIN,
  FETCH_MANAGE_SUCCESS,
} from '../actions/fetchManage'

import {
  createReducer,
  updateObject,
  updateItemInArray,
} from '../../../../utils/reducer'

const initialState = {
  manager: null,
  isFetching: false,
  show: false,
  userId: null
}

const fetchManageBegin = (state, action) => {
  return updateObject(state, { isFetching: true })
}

const fetchManageSuccess = (state, action) => {
  return updateObject(state, {
    isFetching: false,
    list: action.secutiries,
  })
}

const manageReducer = (state = initialState, action) => {
  const { type } = action
  switch (type) {
    case FETCH_MANAGE_BEGIN:
      return fetchManagerBegin(state, action)
    case FETCH_MANAGE_SUCCESS:
      return fetchManagerSuccess(state, action)
    default:
      return state
  }
}

export default managerReducer
