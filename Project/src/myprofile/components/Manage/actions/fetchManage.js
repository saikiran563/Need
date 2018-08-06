import mockProfileAPI from '../api'
import axios from 'axios'
export const FETCH_MANAGE_BEGIN = 'manage/FETCH_MANAGE_BEGIN'
export const FETCH_MANAGE_SUCCESS = 'manage/FETCH_MANAGE_SUCCESS'

const ACCOUNT_HOLDER_URL = 'http://api.myjson.com/bins/10l0qy' // Fake API for now
const ACCOUNT_MEMBER_URL = 'https://api.myjson.com/bins/14iwuw' // also called as mobileSecure as role, Fake API for now
var GET_MANAGERS_URL = ACCOUNT_MEMBER_URL //defaults to account member if mdnRole is not defined

if(reactGlobals.mdnRole.toLocaleLowerCase() == "accountholder") {
  GET_MANAGERS_URL = ACCOUNT_HOLDER_URL
} else if(reactGlobals.mdnRole.toLocaleLowerCase() == "mobilesecure"){
  GET_MANAGERS_URL = ACCOUNT_MEMBER_URL
}

const customHeaders = {
 "Accept": "application/json"
 //"Authorization": "'client_ip':10.191.198.160,'channel':'web'",
}

export const fetchManage= () => dispatch => {
  dispatch(fetchManageBegin())
  axios.get(GET_MANAGERS_URL,{hearders: customHeaders})
  .then(response => {
    dispatch(fetchManageSuccess(response.data))
  })
 .catch((err) => {
    console.log("Fetch Manage Failed: ", err)
  })
}

export const fetchManageBegin = () => ({
  type: FETCH_MANAGE_BEGIN,
})

export const fetchManageSuccess = manage => ({
  type: FETCH_MANAGE_SUCCESS,
  manage,
})
