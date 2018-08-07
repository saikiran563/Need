import mockProfileAPI from '../api'
import axios from 'axios'

import {
    ADD_MANAGER_URL,
    REMOVE_MANAGER_URL,
    APPROVE_MANAGER_URL,
    DENY_MANAGER_URL
  } from '../api'

/*Get the data related to Manage Account Block */
export const FETCH_MANAGE_BEGIN = 'manage/FETCH_MANAGE_BEGIN'
export const FETCH_MANAGE_SUCCESS = 'manage/FETCH_MANAGE_SUCCESS'
/*Triggered when new manager is added by firstName, lastName and email or phone*/
export const ADD_NEW_MANAGER = 'ADD_NEW_MANAGER'
export const ADD_NEW_MANAGER_FAIL = 'ADD_NEW_MANAGER_FAIL'
/*Triggered when a active manager is removed*/
export const REMOVE_MANAGER = 'REMOVE_MANAGER'
export const REMOVE_MANAGER_FAIL = 'REMOVE_MANAGER_FAIL'
/*Triggered to put back the removed active manager */
export const UNDO_REMOVE_MANAGER = 'REMOVE_MANAGER'
export const UNDO_REMOVE_MANAGER_FAIL = 'REMOVE_MANAGER_FAIL'
/*Triggered when account holder approves a pending request to become account manager*/
export const APPROVE_MANAGER =  'APPROVE_MANAGER'
export const APPROVE_MANAGER_FAIL =  'APPROVE_MANAGER_FAIL'
/*Triggered when account holder denies a pending request to become account manager*/
export const DENY_MANAGER = 'DENY_MANAGER'
export const DENY_MANAGER_FAIL = 'DENY_MANAGER_FAIL'
/*Triggered when account holder unintentionally denies a request and undo the action to set back to pending state   */
export const UNDO_DENY_MANAGER = 'UNDO_REMOVE_MANAGER'
export const UNDO_DENY_MANAGER_FAIL = 'UNDO_DENY_MANAGER_FAIL'


const ACCOUNT_HOLDER_URL = 'http://api.myjson.com/bins/10l0qy' // Fake API for now
const ACCOUNT_MEMBER_URL = 'https://api.myjson.com/bins/14iwuw' // also called as mobileSecure as role, Fake API for now
var GET_MANAGERS_URL = ACCOUNT_MEMBER_URL //defaults to account member if mdnRole is not defined

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
