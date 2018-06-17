import mockProfileAPI from '../api'
import axios from 'axios'
export const FETCH_MANAGE_BEGIN = 'manage/FETCH_MANAGE_BEGIN'
export const FETCH_MANAGE_SUCCESS = 'manage/FETCH_MANAGE_SUCCESS'

const customHeaders = {
 "Accept": "application/json",
 "Authorization": "'client_ip':10.191.198.160,'channel':'web'",
}

export const fetchManage= () => dispatch => {
  dispatch(fetchManageBegin())

  mockProfileAPI.fetchManage(response => {
    dispatch(fetchManageSuccess(response.data))
  })
}
export const fetchManageBegin = () => ({
  type: FETCH_MANAGE_BEGIN,
})
export const fetchManageSuccess = secutiries => ({
  type: FETCH_MANAGE_SUCCESS,
  secutiries,
})

// export const getUserInfo = () => dispatch => {
//   console.log('Ajax call working');
//   // axios.get("http://148.132.112.57:9089/gw/acct/secure/profile/securityInfo", {headers: {customHeaders}})
//   //   .then((response) => {
//   //     dispatch(fetchSecuritySuccess(response))
//   //   })
//   //    .catch((err) => {
//   //       dispatch()
//   //     })
// }
