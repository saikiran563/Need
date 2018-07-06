import mockProfileAPI from '../api'
import axios from 'axios'
import  { getURL } from "../util"
export const FETCH_SECURITY_BEGIN = 'security/FETCH_SECURITY_BEGIN'
export const FETCH_SECURITY_SUCCESS = 'security/FETCH_SECURITY_SUCCESS'
export const GET_USER_INFO = 'security/GET_USER_INFO'
export const GET_USER_FAIL = 'security/GET_USER_FAIL'
export const SET_USER_INFO = 'security/GET_USER_INFO'
export const SET_USER_FAIL = 'security/GET_USER_FAIL'
export const FETCH_SECURITY_ERROR ='security/FETCH_SECURITY_ERROR'
export const SET_PIN_INFO ='security/UPDATE_PIN_INFO'
export const SET_PIN_ERROR ='security/UPDATE_PIN_ERROR'

const customHeaders = {
  
"Content-Type": "application/json",
"DoughCookie": "kjkjk",

"Authorization": "GYz2VVL++Kj5yjfGe80mazK3IH3vxU5sv8oeH/B0nVdc673VaWgzAb/BQQZyNCFaOQ+HuRzw5nxsA8ugHxFNkajuABEP+fMKkY6i+Im4DeXhtrjOe1bkaqoCPKbwkB2vZ4UoHchyzYoswIw6oCJ5g8kjqHkjcVU438chq6Gk1Tu9R+rq99jEPvl7TqROVwg1p7KWs/r7Fybc90BOD+5xDSOWYMPhiHSf0+ire9C5ZOePbLWx1bWePpZkSAfCkW2pdgEN/dy9ISF8kR2ke5NsJ84OHVzBQzC0KVjs5Dt9FLwuq7Wy5pglz60VLhlzkz5kwLCnN1UuSXHl8ckhPU8O0Q==",

"AuthToken": "GYz2VVL++Kj5yjfGe80mazK3IH3vxU5sv8oeH/B0nVdc673VaWgzAb/BQQZyNCFaOQ+HuRzw5nxsA8ugHxFNkajuABEP+fMKkY6i+Im4DeXhtrjOe1bkaqoCPKbwkB2vZ4UoHchyzYoswIw6oCJ5g8kjqHkjcVU438chq6Gk1Tu9R+rq99jEPvl7TqROVwg1p7KWs/r7Fybc90BOD+5xDSOWYMPhiHSf0+ire9C5ZOePbLWx1bWePpZkSAfCkW2pdgEN/dy9ISF8kR2ke5NsJ84OHVzBQzC0KVjs5Dt9FLwuq7Wy5pglz60VLhlzkz5kwLCnN1UuSXHl8ckhPU8O0Q==",

"ClientHeaders": {
	"client_ip": "10.191.198.160",
	"channel": "web",
	"accountNumber": "260741824-00001",
	"mdn": "8058442304",
	"role": "accountholder",
	"correlation_id": "52105127-0c02-4b83-97d7-2dda0e1f7605"
},

"Context": {
	"mCookieMap": {
		"dough": "kjkjk"
	},
	"loginContext": {
		"amAccountNumber": "260741824-00001",
		"amAH": "null",
		"amAHMTN": "null",
		"amBillerId": "null",
		"amCSRPassword": "null",
		"amCSRRole": "accountholder",
		"amCSRUserName": "test123",
		"amECPDId": "null",
		"amEmailAddress": "null",
		"amFederated": "null",
		"amFedId": "null",
		"amLastLogin": "null",
		"amLoginId": "TestUser",
		"amMobileNumber": "8058442304",
		"amMobileNumbersList": "{8058442304}",
		"amName": "Kimi",
		"amGreetingName": "null",
		"amOneVerizon": "null",
		"amProdName": "null",
		"amRole": "accountholder",
		"amServices": "null",
		"amSiteKeyRegistered": "null",
		"amSms": "null",
		"amUUID": "uuidkj",
		"amVzReward": "null",
		"smartRewardsEligible": "false",
		"companyNameFromIS": "null",
		"ECPDIdFromIS": "null",
		"CSR": "false",
		"federated": "false",
		"globalID": "",
		"homePhoneService": "false",
		"internetService": "false",
		"oneVerizon": "false",
		"registeredAH": "false",
		"site": "null",
		"requestedSessionId": "0000ZTfHTvsqau9wXWhi",
		"mfProfileLoggedIn": "true",
		"billingSystemLocation": "N",
		"siteKey": "false",
		"tvService": "false",
		"requestURI": "/gw/feeds",
		"clientIp": "10.69.84.55",
		"userAgent": "Mozilla/5.0",
		"newSession": "bw8YRva-3UDNKhKs-uFMHH9",
		"selMtn": "8058442304"
	},
	"localSessionTimedOut": "false",
	"visionErrorCode": "null",
	"visionErrorMsg": "null",
	"visionCicsErrorCode": "null",
	"securityBreachForAjax": "false",
	"securityBreach": "false",
	"isVisionServiceError": "false",
	"hasSQLException": "false",
	"sqlErrorMsg": "null",
	"sqlErrorCode": "null",
	"coherenceRefresh": "false"
},
"AM_MOBILE_NUMBER": "8968762345" , 
"AM_ROLE": "accountHolder",
"AM_UUID": "uuidkj"

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
export const fetchSecuritySuccess = secutiries => ({
  type: FETCH_SECURITY_SUCCESS,
  secutiries,
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
   type: SET_PIN_FAIL,
   error
})
export const setUserId = (id) => dispatch => {
    // API CAll WILL BE CALLED HERE
    var payload = {"newUserName": id};
    axios.post(getURL("SET_USER_INFO"),{data: payload})
      .then((response) => {
        dispatch(setUserIdSuccess(response))
      })
      .catch((err) => {
        dispatch(setUserIdError(err))
      })
}
export const getUserInfo = () => dispatch => {
  console.log('Ajax call working');
  console.log(getURL("GET_USER_INFO"));
  axios.get(getURL("GET_USER_INFO"), {headers: {customHeaders}})
    .then((response) => {
    console.log(response.data);
    dispatch(getUserIdSuccess(response.data))
    
    })
     .catch((err) => {
        dispatch(getUserIdError(err))
      })
}
export const setPin = (pinObj) => dispatch => {
    // API CAll WILL BE CALLED HERE
    var payload = {
                   "enteredPin": pinObj.enteredPin,
                   "reEnteredPin":enteredPin.reEnteredPin
                  };
    axios.post(getURL("SET_PIN_INFO"),{data: payload})
      .then((response) => {
        dispatch(setPinSuccess(response))
      })
      .catch((err) => {
        dispatch(setPinError(err))
      })
}