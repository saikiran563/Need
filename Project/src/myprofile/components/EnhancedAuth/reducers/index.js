const FETCH_SET_ENHANCED_AUTH_SUCCESS = "SET ENHANCED";
export const FETCH_ENHANCED_AUTH_EDIT_BEGIN = 'FETCH_ENHANCED_AUTH_EDIT_BEGIN';
export const FETCH_ENHANCED_AUTH_EDIT_SUCCESS = 'FETCH_ENHANCED_AUTH_EDIT_SUCCESS';

export const FETCH_SET_ENHANCED_AUTH_ERROR = 'FETCH_SET_ENHANCED_AUTH_ERROR';

const VERIFY_EMAIL='VERIFY_EMAIL';

import {
  createReducer,
  updateObject,
  updateItemInArray,
} from '../../../../utils/reducer'


const initialState = {
  isFetching: false,
  enhancedAuth: {},
  verifyemail: false,
  enhancedautherror: "",
}

const fetchEnhAuthEditBegin = (state, action) => {
  return updateObject(state, { isFetching: true })
}


const fetchSetEnhancedAuth = (state, action) => {
  return updateObject(state, {
    setenhancedAuth: action.enhancedAuth,
    isFetching: false,
    setEnhancedloaded: true

  })
}

const setEnahancedError = (state, action) => {
  return {
... state,
enhancedautherror: action.payload
  }
}

const fetchEnhancedAuthEdit = (state, action) => {

  return updateObject(state, {
    enhancedEdit: action.enhancedAuth,
    isFetching: false
  })
}


const verifyemail = (state, action) => {

  return updateObject(state, {
    verifyemail: true,
    isFetching: false
  })
}



const enhancedAuthReducer = (state = initialState, action) => {
  const {
    type
  } = action
  switch (type) {
    case FETCH_ENHANCED_AUTH_EDIT_BEGIN:
    return fetchEnhAuthEditBegin(state, action)
    case FETCH_ENHANCED_AUTH_EDIT_SUCCESS:
      return fetchEnhancedAuthEdit(state, action)
    case FETCH_SET_ENHANCED_AUTH_SUCCESS:
    console.log("success", action)
      return fetchSetEnhancedAuth(state, action)
      case FETCH_SET_ENHANCED_AUTH_ERROR:
      console.log("error", action)
      return setEnahancedError(state,action)
      case VERIFY_EMAIL:
      return verifyemail(state, action)
    default:
      return state
  }
}


export default enhancedAuthReducer
