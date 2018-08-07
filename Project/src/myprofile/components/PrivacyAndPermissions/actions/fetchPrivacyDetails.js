import mockProfileAPI from '../api'
import axios from 'axios'
export const FETCH_PRIVACY_AND_PERMISSIONS_BEGIN = 'privacies/FETCH_PRIVACY_AND_PERMISSIONS_BEGIN'
export const FETCH_PRIVACY_AND_PERMISSIONS_SUCCESS = 'privacies/FETCH_PRIVACY_AND_PERMISSIONS_SUCCESS'

const customHeaders = {
 "Accept": "application/json",
}

export const fetchPrivacyAndPermissions = () => dispatch => {
  dispatch(fetchPrivacyAndPermissionsBegin())

  // mockProfileAPI.fetchPrivacyAndPermissions(response => {
  //   dispatch(fetchPrivacyAndPermissionsSuccess(response))
  // })

   axios.get("https://vzwqa3.verizonwireless.com/ui/acct/secure/data/secure/profile/privacyPermissions")
    .then((response) => {
    dispatch(fetchPrivacyAndPermissionsSuccess(response.data))
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