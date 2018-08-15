import axios from 'axios';
import { getURL } from '../../../../utils/config';

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
  type: SET_SERVICE_ADDRESS_SUCCESS,
  status: response,
})
export const setServiceAddressError = (response) => ({
  type: SET_SERVICE_ADDRESS_ERROR,
  status: response,
})

export const setServiceAddressOnSuccess = (response) => ({
  type: SET_SERVICE_ADDRESS,
  response,
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
        dispatch(setServiceAddressOnSuccess(address))
        dispatch(setServiceAddressSuccess(response.data.statusCode))   
      }else{
      dispatch(setServiceAddressError(err))
       }

      //  dispatch(setServiceAddressOnSuccess(address))
      // dispatch(setServiceAddressSuccess(response.status)) 
        
    })
     .catch((err) => {
        dispatch(setServiceAddressError(err))
      })
 
}

export const resetServiceAddressStatus = (response) => dispatch => {
  dispatch({
    type: SET_SERVICE_ADDRESS_SUCCESS,
             status: response
  } )
}


