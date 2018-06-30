import mockProfileAPI from '../api'
import axios from 'axios'
export const FETCH_CONTACT_AND_BILLING_BEGIN = 'contacts/FETCH_CONTACT_AND_BILLING_BEGIN'
export const FETCH_CONTACT_AND_BILLING_SUCCESS = 'contacts/FETCH_CONTACT_AND_BILLING_SUCCESS'
export const GET_USER_EMAIL_INFO = 'contactsAndBilling/GET_USER_EMAIL_INFO'

const customHeaders = {
 "Accept": "application/json",
 "Authorization": "'client_ip':10.191.198.160,'channel':'web'",
}

export const fetchContactAndBilling = () => dispatch => {
  dispatch(fetchContactAndBillingBegin())

  mockProfileAPI.fetchContactAndBilling(response => {
    dispatch(fetchContactAndBillingSuccess(response.data))
  })
}
export const fetchContactAndBillingBegin = () => ({
  type: FETCH_CONTACT_AND_BILLING_BEGIN,
})
export const fetchContactAndBillingSuccess = contacts => ({
  type: FETCH_CONTACT_AND_BILLING_SUCCESS,
  contacts,
})

export const getUserEmailInfo = () => dispatch => {
  console.log('Ajax call working');
  // axios.get("http://148.132.112.57:9089/gw/acct/secure/profile/securityInfo", {headers: {customHeaders}})
  //   .then((response) => {
  //     dispatch(fetchSecuritySuccess(response))
  //   })
  //    .catch((err) => {
  //       dispatch()
  //     })
}
