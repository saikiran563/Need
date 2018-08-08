import mockProfileAPI from '../api'
import axios from 'axios'

import {
    ADD_MANAGER_URL,
    REMOVE_MANAGER_URL,
    APPROVE_MANAGER_URL,
    DENY_MANAGER_URL,
    GET_MANAGE_LANDING_URL,
    GET_MTNS_URL
  } from '../api'

  /*Get the data related to Manage Account Block */
export const FETCH_MANAGE_LANDING_BEGIN = 'FETCH_MANAGE_LANDING_BEGIN'
export const FETCH_MANAGE_LANDING_SUCCESS = 'FETCH_MANAGE_LANDING_SUCCESS'
export const FETCH_MANAGE_LANDING_FAIL = 'FETCH_MANAGE_LANDING_FAIL'

/*Get the list of mobile numbers on Manage*/
export const FETCH_MTNS_BEGIN = 'FETCH_MTNS_BEGIN'
export const FETCH_MTNS_SUCCESS = 'FETCH_MTNS_SUCCESS'
export const FETCH_MTNS_FAIL = 'FETCH_MTNS_FAIL'

/*Get the data related to Manage Account Block */
export const FETCH_ACCOUNT_MANAGE_BEGIN = 'FETCH_ACCOUNT_MANAGE_BEGIN'
export const FETCH_ACCOUNT_MANAGE_SUCCESS = 'FETCH_ACCOUNT_MANAGE_SUCCESS'
export const FETCH_ACCOUNT_MANAGE_FAIL = 'FETCH_ACCOUNT_MANAGE_FAIL'
/*Triggered when new manager is added by firstName, lastName and email or phone*/
export const ADD_NEW_MANAGER_FAIL_BEGIN = 'ADD_NEW_MANAGER_FAIL_BEGIN'
export const ADD_NEW_MANAGER_SUCCESS = 'ADD_NEW_MANAGER_SUCCESS'
export const ADD_NEW_MANAGER_FAIL = 'ADD_NEW_MANAGER_FAIL'
/*Triggered when a active manager is removed*/
export const REMOVE_MANAGER_BEGIN = 'REMOVE_MANAGER_BEGIN'
export const REMOVE_MANAGER_SUCCESS = 'REMOVE_MANAGER_SUCCESS'
export const REMOVE_MANAGER_FAIL = 'REMOVE_MANAGER_FAIL'
/*Triggered to put back the removed active manager */
export const UNDO_REMOVE_MANAGER_BEGIN= 'REMOVE_MANAGER_BEGIN'
export const UNDO_REMOVE_MANAGER_SUCCESS = 'REMOVE_MANAGER_SUCCESS'
export const UNDO_REMOVE_MANAGER_FAIL = 'REMOVE_MANAGER_FAIL'
/*Triggered when account holder approves a pending request to become account manager*/
export const APPROVE_MANAGER_BEGIN=  'APPROVE_MANAGER_BEGIN'
export const APPROVE_MANAGER_SUCCESS =  'APPROVE_MANAGER_SUCCESS'
export const APPROVE_MANAGER_FAIL =  'APPROVE_MANAGER_FAIL'
/*Triggered when account holder denies a pending request to become account manager*/
export const DENY_MANAGER_BEGIN = 'DENY_MANAGER_BEGIN'
export const DENY_MANAGER_SUCCESS = 'DENY_MANAGER_SUCCESS'
export const DENY_MANAGER_FAIL = 'DENY_MANAGER_FAIL'
/*Triggered when account holder unintentionally denies a request and undo the action to set back to pending state */
export const UNDO_DENY_MANAGER_BEGIN= 'UNDO_REMOVE_MANAGER_BEGIN'
export const UNDO_DENY_MANAGER_SUCCESS = 'UNDO_REMOVE_MANAGER_SUCCESS'
export const UNDO_DENY_MANAGER_FAIL = 'UNDO_DENY_MANAGER_FAIL'


const ACCOUNT_HOLDER_URL = 'http://api.myjson.com/bins/10l0qy' // Fake API for now
const ACCOUNT_MEMBER_URL = 'https://api.myjson.com/bins/14iwuw' // also called as mobileSecure as role, Fake API for now
var GET_MANAGERS_URL = ACCOUNT_MEMBER_URL //defaults to account member if mdnRole is not defined

const customHeaders = {
 "Accept": "application/json"
 //"Authorization": "'client_ip':10.191.198.160,'channel':'web'",
}

//Landing Page when clicked on Manage Account on Leftnav
export const fetchLandingManageData = () => dispatch => {
  dispatch(fetchLandingManageDataBegin())
  axios.get(GET_MANAGE_LANDING_URL,{hearders: customHeaders})
  .then(response => {
    dispatch(fetchLandingManageDataSuccess(response.data))
  })
 .catch((error) => {
    dispatch(fetchLandingManageDataFailed(error))
  })
}

const fetchLandingManageDataBegin = () => ({
   type: FETCH_MANAGE_LANDING_BEGIN,
})

const fetchLandingManageDataSuccess = response => ({
   type: FETCH_MANAGE_LANDING_SUCCESS,
   response
})

const fetchLandingManageDataFailed = error => ({
  type: FETCH_MANAGE_LANDING_FAIL,
  error
})

// Fetch to get list of MTNS
export const fetchMtns = () => dispatch => {
  dispatch(fetchMtnsBegin())
  axios.get(GET_MTNS_URL,{hearders: customHeaders})
  .then(response => {
    dispatch(fetchMtnsSuccess(response.data))
  })
 .catch((error) => {
    dispatch(fetchMtnsFailed(error))
  })
}

const fetchMtnsBegin = () => ({
   type: FETCH_MTNS_BEGIN,
})

const fetchMtnsSuccess = response => ({
   type: FETCH_MTNS_SUCCESS,
   response
})

const fetchMtnsFailed = error => ({
  type: FETCH_MTNS_FAIL,
  error
})
