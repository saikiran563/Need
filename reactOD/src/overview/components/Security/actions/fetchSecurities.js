import mockProfileAPI from '../api'
import axios from 'axios'
export const FETCH_SECURITY_BEGIN = 'security/FETCH_SECURITY_BEGIN'
export const FETCH_SECURITY_SUCCESS = 'security/FETCH_SECURITY_SUCCESS'
export const GET_USER_INFO = 'security/GET_USER_INFO'

const customHeaders = {
 "Accept": "application/json",
 "Authorization": "'client_ip':10.191.198.160,'channel':'web'",
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

export const getUserInfo = () => dispatch => {
  console.log('Ajax call working');
  // axios.get("http://148.132.112.57:9089/gw/acct/secure/profile/securityInfo", {headers: {customHeaders}})
  //   .then((response) => {
  //     dispatch(fetchSecuritySuccess(response))
  //   })
  //    .catch((err) => {
  //       dispatch()
  //     })
}