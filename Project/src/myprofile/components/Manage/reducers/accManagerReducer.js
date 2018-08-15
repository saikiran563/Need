import {
  FETCH_MANAGE_LANDING_BEGIN,
  FETCH_MANAGE_LANDING_SUCCESS,
  FETCH_MANAGE_LANDING_FAIL,
  FETCH_MTNS_SUCCESS,
  FETCH_MANAGER_REQUESTS_SUCCESS,
  GET_ACCOUNT_MEMBER_DETAILS_SUCCESS,
  ADD_NEW_MANAGER_SUCCESS
} from '../actions/manage'

const initialState = {
  managers: [],
  addedManager: [],
  revokedManager: {},
  accountManagerRequests: [],
  mtns: [],
  emailId: '',
  phoneNumber:'',
  deniedAccountManagerRequests: null,
  showRequestSuccessPopup: false,
  newAccountMemberRequest:  {
      status: 'request denied' // other Status:  request pending , request denied
  }
}

import {
  createReducer,
  updateObject,
  updateItemInArray,
} from '../../../../utils/reducer'

const accManagerReducer = (state = initialState, action) => {
  const { type } = action
  switch (type) {
    case ADD_NEW_MANAGER_SUCCESS:
      console.log("Add account manager reducer",action)
      return {
        ...state,
        managers: [...state.managers, action.response.data]
      }
    
    case FETCH_MANAGE_LANDING_SUCCESS:
      return updateObject(state, {
        managers: action.response.customerInfo
      })
    case FETCH_MTNS_SUCCESS:
      return updateObject(state, {
        mtns: action.response.mtnList
      })
    case FETCH_MANAGER_REQUESTS_SUCCESS:
      let accountManagerRequests = []
      action.response.customerInfo.forEach(eachManager => {
        if( !('role' in eachManager) ){ // Managers who does not have role key are considered as waiting for approval
          accountManagerRequests.push(eachManager)
        }
      })
      return updateObject(state, {
        accountManagerRequests
      })
    case GET_ACCOUNT_MEMBER_DETAILS_SUCCESS :
    return updateObject(state, {
      emailId: action.response.emailID,
      phoneNumber: action.response.primaryPhone,
    })
    default:
      return state
  }
}

export default accManagerReducer
