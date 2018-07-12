const FETCH_PRIVACY_AND_PERMISSIONS_BEGIN = 'privacies/FETCH_PRIVACY_AND_PERMISSIONS_BEGIN'
const FETCH_PRIVACY_AND_PERMISSIONS_SUCCESS = 'privacies/FETCH_PRIVACY_AND_PERMISSIONS_SUCCESS'

import {
  createReducer,
  updateObject,
  updateItemInArray,
} from '../../../../utils/reducer'


const initialState = {
  privacyDetails: null,
  isFetching: false,
  show: false,
  verizonSelectsInfo:{},
  privacySettingsInfo:{},
}


const fetchPrivacyAndPermissionsBegin = (state, action) => {
  return updateObject(state, { isFetching: true })
}


const fetchPrivacyAndPermissionsSuccess = (state, action) => {
  return updateObject(state, {
    isFetching: false,
    verizonSelectsInfo: action.privacies.verizonSelectsInfo,
    privacySettingsInfo: action.privacies.privacySettingsInfo,
  })
}

const privacyDetailsReducer = (state = initialState, action) => {
  const { type } = action
  switch (type) {
    case FETCH_PRIVACY_AND_PERMISSIONS_BEGIN:
      return fetchPrivacyAndPermissionsBegin(state, action)
    case FETCH_PRIVACY_AND_PERMISSIONS_SUCCESS:
      return fetchPrivacyAndPermissionsSuccess(state, action)
    default:
      return state
  }
}


export default privacyDetailsReducer