const initialState = {
  managers: [],
  addedManager: [],
  revokedManager: {},
  accountManagerRequests: [],
  mtns: [],
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
    case 'FETCH_MANAGE_LANDING_SUCCESS':
      return updateObject(state, {
        managers: action.response.customerInfo
      })
    case 'FETCH_MTNS_SUCCESS':
      return updateObject(state, {
        mtns: action.response.mtnList
      })
    default:
      return state
  }
}

export default accManagerReducer
