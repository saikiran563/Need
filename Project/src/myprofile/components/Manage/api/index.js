const BASE_URL = 'https://vzwqa2.verizonwireless.com/ui/acct/secure'

//export const GET_MANAGE_LANDING_URL = BASE_URL + '/data/ao/profile/accountmanager'
export const GET_ACCOUNT_MANAGE_URL =  BASE_URL + '/data/ao/profile/accountmanager'
export const GET_ACCOUNT_MEMBER_DETAILS =  BASE_URL + '/data/am/profile/pendingRequests'
export const ADD_MANAGER_URL = BASE_URL + '/data/ahonly/profile/modifyacctmgr'
export const REMOVE_MANAGER_URL =  BASE_URL + '/data/ahonly/profile/downgradeacctmgr'
export const SEND_ACCOUNT_MANGER_REQUEST_URL = BASE_URL + '/data/am/profile/accountManagerRequest'
export const APPROVE_MANAGER_URL = BASE_URL + '/data/ahonly/profile/accountManagerRequest'
export const DENY_MANAGER_URL = BASE_URL + '/data/ahonly/profile/accountManagerRequest'
export const GET_MTNS_URL =  BASE_URL +  '/data/ao/profile/mtns'  //'https://api.myjson.com/bins/z3tsc'
//export const GET_MANAGER_REQUESTS_URL =  BASE_URL +  '/data/ahonly/profile/pendingRequests'
//export const POST_GREETING_NAME_URL =  BASE_URL + '/data/secure/profile/greetingname'
//export const GET_ACCOUNT_MEMBER_DETAILS_URL =  BASE_URL+ '/data/secure/profile/contactAndBillingInfo'


// Fake APIs - remove this and uncomment the above
export const POST_GREETING_NAME_URL =  'http://postb.in/sQOZrnjr' //BASE_URL + '/data/secure/profile/greetingname'
export const GET_MANAGE_LANDING_URL = 'https://mypf-2a66b.firebaseio.com/activemanagers.json'
export const GET_MANAGER_REQUESTS_URL = 'https://mypf-2a66b.firebaseio.com/pendingRequests.json'
export const GET_ACCOUNT_MEMBER_DETAILS_URL ='https://api.myjson.com/bins/1d5hho'
