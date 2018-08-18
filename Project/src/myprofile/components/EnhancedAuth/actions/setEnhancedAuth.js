import axios from 'axios'
const FETCH_SET_ENHANCED_AUTH_SUCCESS = "SET ENHANCED"
const FETCH_SET_ENHANCED_AUTH_ERROR = "FETCH_SET_ENHANCED_AUTH_ERROR"
const VERIFY_EMAIL = 'VERIFY_EMAIL';

import  { getURL,encrypt, decrypt, BASE_URL, API_NAME } from "../../../../utils/config"

const SetAPIUrl = "";

// http://www.mocky.io/v2/5b61305c30000049006a4008

export const setEnhancedAuth = (flag, email, mdn, email_verify, mdn_capable, cust_id, acct_num, user_id, role) => dispatch => {

  var payload = JSON.stringify({
      "two_factor_flag": flag,
      "email": email,
      "mdn": mdn,
      "mdn_is_capable": mdn_capable,
      "email_is_verified": email_verify,
      "cust_id": cust_id,
      "user_id": user_id,
      "role": role,
      "acct_num": acct_num
  })

  axios.post(getURL('SET_ENHANCED_AUTH'), payload, {
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then((response) => {
      // response.data.statusCode = "00"
      // response.data.errorCode = "567"
      if(parseInt(response.data.statusCode) == 0){
      dispatch(setEnhancedAuthSuccess(response.data))
      }
      else {
        dispatch(setEnahancedError(response.data.errorCode))
      }
    })
    .catch((err) => {
      //dispatch(getUserIdError(err))
    })
  //dispatch(setEnhancedAuthSuccess());

}


export const setEnhancedAuthSuccess = enhancedAuth => ({
  type: FETCH_SET_ENHANCED_AUTH_SUCCESS,
  enhancedAuth,
})

export const setEnahancedError = payload => ({
  type: FETCH_SET_ENHANCED_AUTH_ERROR,
  payload,
})

export const verifyEmail = (flag, email, mdn, mdn_capable, cust_id, acct_num, user_id, role) => dispatch => {

  var payload = JSON.stringify({
    "two_factor_flag": flag,
    "email": email,
    "mdn": mdn,
    "mdn_is_capable": mdn_capable,
    "email_is_verified": "Y",
    "cust_id": cust_id,
    "user_id": user_id,
    "role": role,
    "acct_num": acct_num

  })

  axios.post("https://vzwqa2.verizonwireless.com/ui/acct/secure/data/ao/twoFactor/verifyEmail", payload, {
    headers: {
      'Content-Type': 'application/json',
    }
  })
    .then((response) => {
      dispatch(verifyEmailSuccess(response.data))
    })
    .catch((err) => {
      //dispatch(getUserIdError(err))
    })
  //dispatch(setEnhancedAuthSuccess());

}


export const verifyEmailSuccess = enhancedAuth => ({
  type: VERIFY_EMAIL,
  enhancedAuth,
})
