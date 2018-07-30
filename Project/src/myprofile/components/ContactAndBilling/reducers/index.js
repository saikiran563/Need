//import {
  //FETCH_CONTACT_AND_BILLING_BEGIN,
  //FETCH_CONTACT_AND_BILLING_SUCCESS,
//} from '../actions/fetchContactDetails'
import { SET_EMAILID_SUCCESS, SET_EMAILID_ERROR } from '../actions/setEmailid';
import {
  SHOW_MODAL,
  HIDE_MODAL,
  SET_MODAL_CONTENT
} from '../actions/setPopup';

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
  emailStatus: null,
  showPopup: false,
  popupContents: {
      header: '',
      error: '',
      addressEntered: {
                 address : "",
                 apartment: "",
                 city: "",
                 state: "",
                 zip: ""
      },
      addressSuggessions: [
        {
                      address : "",
                      apartment: "",
                      city: "",
                      state: "",
                      zip: ""
        }
      ]
  }
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

const setEmailIdSuccess = (state, action) => {
   return updateObject(state, {
    isFetching :false,
    emailStatus:action.response.status

  })
}

const showModal = (state, action) => {
  return updateObject(state, { showPopup: true })
}

const hideModal = (state, action) => {
  return updateObject(state, { showPopup: false })
}

const setModalContent = (state, action) => {
  return updateObject(state, {
    popupContents: action.contents,
  })
}

const contactDetailsReducer = (state = initialState, action) => {
  const { type } = action
  switch (type) {
    case FETCH_CONTACT_AND_BILLING_BEGIN:
      return fetchContactAndBillingBegin(state, action)
    case FETCH_CONTACT_AND_BILLING_SUCCESS:
      return fetchContactAndBillingSuccess(state, action)
    case SET_EMAILID_SUCCESS:
      return setEmailIdSuccess(state, action)
    case SHOW_MODAL:
      return showModal(state, action)
    case HIDE_MODAL:
      return hideModal(state, action)
    case SET_MODAL_CONTENT:
      return setModalContent(state, action)
    default:
      return state
  }
}


export default contactDetailsReducer
