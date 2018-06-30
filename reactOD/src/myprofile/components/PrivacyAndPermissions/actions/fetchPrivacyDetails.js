import mockProfileAPI from '../api'
import axios from 'axios'
export const FETCH_PRIVACY_AND_PERMISSIONS_BEGIN = 'privacies/FETCH_PRIVACY_AND_PERMISSIONS_BEGIN'
export const FETCH_PRIVACY_AND_PERMISSIONS_SUCCESS = 'privacies/FETCH_PRIVACY_AND_PERMISSIONS_SUCCESS'
// export const GET_USER_EMAIL_INFO = 'contactsAndBilling/GET_USER_EMAIL_INFO'

const customHeaders = {
 "Accept": "application/json",
}

export const fetchPrivacyAndPermissions = () => dispatch => {
  dispatch(fetchPrivacyAndPermissionsBegin())

  // mockProfileAPI.fetchPrivacyAndPermissions(response => {
  //   dispatch(fetchPrivacyAndPermissionsSuccess(response.data))
  // })

   axios.get("http://www.mocky.io/v2/5b2fc4e63000007f000660c8")
    .then((response) => {
    dispatch(fetchPrivacyAndPermissionsSuccess(response.data.data))
    })
     .catch((err) => {
       dispatch()
      })
}
export const fetchPrivacyAndPermissionsBegin = () => ({
  type: FETCH_PRIVACY_AND_PERMISSIONS_BEGIN,
})
export const fetchPrivacyAndPermissionsSuccess = privacies => ({
  type: FETCH_PRIVACY_AND_PERMISSIONS_SUCCESS,
  privacies,
})


// export const getUserEmailInfo = () => dispatch => {
//   console.log('Ajax call working');
//   // axios.get("http://148.132.112.57:9089/gw/acct/secure/profile/securityInfo", {headers: {customHeaders}})
//   //   .then((response) => {
//   //     dispatch(fetchSecuritySuccess(response))
//   //   })
//   //    .catch((err) => {
//   //       dispatch()
//   //     })
// }
