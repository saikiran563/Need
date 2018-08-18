//import {
  //FETCH_CONTACT_AND_BILLING_BEGIN,
  //FETCH_CONTACT_AND_BILLING_SUCCESS,
//} from '../actions/fetchContactDetails'
import { SET_EMAILID, SET_EMAILID_SUCCESS, SET_EMAILID_ERROR } from '../actions/setEmailid';
import { SET_PRIMARY_PHONE, SET_PRIMARY_PHONE_SUCCESS, SET_PRIMARY_PHONE_ERROR } from '../actions/setPrimaryPhone';
import { SET_BILLING_ADDRESS, SET_BILLING_ADDRESS_SUCCESS, SET_BILLING_ADDRESS_ERROR } from '../actions/setBillingAddress';
import { SET_SERVICE_ADDRESS, SET_SERVICE_ADDRESS_SUCCESS, SET_SERVICE_ADDRESS_ERROR, EDIT_ADDRESS_OR_EDIT_CLICKED, CANCEL_BUTTON_CLICKED } from "../actions/setServiceAddress"
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
  primaryPhoneStatus: null,
  billingAddressStatus: null,
  serviceAddressStatus: null,
  editAddressOrLineClicked: false,
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
    emailStatus:action.status
  })

}

const setPrimaryPhoneSuccess = (state, action) => {
  
   return updateObject(state, {
    isFetching :false,
    primaryPhoneStatus:action.status
  })
}

const setBillingAddresSuccess = (state, action) => {
   return updateObject(state, {
    isFetching :false,
    billingAddressStatus:action.status
  })
}

// const setserviceaddress = (state, action) => {
//   console.log('state', state)
//   return state;
// }

const setServiceAddressSuccess = (state, action) => {
  return updateObject(state, {
    isFetching :false,
    serviceAddressStatus:action.status
  })
}

const setEmailId = (state, action) => {
   return updateObject(state, {
  
      list: Object.assign({}, state.list, {emailID:action.response.emailID})
  })
}

const setPrimaryPhone = (state,action) => {
  return updateObject(state, {
  
      list: Object.assign({}, state.list, {primaryPhone:action.response.primaryPhone, alternatePhone:action.response.alternatePhone})
  })
}

const setBillingAddress = (state, action) => {

   return updateObject(state, {
  
      list: Object.assign({}, state.list, {billingAddress : {addressLine1:action.response.addressLine1,
         addressLine2:action.response.addressLine2,
          city:action.response.city,
           state:action.response.state,
           zip:action.response.zip
      }
          })
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
    case EDIT_ADDRESS_OR_EDIT_CLICKED:
      return {
        ...state,
        editAddressOrLineClicked: action.payload
      }
    case CANCEL_BUTTON_CLICKED:
      return {
        ...state,
        editAddressOrLineClicked: action.payload
      }
    case FETCH_CONTACT_AND_BILLING_BEGIN:
      return fetchContactAndBillingBegin(state, action)
    case FETCH_CONTACT_AND_BILLING_SUCCESS:
      return fetchContactAndBillingSuccess(state, action)
    case SET_EMAILID_SUCCESS:
      return setEmailIdSuccess(state, action)
    case SET_EMAILID:
      return setEmailId(state, action);
    case SET_BILLING_ADDRESS:
      return setBillingAddress(state, action)
     case SET_BILLING_ADDRESS_SUCCESS:
      return setBillingAddresSuccess(state, action)
    case SET_PRIMARY_PHONE:
      return setPrimaryPhone(state, action)
    case SET_PRIMARY_PHONE_SUCCESS:
      return setPrimaryPhoneSuccess(state, action)
    case SET_SERVICE_ADDRESS:
      return setServiceAddress(state,action)
    case SET_SERVICE_ADDRESS_SUCCESS:
     return setServiceAddressSuccess(state, action)
    case SET_SERVICE_ADDRESS_ERROR:
     return setServiceAddressError(state, action)
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
