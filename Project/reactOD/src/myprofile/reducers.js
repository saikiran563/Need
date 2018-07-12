import { combineReducers } from 'redux'

import myprofileReducer from './components/QuickLinks/reducers'
import SecurityReducer from './components/Security/reducers'

import contactDetailsReducer from './components/ContactAndBilling/reducers'

import privacyDetailsReducer from './components/PrivacyAndPermissions/reducers'

import leftNavReducer from './components/LeftNavBar/reducers'

const rootReducer = combineReducers({
  myprofile: myprofileReducer,
  security: SecurityReducer,
  contactDetails : contactDetailsReducer,
  privacyDetails : privacyDetailsReducer,
  leftNav: leftNavReducer,
})

export default rootReducer
