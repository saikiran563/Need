import axios from 'axios';
import { getURL } from '../../../../utils/config';
import mockProfileAPI from '../api';
import { FETCH_CONTACT_AND_BILLING_SUCCESS } from './fetchContactDetails';

export const SET_SERVICE_ADDRESS = 'contacts/SET_SERVICE_ADDRESS'
export const SET_SERVICE_ADDRESS_SUCCESS = 'contacts/SET_SERVICE_ADDRESS_SUCCESS'
export const SET_SERVICE_ADDRESS_ERROR = 'contacts/SET_SERVICE_ADDRESS_ERROR'

export const EDIT_ADDRESS_OR_EDIT_CLICKED = "EDIT_ADDRESS_OR_EDIT_CLICKED"
export const CANCEL_BUTTON_CLICKED = "CANCEL_BUTTON_CLICKED"

import {contents} from './verifyModalContent'

export const editAddressOrLineClicked = () => dispatch => {
  dispatch({
    type: EDIT_ADDRESS_OR_EDIT_CLICKED,
    payload: true
  })
}

export const cancelButtonClicked = () => dispatch => {
  dispatch({
    type: CANCEL_BUTTON_CLICKED,
    payload: false
  })
}

export const setServiceAddress = (address) => dispatch => {



}
export const showVerifiedAddress = (contents) => ({
   type: 'modal/SET_MODAL_CONTENT',
  contents,
});
export const showVerifyAddressModal = () => ({
 type: 'modal/SHOW_MODAL',
});

export const setServiceAddressSuccess = (response) => ({
  type: SET_SERVICE_ADDRES,
  status: response,
})
export const setServiceAddressError = (response) => ({
  type: SET_SERVICE_ADDRESS_ERROR,
  status: response,
})

export const setServiceAddressOnSuccess = (status) => ({
  type: SET_SERVICE_ADDRESS_SUCCESS,
  status,
})

export const updateServiceAddress = (address) => dispatch => {
    // API CAll WILL BE CALLED HERE

   const resp = axios({
        method: 'post',
        url: getURL('SET_SERV_ADDR_INFO'),
        timeout: 30000, // Let's say you want to wait at least 30 secs
        data: address
    });
    resp.then((response) => {
   
      
      if(response.data.statusCode == "0"){
        dispatch(setServiceAddressOnSuccess(address.data.statusCode))
        dispatch(refreshContactAndBilling())  
      }else{
      dispatch(setServiceAddressError(err))
       } 

      // dispatch(setServiceAddressOnSuccess('0'))
      // // To refresh service address block
      // dispatch(refreshContactAndBilling())
        
    })
     .catch((err) => {
        dispatch(setServiceAddressError(err))
      })
 
}

export const refreshContactAndBilling = () => dispatch => {
  mockProfileAPI.getContactAndBillingInfo(response => {
		dispatch(fetchContactAndBillingSuccess(response.data))
	});
}

export const fetchContactAndBillingSuccess = contacts => ({
  type: FETCH_CONTACT_AND_BILLING_SUCCESS,
  contacts,
})

export const resetServiceAddressStatus = (response) => dispatch => {
  dispatch({
    type: SET_SERVICE_ADDRESS_SUCCESS,
             status: response
  } )
}


