import axios from 'axios'
const FETCH_SET_ENHANCED_AUTH_SUCCESS = "SET ENHANCED"
const VERIFY_EMAIL = 'VERIFY_EMAIL';

const SetAPIUrl = "";

// http://www.mocky.io/v2/5b61305c30000049006a4008

export const setEnhancedAuth = (flag, email, mdn, email_verify, mdn_capable, cust_id, acct_num, user_id, role) => dispatch => {

  var payload = JSON.stringify({
      "two_factor_flag": flag,
      "email": email,
      "mdn": mdn,
      "mdn_is_capable": email_verify,
      "email_is_verified": mdn_capable,
      "cust_id": cust_id,
      "user_id": user_id,
      "role": role,
      "acct_num": acct_num
  })

  axios.post("https://vzwqa2.verizonwireless.com/ui/acct/secure/data/ao/profile/updateTwoFactorAuth", payload, {
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then((response) => {
      dispatch(setEnhancedAuthSuccess(response.data))
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

export const verifyEmail = (email) => dispatch => {

  var payload = JSON.stringify({
   "emailaddress": email,
   "email_is_verified": "1"
  })

  axios.post("http://localhost:3000/enhancedauth", payload, {
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
