import { combineReducers } from 'redux'

import myprofileReducer from './components/QuickLinks/reducers'
import SecurityReducer from './components/Security/reducers'

import contactDetailsReducer from './components/ContactAndBilling/reducers'
import ManageReducer from './components/Manage/reducers'

import privacyDetailsReducer from './components/PrivacyAndPermissions/reducers'

import leftNavReducer from './components/LeftNavBar/reducers'
import modalReducer from './components/Modal/reducers'

import enhancedAuthReducer from './components/EnhancedAuth/reducers'

const rootReducer = combineReducers({
  myprofile: myprofileReducer,
  security: SecurityReducer,
  contactDetails : contactDetailsReducer,
  manage: ManageReducer,
  privacyDetails : privacyDetailsReducer,
  leftNav: leftNavReducer,
  enhancedAuth: enhancedAuthReducer,
  vzModal : modalReducer
})

export default rootReducer
