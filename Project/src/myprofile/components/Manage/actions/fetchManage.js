import mockProfileAPI from '../api'
import axios from 'axios'
export const FETCH_MANAGE_BEGIN = 'manage/FETCH_MANAGE_BEGIN'
export const FETCH_MANAGE_SUCCESS = 'manage/FETCH_MANAGE_SUCCESS'

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
