const FETCH_ENHANCED_AUTH_BEGIN = 'enhancedauth/FETCH_ENHANCED_AUTH_BEGIN'
const FETCH_ENHANCED_AUTH_SUCCESS = 'enhancedauth/FETCH_ENHANCED_AUTH_SUCCESS'
const FETCH_SET_ENHANCED_AUTH_SUCCESS= "SET ENHANCED"
import {
    createReducer,
    updateObject,
    updateItemInArray,
  } from '../../../../utils/reducer'


  const initialState = {
    isFetching: false,
    enhancedAuth: {},
  }

  const fetchEnhancedAuthBegin = (state, action) => {
    return updateObject(state, { isFetching: true,  setEnhancedloaded: false })
  }
  const fetchSetEnhancedAuth =(state,action)=>{
    return updateObject(state, {
           setenhancedAuth:action.enhancedAuth ,
           isFetching: false,
           setEnhancedloaded: true


    })
  }
  
  const fetchEnhancedAuthSuccess = (state, action) => {
    return updateObject(state, {
      isFetching: false,
      enhancedAuth: action.enhancedAuth,
    })
  }

  const enhancedAuthReducer = (state = initialState, action) => {
    const { type } = action
    switch (type) {
      case FETCH_ENHANCED_AUTH_BEGIN:
        return fetchEnhancedAuthBegin(state, action)
      case FETCH_ENHANCED_AUTH_SUCCESS:
        return fetchEnhancedAuthSuccess(state, action)        
        case FETCH_SET_ENHANCED_AUTH_SUCCESS:
        return fetchSetEnhancedAuth(state, action)
      default:
        return state
    }
  }
  
  
  export default enhancedAuthReducer