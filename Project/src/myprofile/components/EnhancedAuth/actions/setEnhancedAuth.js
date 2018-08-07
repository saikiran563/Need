import axios from 'axios'
const FETCH_SET_ENHANCED_AUTH_SUCCESS = "SET ENHANCED"
const VERIFY_EMAIL = 'VERIFY_EMAIL';

const SetAPIUrl = "";

// http://www.mocky.io/v2/5b61305c30000049006a4008

export const setEnhancedAuth = (flag, email, mdn) => dispatch => {

  axios.post("http://www.mocky.io/v2/5b63264b3000005100650358", {
    headers: {
      'Content-Type': 'application/json',
  },
    "twoFactorAuth":
    {
      twoFactorFlag: flag,
      EmailAdress: email,
      MobileNumber: mdn
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

  axios.post("http://www.mocky.io/v2/5b63264b3000005100650358", {
      EmailAdress: email,
      EmailVerified: "Y"
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
