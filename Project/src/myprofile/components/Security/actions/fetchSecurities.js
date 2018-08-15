import mockProfileAPI from '../api'
import axios from 'axios'
import  { getURL,encrypt, decrypt, BASE_URL, API_NAME } from "../../../../utils/config"
export const FETCH_SECURITY_BEGIN = 'security/FETCH_SECURITY_BEGIN'
export const FETCH_SECURITY_SUCCESS = 'security/FETCH_SECURITY_SUCCESS'
export const GET_META_INFO = 'security/GET_META_INFO'
export const GET_META_FAIL = 'security/GET_META_FAIL'
export const SET_USER_INFO = 'security/SET_USER_INFO'
export const SET_USER_FAIL = 'security/SET_USER_FAIL'
export const FETCH_SECURITY_ERROR ='security/FETCH_SECURITY_ERROR'
export const SET_PIN_INFO ='security/UPDATE_PIN_INFO'
export const SET_PIN_ERROR ='security/UPDATE_PIN_ERROR'
export const SET_QUES_INFO = 'security/SET_QUES_INFO'
export const SET_QUES_FAIL = 'security/SET_QUES_FAIL'
export const GET_QUES_INFO = 'security/GET_QUES_INFO'
export const GET_QUES_FAIL = 'security/GET_QUES_FAIL'
export const GET_BAN_PWD_INFO = 'security/GET_BAN_PWD_INFO'
export const GET_BAN_PWD_FAIL = 'security/GET_BAN_PWD_FAIL'
export const SET_PASSWORD_INFO = 'security/SET_PASSWORD_INFO'
export const SET_PASSWORD_FAIL = 'security/SET_PASSWORD_FAIL'

export const GET_SECRET_PIN_STATUS = "GET_SECRET_PIN_STATUS"
export const GET_LIST_OF_USER_NUMBERS = "GET_LIST_OF_USER_NUMBERS"
export const SEND_SECURE_PIN_TO_PHONE = "SEND_SECURE_PIN_TO_PHONE"
export const CONFIRM_SECURE_PIN_CODE = 'CONFIRM_SECURE_PIN_CODE'

export const getSecretPinStatus = () => async dispatch => {
  // secure/data/service/verifySecurePinStatus
  // http://www.mocky.io/v2/5b69d346320000251baf5e4a --- verified: false / enabled: false
  // http://www.mocky.io/v2/5b69dc62320000cd1aaf5e64 --- verified: false / enabled: true
  // http://www.mocky.io/v2/5b6b0d303200003a2f373298 --- verified: true / enabled: true

  const response = await axios.get(BASE_URL + API_NAME[GET_SECRET_PIN_STATUS])
  // const response = await axios.get("http://www.mocky.io/v2/5b69dc62320000cd1aaf5e64")
  // response.data.statusCode = "0";
  console.log("secure pin - get secret pin status - action creator", response)
  if(parseInt(response.data.statusCode) == 0){
    dispatch({
      type: GET_SECRET_PIN_STATUS,
      payload: response.data.data
    })
  } else {
    dispatch({
      type: GET_SECRET_PIN_STATUS,
      payload: response.data.statusCode
    })
  }
}

export const getListOfUserNumbers = () => async dispatch => {
  const response = await axios.get(BASE_URL + API_NAME[GET_LIST_OF_USER_NUMBERS])
  console.log("secure pin - get user numbers - action creator", response)
  // const response = await axios.get("http://www.mocky.io/v2/5b69e4b83200003715af5e96")
  // response.data.statusCode = "0";
  // response.data.deviceList = response.data.data.deviceList
  if(parseInt(response.data.statusCode) == 0){
    dispatch({
      type: GET_LIST_OF_USER_NUMBERS,
      payload: response.data.data.deviceList
    })
  } else {
    dispatch({
      type: GET_LIST_OF_USER_NUMBERS,
      payload: response.data.statusCode
    })
  }
}

export const sendSecurePinToPhone = (mtn, acctNum) => async dispatch => {
  const response = await axios.post(BASE_URL + API_NAME[SEND_SECURE_PIN_TO_PHONE], {mtn, acctNum}, {
    headers: {
        'Content-Type': 'application/json',
    }
})
console.log("secure pin - send secure pin to phone - action creator", response)
  // const response = await axios.post("http://www.mocky.io/v2/5b69e4b83200003715af5e96", {mtn, acctNum})
  // response.data.statusCode = "0"
  // response.data.smartPinMtn = "123456"
  if(parseInt(response.data.statusCode) == 0){
    dispatch({
      type: SEND_SECURE_PIN_TO_PHONE,
      payload: response.data.data.smartPinMtn
    })
  } else {
    dispatch({
      type: SEND_SECURE_PIN_TO_PHONE,
      payload: response.data.statusCode
    })
  }
}

export const confirmSecurePinCode = (mtn, acctNum, securePin) => async dispatch => {
  const response = await axios.post(BASE_URL + API_NAME[CONFIRM_SECURE_PIN_CODE], {mtn, acctNum, securePin}, {
    headers: {
        'Content-Type': 'application/json',
    }
})
console.log("secure pin - confirm secure pin - action creator", response)
  // const response = await axios.post("http://www.mocky.io/v2/5b69e4b83200003715af5e96", {mtn, acctNum, securePin})
  // response.data.statusCode = "0"
  // response.data.isSecurePinValidated = true
  if(parseInt(response.data.statusCode) == 0){
    dispatch({
      type: CONFIRM_SECURE_PIN_CODE,
      payload: response.data.data.isSecurePinValidated
    })
  } else {
    dispatch({
      type: CONFIRM_SECURE_PIN_CODE,
      payload: response.data.statusCode
    })
  }
}

export const fetchSecurity = () => dispatch => {
  dispatch(fetchSecurityBegin())

  mockProfileAPI.fetchSecurity(response => {
    dispatch(fetchSecuritySuccess(response.data))
  })
}
export const fetchSecurityBegin = () => ({
  type: FETCH_SECURITY_BEGIN,
})
export const fetchSecuritySuccess = securities => ({
  type: FETCH_SECURITY_SUCCESS,
  securities,
})
export const fetchSecurityError = error => ({
  type: FETCH_SECURITY_ERROR,
  error,
})
export const getUserIdSuccess = response => ({
   type: GET_USER_INFO,
   response
})
export const getUserIdError = error => ({
   type: GET_USER_FAIL,
   error
})

export const getMetaDataSuccess = response => ({
   type: GET_META_INFO,
   response
})
export const getMetaDataError = error => ({
   type: GET_META_FAIL,
   error
})

export const setUserIdSuccess = response => ({
   type: SET_USER_INFO,
   response
})

export const setUserIdError = error => ({
   type: SET_USER_FAIL,
   error
})
export const setPinSuccess = response => ({
   type: SET_PIN_INFO,
   response
})
export const setPinError = error => ({
   type: SET_PIN_ERROR,
   error
})

export const getBannedListSuccess = response => ({
   type: GET_BAN_PWD_INFO,
   response
})
export const getBannedListError = error => ({
   type: GET_BAN_PWD_FAIL,
   error
})
export const getQuestionSuccess = response => ({
   type: GET_QUES_INFO,
   response
})
export const getQuestionError = error => ({
   type: GET_QUES_FAIL,
   error
})

export const setQuestionSuccess = response => ({
   type: SET_QUES_INFO,
   response
})
export const setQuestionError = error => ({
   type: SET_QUES_FAIL,
   error
})

export const setPasswordSuccess = response => ({
  type: SET_PASSWORD_INFO,
  response
})

export const setPasswordFail = error => ({
  type: SET_PASSWORD_FAIL,
  error
})

export const getMetaData = () => dispatch => {
  axios.get(getURL("GET_META_INFO"))
    .then((response) => {
    dispatch(getMetaDataSuccess(response.data))
    })
     .catch((err) => {
        dispatch(getMetaDataError(err))
      })
}

export const getQuestionInfo = () => dispatch => {
  
// http://www.mocky.io/v2/5b6c52582f0000a918893cef
// getURL("GET_QUES_INFO")

  axios.get(getURL("GET_QUES_INFO"))
  .then(
    (response) => {
      // response.data.questions = response.data.data.questions
      dispatch(getQuestionSuccess(response.data.questions));
    },
    (error) => {
      console.log('Questions APi failed ')
    }
  )
}

export const getBannedPwdList = () => dispatch => {
  

  axios.get(getURL("GET_BAN_PWD_INFO"))
  .then(
    (response) => {
      var list = response.data;
      list.containsList = list.containsList ? decrypt(list.containsList).split("|"): [];
      list.exactList =  list.exactList ? decrypt(list.exactList).split("|"):[];
      dispatch(getBannedListSuccess(list));
    },
    (error) => {
      console.log('Banned list  APi failed ')
    }
  )
}

export const setUserId = (id) => dispatch => {
  console.log("SET USER CALLED")
    // API CAll WILL BE CALLED HERE
    const payload = JSON.stringify({"newUserName": id})     

   var resp = axios.post(getURL("SET_USER_INFO"),payload,{
        headers: {
            'Content-Type': 'application/json',
        }
    })
     resp.then((response) => {
       // console.log('set user id working');
        // console.log(response);
        response.data.userId = id;
        dispatch(setUserIdSuccess(response.data))
      })
      .catch((err) => {
        dispatch(setUserIdError(err))
      })
}

export const setQuestionInfo = (question) => dispatch => {
 // API CAll WILL BE CALLED HERE
    var payload = JSON.stringify(question)
   var resp = axios.post(getURL("SET_QUES_INFO"),payload,{
        headers: {
            'Content-Type': 'application/json',
        }
    });
      resp.then((response) => {
        dispatch(setQuestionSuccess(response.data))
      })
      .catch((err) => {
        dispatch(setPinError(err))
      })
}
export const setPin = (pin) => dispatch => {
    // API CAll WILL BE CALLED HERE
   var payload = JSON.stringify(pin);
   var resp = axios.post(getURL("SET_PIN_INFO"),payload,{
        headers: {
            'Content-Type': 'application/json',
        }
    })
      resp.then((response) => {
        dispatch(setPinSuccess(response.data))
      })
      .catch((err) => {
        dispatch(setPinError(err))
      })
}


export const setPassword = (passwordObject) => dispatch => {
   var payload = JSON.stringify(passwordObject)     
   var resp = axios.post(getURL("SET_PASSWORD_INFO"),payload,{
        headers: {
            'Content-Type': 'application/json',
        }
    })
     resp.then((response) => {     
      //  response.data.statusCode = "0"
        dispatch(setPasswordSuccess(response.data))
        // dispatch(setPasswordSuccess(response.config))
      })
      .catch((err) => {
        dispatch(setUserIdError(err))
      })
}