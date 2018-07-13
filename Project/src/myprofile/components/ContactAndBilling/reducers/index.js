//import {
  //FETCH_CONTACT_AND_BILLING_BEGIN,
  //FETCH_CONTACT_AND_BILLING_SUCCESS,
//} from '../actions/fetchContactDetails'

const FETCH_CONTACT_AND_BILLING_BEGIN = 'contacts/FETCH_CONTACT_AND_BILLING_BEGIN'
const FETCH_CONTACT_AND_BILLING_SUCCESS = 'contacts/FETCH_CONTACT_AND_BILLING_SUCCESS'

import {
  createReducer,
  updateObject,
  updateItemInArray,
} from '../../../../utils/reducer'

const initialState = {
  contactDetails: null,
  isFetching: false,
  show: false,
  emailId: null
}

const fetchContactAndBillingBegin = (state, action) => {
  return updateObject(state, { isFetching: true })
}

const fetchContactAndBillingSuccess = (state, action) => {
  return updateObject(state, {
    isFetching: false,
    list: action.contacts,
  })
}

const contactDetailsReducer = (state = initialState, action) => {
  const { type } = action
  switch (type) {
    case FETCH_CONTACT_AND_BILLING_BEGIN:
      return fetchContactAndBillingBegin(state, action)
    case FETCH_CONTACT_AND_BILLING_SUCCESS:
      return fetchContactAndBillingSuccess(state, action)
    default:
      return state
  }
}


export default contactDetailsReducer
