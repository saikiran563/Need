import {
  FETCH_SECURITY_BEGIN,
  FETCH_SECURITY_SUCCESS,
  GET_USER_INFO,
  SET_USER_INFO,
  SET_PIN_INFO
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
const getUserIdSuccess = (state , action) => {
  return updateObject(state, {
    isFetching :false,
    status:action.response

  })
}
const setUserIdSuccess = (state , action) => {
  return updateObject(state, {
    isFetching :false,
    status:action.response

  })
}
const setPinSuccess = (state , action) => {
  return updateObject(state, {
    isFetching :false,
    status:action.response

  })
}
const securityReducer = (state = initialState, action) => {
  const { type } = action
  switch (type) {
    case FETCH_SECURITY_BEGIN:
      return fetchSecurityBegin(state, action)
    case FETCH_SECURITY_SUCCESS:
      return fetchSecuritySuccess(state, action)
    case GET_USER_INFO:
      return getUserIdSuccess(state,action);
    case SET_USER_INFO:
      return  setUserIdSuccess(state,action);
    case SET_PIN_INFO:
      return  setPinSuccess(state,action);
      
      
    default:
      return state
  }
}

export default securityReducer
