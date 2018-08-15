import mockProfileAPI from '../api'
import axios from 'axios'

import {
    ADD_MANAGER_URL,
    REMOVE_MANAGER_URL,
    APPROVE_MANAGER_URL,
    DENY_MANAGER_URL,
    GET_MANAGE_LANDING_URL,
    GET_MTNS_URL,
    GET_MANAGER_REQUESTS_URL,
    SEND_ACCOUNT_MANGER_REQUEST_URL,
    POST_GREETING_NAME_URL,
    GET_ACCOUNT_MEMBER_DETAILS_URL
  } from '../api'

  /*Get the data related to Manage Account Block */
export const FETCH_MANAGE_LANDING_BEGIN = 'FETCH_MANAGE_LANDING_BEGIN'
export const FETCH_MANAGE_LANDING_SUCCESS = 'FETCH_MANAGE_LANDING_SUCCESS'
export const FETCH_MANAGE_LANDING_FAIL = 'FETCH_MANAGE_LANDING_FAIL'

/*Get the list of mobile numbers on Manage*/
export const FETCH_MTNS_BEGIN = 'FETCH_MTNS_BEGIN'
export const FETCH_MTNS_SUCCESS = 'FETCH_MTNS_SUCCESS'
export const FETCH_MTNS_FAIL = 'FETCH_MTNS_FAIL'

/*Get the list of mobile numbers on Manage*/
export const FETCH_MANAGER_REQUESTS_BEGIN = 'FETCH_MANAGER_REQUESTS_BEGIN'
export const FETCH_MANAGER_REQUESTS_SUCCESS = 'FETCH_MANAGER_REQUESTS_SUCCESS'
export const FETCH_MANAGER_REQUESTS_FAIL = 'FETCH_MANAGER_REQUESTS_FAIL'

/*Get the data related to Manage Account Block */
export const FETCH_ACCOUNT_MANAGE_BEGIN = 'FETCH_ACCOUNT_MANAGE_BEGIN'
export const FETCH_ACCOUNT_MANAGE_SUCCESS = 'FETCH_ACCOUNT_MANAGE_SUCCESS'
export const FETCH_ACCOUNT_MANAGE_FAIL = 'FETCH_ACCOUNT_MANAGE_FAIL'

/*Triggered when new manager is added by firstName, lastName and email or phone*/
export const ADD_NEW_MANAGER_BEGIN = 'ADD_NEW_MANAGER_BEGIN'
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

/*Triggered when account holder unintentionally denies a request and undo the action to set back to pending state */
export const SEND_ACCOUNT_MANGER_REQUEST_BEGIN= 'SEND_ACCOUNT_MANGER_REQUEST_BEGIN'
export const SEND_ACCOUNT_MANGER_REQUEST_SUCCESS = 'SEND_ACCOUNT_MANGER_REQUEST_SUCCESS'
export const SEND_ACCOUNT_MANGER_REQUEST_FAIL = 'SEND_ACCOUNT_MANGER_REQUEST_FAIL'

/*Get account member details to send request to account holder */
export const GET_ACCOUNT_MEMBER_DETAILS_BEGIN= 'GET_ACCOUNT_MEMBER_DETAILS_BEGIN'
export const GET_ACCOUNT_MEMBER_DETAILS_SUCCESS = 'GET_ACCOUNT_MEMBER_DETAILS_SUCCESS'
export const GET_ACCOUNT_MEMBER_DETAILS_FAIL = 'GET_ACCOUNT_MEMBER_DETAILS_FAIL'

const customHeaders = {
 "Accept": "application/json"
 //"Authorization": "'client_ip':10.191.198.160,'channel':'web'",
}

//Landing Page when clicked on Manage Account on Leftnav
export const fetchLandingManageData = () => dispatch => {
  dispatch(fetchLandingManageDataBegin())
  axios.get(GET_MANAGE_LANDING_URL,{headers: customHeaders})
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


// Fetch Manager Requests
export const fetchManagerRequests = () => dispatch => {
  dispatch(fetchManagerRequestsBegin())
  axios.get(GET_MANAGER_REQUESTS_URL,{hearders: customHeaders})
  .then(response => {
    dispatch(fetchManagerRequestsSuccess(response.data))
  })
 .catch((error) => {
    dispatch(fetchManagerRequestsMtnsFailed(error))
  })
}

const fetchManagerRequestsBegin = () => ({
   type: FETCH_MANAGER_REQUESTS_BEGIN,
})

const fetchManagerRequestsSuccess = response => ({
   type: FETCH_MANAGER_REQUESTS_SUCCESS,
   response
})

const fetchManagerRequestsMtnsFailed = error => ({
  type: FETCH_MANAGER_REQUESTS_FAIL,
  error
})

// Add account Manager by Account Holder directly
export const postAddManagerByAccountHolder = (payload) => dispatch => {
  console.log("Add account manager request body", payload)
  dispatch(postAddManagerByAccountHolderBegin())
  // ADD_MANAGER_URL
  // "http://www.mocky.io/v2/5b732d733200005c083a7ff2"
  axios.post(ADD_MANAGER_URL,payload)
  .then(response => {
    response.data.data = payload
    console.log("Add account manager POST response", response)
    dispatch(postAddManagerByAccountHolderSuccess(response.data))
  })
 .catch((error) => {
    dispatch(postAddManagerByAccountHolderFailed(error))
  })
}

const postAddManagerByAccountHolderBegin = () => ({
   type: ADD_NEW_MANAGER_BEGIN,
})

const postAddManagerByAccountHolderSuccess = response => ({
   type: ADD_NEW_MANAGER_SUCCESS,
   response
})

const postAddManagerByAccountHolderFailed = error => ({
  type: ADD_NEW_MANAGER_FAIL,
  error
})


// Remove account Manager by Account Holder
export const postRemoveManagerByAccountHolder = (payload) => dispatch => {
  dispatch(postRemoveManagerByAccountHolderBegin())
  axios.post(REMOVE_MANAGER_URL,payload)
  .then(response => {
    dispatch(postRemoveManagerByAccountHolderSuccess(response.data))
  })
 .catch((error) => {
    dispatch(postRemoveManagerByAccountHolderFailed(error))
  })
}

const postRemoveManagerByAccountHolderBegin = () => ({
   type: REMOVE_MANAGER_BEGIN,
})

const postRemoveManagerByAccountHolderSuccess = response => ({
   type: REMOVE_MANAGER_SUCCESS,
   response
})

const postRemoveManagerByAccountHolderFailed = error => ({
  type: REMOVE_MANAGER_FAIL,
  error
})

/* Approve Request of account Manager by Account Holder */
export const postApproveManagerByAccountHolder = (payload) => dispatch => {
  dispatch(postApproveManagerByAccountHolderBegin())
  axios.post(APPROVE_MANAGER_URL,payload)
  .then(response => {
    dispatch(postApproveManagerByAccountHolderSuccess(response.data))
  })
 .catch((error) => {
    dispatch(postApproveManagerByAccountHolderFailed(error))
  })
}

const postApproveManagerByAccountHolderBegin = () => ({
   type: APPROVE_MANAGER_BEGIN,
})

const postApproveManagerByAccountHolderSuccess = response => ({
   type: APPROVE_MANAGER_SUCCESS,
   response
})

const postApproveManagerByAccountHolderFailed = error => ({
  type: APPROVE_MANAGER_FAIL,
  error
})

/* Deny Request of account Manager by Account Holder */
export const postDenyManagerByAccountHolder = (payload) => dispatch => {
  dispatch(postDenyManagerByAccountHolderBegin())
  axios.post(APPROVE_MANAGER_URL,payload)
  .then(response => {
    dispatch(postDenyManagerByAccountHolderSuccess(response.data))
  })
 .catch((error) => {
    dispatch(postDenyManagerByAccountHolderFailed(error))
  })
}

const postDenyManagerByAccountHolderBegin = () => ({
   type: DENY_MANAGER_BEGIN,
})

const postDenyManagerByAccountHolderSuccess = response => ({
   type: DENY_MANAGER_SUCCESS,
   response
})

const postDenyManagerByAccountHolderFailed = error => ({
  type: DENY_MANAGER_FAIL,
  error
})

/* Send Request to Account holder to become account manager*/
export const postSendRequestForAccountManager = (payload) => dispatch => {
  dispatch(postSendRequestForAccountManagerBegin())
  axios.post(SEND_ACCOUNT_MANGER_REQUEST_URL,payload)
  .then(response => {
    dispatch(postSendRequestForAccountManagerSuccess(response.data))
  })
 .catch((error) => {
    dispatch(postSendRequestForAccountManagerFailed(error))
  })
}

const postSendRequestForAccountManagerBegin = () => ({
   type: SEND_ACCOUNT_MANGER_REQUEST_BEGIN,
})

const postSendRequestForAccountManagerSuccess = response => ({
   type: SEND_ACCOUNT_MANGER_REQUEST_SUCCESS,
   response
})

const postSendRequestForAccountManagerFailed = error => ({
  type: SEND_ACCOUNT_MANGER_REQUEST_FAIL,
  error
})


/* Send Request to Account holder to become account manager*/
export const getAccountMemberDetailsToSendRequest= () => dispatch => {
  dispatch(getAccountMemberDetailsToSendRequestBegin())
  axios.get(GET_ACCOUNT_MEMBER_DETAILS_URL)
  .then(response => {
    dispatch(getAccountMemberDetailsToSendRequestSuccess(response.data))
  })
 .catch((error) => {
    dispatch(getAccountMemberDetailsToSendRequestFailed(error))
  })
}

const getAccountMemberDetailsToSendRequestBegin = () => ({
   type: GET_ACCOUNT_MEMBER_DETAILS_BEGIN,
})

const getAccountMemberDetailsToSendRequestSuccess = response => ({
   type: GET_ACCOUNT_MEMBER_DETAILS_SUCCESS,
   response
})

const getAccountMemberDetailsToSendRequestFailed = error => ({
  type: GET_ACCOUNT_MEMBER_DETAILS_FAIL,
  error
})
