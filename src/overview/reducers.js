import { combineReducers } from 'redux'

import overviewReducer from './components/QuickLinks/reducers'
import SecurityReducer from './components/Security/reducers'

const rootReducer = combineReducers({
  overview: overviewReducer,
  security: SecurityReducer,
  
})

export default rootReducer
