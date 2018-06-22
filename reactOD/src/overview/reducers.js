import { combineReducers } from 'redux'

import overviewReducer from './components/QuickLinks/reducers'
import SecurityReducer from './components/Security/reducers'

import contactDetailsReducer from './components/ContactAndBilling/reducers'

const rootReducer = combineReducers({
  overview: overviewReducer,
  security: SecurityReducer,
  contactDetails : contactDetailsReducer
})

export default rootReducer
