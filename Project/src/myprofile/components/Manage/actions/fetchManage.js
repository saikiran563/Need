import mockProfileAPI from '../api'
import axios from 'axios'
export const FETCH_MANAGE_BEGIN = 'manage/FETCH_MANAGE_BEGIN'
export const FETCH_MANAGE_SUCCESS = 'manage/FETCH_MANAGE_SUCCESS'
export const FETCH_MANAGE_FAILED = 'FETCH_MANAGE_FAILED'

const MANAGE_URL = 'http://api.myjson.com/bins/10l0qy' // Fake API for now

const customHeaders = {
 "Accept": "application/json"
 //"Authorization": "'client_ip':10.191.198.160,'channel':'web'",
}

export const fetchManage= () => dispatch => {
  dispatch(fetchManageBegin())
  axios.get(MANAGE_URL,{hearders: customHeaders})
  .then(response => {
    dispatch(fetchManageSuccess(response.data))
  })
 .catch((err) => {
    dispatch(fetchManageFailed())
  })
}

export const fetchManageBegin = () => ({
  type: FETCH_MANAGE_BEGIN,
})

export const fetchManageSuccess = manage => ({
  type: FETCH_MANAGE_SUCCESS,
  manage,
})

export const fetchManageFailed= () => ({
  type: FETCH_MANAGE_FAILED
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
