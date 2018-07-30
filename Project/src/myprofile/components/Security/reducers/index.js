import {
  FETCH_SECURITY_BEGIN,
  FETCH_SECURITY_SUCCESS,
  GET_USER_INFO,
  GET_USER_FAIL,
  GET_META_INFO,
  GET_META_FAIL,
  SET_USER_INFO,
  SET_PIN_INFO,
  GET_QUES_INFO,
  SET_QUES_INFO,
  GET_QUES_FAIL,
  SET_QUES_FAIL,
  SET_PIN_FAIL,
  SET_PASSWORD_FAIL,
  SET_PASSWORD_INFO,
  
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
  userId: null,
  oldPassword: null,
  newPassword: null,
  confirmNewPassword: null,
  passwordUpdatedStatus: false
}

const fetchSecurityBegin = (state, action) => {
  return updateObject(state, { isFetching: true })
}

const fetchSecuritySuccess = (state, action) => {
   
  return updateObject(state, {
    isFetching: false,
    list: action.securities,
    
  })
}

const getMetaDataSuccess = (state , action) => {
console.log(state,"-",action.response);
  return updateObject(state, {
    isFetching :false,
    metaData:action.response

  })
}

const getMetaDataError = (state , action) => {
console.log(state,"-",action.response);
  return updateObject(state, {
    isFetching :false,
    metaData:action.response

  })
}
const setUserIdSuccess = (state , action) => {
  // console.log(state,"-",action.response);
 var response = action.response;
 if(response && response.status == "200") {
  //respose.status = true;
  return updateObject(state, {
    // isFetching: true,
    userstatus:response,
    isFetching :false
  }) 
 }
}
const setPinSuccess = (state , action) => {
  var response = action.response;
 if(response && response.status == "200") {
  respose.status = true;
  return updateObject(state, {
    isFetching :false,
    pinstatus:action.response

  })
 }
}
const setPinError = (state , action) => {
  action.respose.status = false;
  return updateObject(state, {
    isFetching :false,
    pinstatus:action.response

  })
}
const getQuestionSuccess = (state , action) => {
  return updateObject(state, {
    isFetching :false,
    question:action.response

  })
}
const setQuestionSuccess = (state , action) => {
  var response = action.response;
 if(response && response.status == "200") {
  respose.status = true;
  return updateObject(state, {
    isFetching :false,
    question:action.response

  })
 }
}

const setPasswordSuccess = (state, action) => {
  console.log(state,"-",action.response);
  var response = action.response;
 if(response && response.status == "200") {
   response.status = true;
   return updateObject(state, {
    isFetching :false,
    passwordStatus: response
  })
 } else {
   response.status = false;
   return updateObject(state, {
    isFetching :false,
    passwordStatus: response
  })
 }
}


const setPasswordError = (state, action) => {
  action.response.status = false;
   return updateObject(state, {
    isFetching :false,
     passwordStatus: action.response
  })
}
const securityReducer = (state = initialState, action) => {
  const { type } = action
  switch (type) {
    case FETCH_SECURITY_BEGIN:
      return fetchSecurityBegin(state, action)
    case FETCH_SECURITY_SUCCESS:
      return fetchSecuritySuccess(state, action)
    case GET_META_INFO:
      return getMetaDataSuccess(state,action);
    case GET_META_FAIL:
      return getMetaDataError(state,action);
    case SET_USER_INFO:
      return  setUserIdSuccess(state,action);
    case SET_PIN_INFO:
      return  setPinSuccess(state,action);
      case SET_PIN_FAIL:
      return  setPinError(state,action);
    case GET_QUES_INFO:
      return getQuestionSuccess(state,action);  
    case SET_PASSWORD_INFO:
      return setPasswordSuccess(state,action);
      case SET_PASSWORD_FAIL:
      return setPasswordFail(state, action)
    default:
      return state
  }
}

export default securityReducer
