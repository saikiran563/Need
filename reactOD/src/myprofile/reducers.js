import { combineReducers } from 'redux'

import myprofileReducer from './components/QuickLinks/reducers'
import SecurityReducer from './components/Security/reducers'
import ManageReducer from './components/Manage/reducers'

import contactDetailsReducer from './components/ContactAndBilling/reducers'

import privacyDetailsReducer from './components/PrivacyAndPermissions/reducers'

import leftNavReducer from './components/LeftNavBar/reducers'
import modalReducer from './components/Modal/reducers'


const rootReducer = combineReducers({
  myprofile: myprofileReducer,
  security: SecurityReducer,
  manage: ManageReducer,
  vzModal: modalReducer,
  contactDetails : contactDetailsReducer,
  privacyDetails : privacyDetailsReducer,
  leftNav: leftNavReducer,
})

export default rootReducer
