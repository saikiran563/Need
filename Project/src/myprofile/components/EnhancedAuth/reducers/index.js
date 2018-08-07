const FETCH_SET_ENHANCED_AUTH_SUCCESS = "SET ENHANCED"
export const FETCH_ENHANCED_AUTH_EDIT = 'FETCH_ENHANCED_AUTH_EDIT';
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
}


const fetchSetEnhancedAuth = (state, action) => {
  return updateObject(state, {
    setenhancedAuth: action.enhancedAuth,
    isFetching: false,
    setEnhancedloaded: true



  })
}


const fetchSetEnhEdit = (state, action) => {

  return updateObject(state, {
    enhancedEdit: action.enhancedAuth.twoFactorAuth
  })
}
const verifyemail = (state, action) => {

  return updateObject(state, {
    verifyemail: true
  })
}



const enhancedAuthReducer = (state = initialState, action) => {
  const {
    type
  } = action
  switch (type) {
    case FETCH_ENHANCED_AUTH_EDIT:
      return fetchSetEnhEdit(state, action)
    case FETCH_SET_ENHANCED_AUTH_SUCCESS:
      return fetchSetEnhancedAuth(state, action)
      case VERIFY_EMAIL:
      return verifyemail(state, action)
    default:
      return state
  }
}


export default enhancedAuthReducer
