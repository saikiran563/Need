import {
  FETCH_SECURITY_BEGIN,
  FETCH_SECURITY_SUCCESS,
  GET_META_INFO,
  GET_META_FAIL,
  SET_USER_INFO,
  SET_USER_FAIL,
  SET_PIN_INFO,
  GET_QUES_INFO,
  SET_QUES_INFO,
  GET_QUES_FAIL,
  GET_BAN_PWD_INFO,
  SET_QUES_FAIL,
  SET_PIN_ERROR,
  SET_PASSWORD_FAIL,
  SET_PASSWORD_INFO,
  GET_SECRET_PIN_STATUS,
  GET_SECRET_PIN_STATUS_FAIL,
  GET_LIST_OF_USER_NUMBERS,
  GET_LIST_OF_USER_NUMBERS_FAIL,
  SEND_SECURE_PIN_TO_PHONE,
  SEND_SECURE_PIN_TO_PHONE_FAIL,
  CONFIRM_SECURE_PIN_CODE,
  CONFIRM_SECURE_PIN_CODE_FAIL,
  CLEAR_ERROR_CODES  
} from '../actions/fetchSecurities'

import {
  createReducer,
  updateObject,
  updateItemInArray,
} from '../../../../utils/reducer'

const initialState = {
  isFetching: false,
  show: false,
  userId: null,
  passwordStatus:null,
  userstatus:null,
  pinstatus:null,
  questionStatus:null,
  metaData:null,
  secretPin: null,
  listOfUserNumbers: [],
  smartPinMtn: "",
  userIdError: "",
  passwordError: "",
  accountPinError: "",
  setQuestionError: "",
  statusCodeError: "",
  listOfUserNumbersError: "",
  sendSecurePinError: "",
  confirmSecurePinError: "",
  securePinError: ""
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
  return updateObject(state, {
    isFetching :true,
    metaData:action.response

  })
}

const getMetaDataError = (state , action) => {
  return updateObject(state, {
    isFetching :false,
    metaData:action.response

  })
}
const getQuestionSuccess = (state , action) => {
  return updateObject(state, {
    isFetching :false,
    questionList:action.response

  })
}
const getBannedListSuccess  = (state , action) => {
  return updateObject(state, {
    isFetching :true,
    passwordList:action.response
  })
}

const setUserIdSuccess = (state , action) => {
  var response = action.response;
  if(response && response.statusCode == "0") {
   response.status = true;
   return updateObject(state, {
     isFetching :true,
     userstatus:response,
     userIdError: ""
   }) 
  }
  // else if(response && response.statusCode == "1") {
  //  console.log( ' err response',response);
  //    response.status = false;
  //    return updateObject(state, {
  //    isFetching :true,
  //    userstatus:response
  //  }) 
  //  }
 }

 const setPinSuccess = (state , action) => {
  var response = action.response;
 if(response && response.statusCode == "0") {
  response.status = true;
  return updateObject(state, {
    isFetching :false,
    pinstatus:action.response,
    accountPinError: ""
  })
 }
//  else if(response && response.statusCode == "1") {
//     response.status = false;
//      return updateObject(state, {
//     isFetching :false,
//     pinstatus:action.response
//   }) 
//   }
}
const setPinError = (state , action) => {
  return {
    ...state,
    accountPinError: action.payload
  }
  // var response = action.response;
  // if(response && response.statusCode == "1") { 
  //   response.status = false;
  // return updateObject(state, {
  //   isFetching :false,
  //   pinstatus:action.response

  // })
  // }
}

const setQuestionSuccess = (state , action) => {
  // var response = action.response;
//  if(response && response.statusCode == "0") {
  // response.status = true;
  return updateObject(state, {
    isFetching :false,
    questionStatus:action,
    setQuestionError: ""
  })
//  }
//  else if(response && response.statusCode == "1") {
//    response.status = false;
//      return updateObject(state, {
//     isFetching :false,
//     userstatus:response
//   }) 
//   }
}

const setQuestionFail = (state, action) => {
  return {
    ...state,
    setQuestionError: action.payload,
    isFetching: false
  }
}

const setPasswordSuccess = (state, action) => {
  var response = action.response;
 if(response && response.statusCode == "0") {
   response.status = true;
   return updateObject(state, {
    isFetching :false,
    passwordStatus: response,
    passwordError: ""
  })
 }
//   else if(response && response.statusCode == "1") {
//    response.status = false;
//    return updateObject(state, {
//     isFetching :false,
//     passwordStatus: response
//   })
//  }
}


const setPasswordFail = (state, action) => {
  // var response = action.response;
    return {
      ...state,
      passwordError: action.payload
    }
  // if(response && response.statusCode == "1") { 
  //   response.status = false;
  //  return updateObject(state, {
  //   isFetching :false,
  //    passwordStatus: action.response
  //  })
  // }
}
const securityReducer = (state = initialState, action) => {
  //console.log("--",action)
  const { type } = action
  // console.log("TYPE", type)
  
  switch (type) {
    case CLEAR_ERROR_CODES:
      return {
        ...state,
        securePinError: "",
        userIdError: "",
        passwordError: "",
        accountPinError: "",
        setQuestionError: "",
        listOfUserNumbersError: "",
        sendSecurePinError: "",
        confirmSecurePinError: ""
      }
    case GET_SECRET_PIN_STATUS:
    console.log("GET_SECRET_PIN_STATUS",action.payload)    
    return {
      ...state,
      secretPin: action.payload,
      securePinError: ""
    }
    case GET_SECRET_PIN_STATUS_FAIL:
    console.log("GET_SECRET_PIN_STATUS_FAIL", action)
      return {
        ...state,
        securePinError: action.payload
      }
    case GET_LIST_OF_USER_NUMBERS: 
    console.log("GET_LIST_OF_USER_NUMBERS",action.payload)    
      return {
        ...state,
        listOfUserNumbers: action.payload,
        listOfUserNumbersError: ""
      }
    case GET_LIST_OF_USER_NUMBERS_FAIL:
    console.log("GET_LIST_OF_USER_NUMBERS_FAIL", action)
      return {
        ...state,
        listOfUserNumbersError: action.payload
      }
    case SEND_SECURE_PIN_TO_PHONE:
    console.log("SEND_SECURE_PIN_TO_PHONE",action.payload)    
      return {
        ...state,
        smartPinMtn: action.payload,
        sendSecurePinError: ""
      }
    case SEND_SECURE_PIN_TO_PHONE_FAIL:
      console.log("SEND_SECURE_PIN_TO_PHONE_FAIL", action)
      return {
        ...state,
        sendSecurePinError: action.payload
      }
    case CONFIRM_SECURE_PIN_CODE:
    console.log("CONFIRM_SECURE_PIN_CODE",action.payload)
      return {
        ...state,
        isSecurePinValidated: action.payload,
        confirmSecurePinError: ""
      }
    case CONFIRM_SECURE_PIN_CODE_FAIL:
    console.log("CONFIRM_SECURE_PIN_CODE_FAIL", action)
      return {
        ...state,
        confirmSecurePinError: action.payload
      }
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
    case SET_USER_FAIL:
      console.log("SET USER FAIL", action)
      return {
        ...state,
        userIdError: action.payload
      }
      // return setUserIdError(state, action)
    case SET_PIN_INFO:
      return  setPinSuccess(state,action);
      case SET_PIN_ERROR:
      return setPinError(state,action);
    case GET_QUES_INFO:
      return getQuestionSuccess(state,action); 
    case SET_QUES_INFO:
    console.log("set ques success",action.payload)
      return setQuestionSuccess(state, action)
    case SET_QUES_FAIL:
      return setQuestionFail(state, action)
      case GET_BAN_PWD_INFO:
      return getBannedListSuccess(state,action);   
    case SET_PASSWORD_INFO:
      return setPasswordSuccess(state,action);
      case SET_PASSWORD_FAIL:
      return setPasswordFail(state, action);
    default:
      return state
  }
}

export default securityReducer