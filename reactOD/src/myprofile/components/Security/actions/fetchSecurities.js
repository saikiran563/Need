import mockProfileAPI from '../api'
import axios from 'axios'
export const FETCH_SECURITY_BEGIN = 'security/FETCH_SECURITY_BEGIN'
export const FETCH_SECURITY_SUCCESS = 'security/FETCH_SECURITY_SUCCESS'
export const GET_USER_INFO = 'security/GET_USER_INFO'
export const GET_USER_FAIL = 'security/GET_USER_FAIL'
export const FETCH_SECURITY_ERROR ='security/FETCH_SECURITY_ERROR'

const customHeaders = {
 "Accept": "application/json",
 "Authorization": "GYz2VVL++Kj5yjfGe80mazK3IH3vxU5sv8oeH/B0nVdc673VaWgzAb/BQQZyNCFaOQ+HuRzw5nxsA8ugHxFNkajuABEP+fMKkY6i+Im4DeXhtrjOe1bkaqoCPKbwkB2vZ4UoHchyzYoswIw6oCJ5g8kjqHkjcVU438chq6Gk1Tu9R+rq99jEPvl7TqROVwg1p7KWs/r7Fybc90BOD+5xDSOWYMPhiHSf0+ire9C5ZOePbLWx1bWePpZkSAfCkW2pdgEN/dy9ISF8kR2ke5NsJ84OHVzBQzC0KVjs5Dt9FLwuq7Wy5pglz60VLhlzkz5kwLCnN1UuSXHl8ckhPU8O0Q==",
"DoughCookie":"kjkjk",
"ClientHeaders":{"client_ip": "10.191.198.160","channel":"web","accountNumber":"0200794840-00001","mdn":"7852092886","role":"accountholder","correlation_id":"52105127-0c02-4b83-97d7-2dda0e1f7605"},
"Context":{"client_ip":"10.191.198.160","channel":"web","accountNumber":"0200794840-00001","mdn":"7852092886","role":"accountholder","correlation_id":"52105127-0c02-4b83-97d7-2dda0e1f7605"},
"AM_MOBILE_NUMBER":"8968762345",
"AM_ROLE":"accountHolder",
"AM_UUID":"uuidkj",

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

export const setUserId = (id) => dispatch => {
    // API CAll WILL BE CALLED HERE
    var payload = {"userID": id};
    axios.post("https://jsonplaceholder.typicode.com/posts/1",{data: payload})
      .then((response) => {
        dispatch(setUserIdSuccess(response))
      })
      .catch((err) => {
        dispatch(setUserIdError(err))
      })
}
export const getUserInfo = () => dispatch => {
  console.log('Ajax call working');
  axios.get("https://jsonplaceholder.typicode.com/posts/1", {headers: {customHeaders}})
    .then((response) => {
    console.log(response.data);
    dispatch(getUserIdSuccess(response.data))
    
    })
     .catch((err) => {
        dispatch(getUserIdError(err))
      })
}