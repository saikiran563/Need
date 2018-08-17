import {
  FETCH_MANAGE_LANDING_BEGIN,
  FETCH_MANAGE_LANDING_SUCCESS,
  FETCH_MANAGE_LANDING_FAIL,
  FETCH_MTNS_SUCCESS,
  FETCH_MANAGER_REQUESTS_SUCCESS,
  GET_ACCOUNT_MEMBER_DETAILS_SUCCESS,
  ADD_NEW_MANAGER_SUCCESS,
  SHOW_LEARN_MORE_POPUP,
  HIDE_LEARN_MORE_POPUP
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
  showSpinner: true,
  newAccountMemberRequest:  {
      status: 'request denied' // other Status:  request pending , request denied
  },
  showLearnMorePopUp: false
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
        managers: action.response.customerInfo,
        showSpinner: false
      },)
    case FETCH_MTNS_SUCCESS:
      return updateObject(state, {
        mtns: action.response.mtnList
    })
    case FETCH_MANAGER_REQUESTS_SUCCESS:
      let accountManagerRequests = []
      action.response.customerInfo.forEach(eachManager => {
        if( eachManager.role === 'mobileSecure' ){
          accountManagerRequests.push(eachManager)
        }
      })
      return updateObject(state, {
        accountManagerRequests
      })
    case GET_ACCOUNT_MEMBER_DETAILS_SUCCESS :
    return updateObject(state, {
      emailId: action.response.emailId,
      phoneNumber: action.response.phoneNumber,
      newAccountMemberRequest : {
        status: action.response.hasPendingRequests ? 'request pending' : 'not requested'
      }
    })
    case SHOW_LEARN_MORE_POPUP:
      return updateObject(state, {
        showLearnMorePopUp: true
    })
    case HIDE_LEARN_MORE_POPUP:
      return updateObject(state, {
        showLearnMorePopUp: false
    })
    default:
      return state
  }
}

export default accManagerReducer
