import axios from 'axios';
import { getURL } from '../../../../utils/config';

export const SET_BILLING_ADDRESS = 'contacts/SET_BILLING_ADDRESS'
export const SET_BILLING_ADDRESS_SUCCESS = 'contacts/SET_BILLING_ADDRESS_SUCCESS'
export const SET_BILLING_ADDRESS_ERROR = 'contacts/SET_BILLING_ADDRESS_ERROR'

import {contents} from './verifyModalContent'

export const setBillingAddress = (address) => dispatch => {



          //  dispatch(showVerifyAddressModal());
            
           // dispatch(showVerifiedAddress(contents));

    // API CAll WILL BE CALLED HERE
   // axios.post("http://localhost:3000/contact",{data: id})
    // .then((response) => {
     ///   dispatch(getBillingAddressSuccess(response));
        // if('address is not verified'){
        //     dispatch(showVerifyAddressModal());
        //     dispatch(showVerifiedAddress(response));
        // } 
     // })
     // .catch((err) => {
      //  dispatch(getBillingAddressError(err))
     // })
}
export const showVerifiedAddress = (contents) => ({
   type: 'modal/SET_MODAL_CONTENT',
  contents,
});
export const showVerifyAddressModal = () => ({
 type: 'modal/SHOW_MODAL',
});

// export const getBillingAddressSuccess = (response) => ({
//   type: SET_BILLING_ADDRESS_SUCCESS,
//   response,
// })
// export const getBillingAddressError = (error) => ({
//   type: SET_BILLING_ADDRESS_ERROR,
//   error,
// })

export const setBillingAddressSuccess = (response) => ({
  type: SET_BILLING_ADDRESS_SUCCESS,
  status: response,
})
export const setBillingAddressError = (response) => ({
  type: SET_BILLING_ADDRESS_ERROR,
  status: response,
})

export const setBillingAddressOnSuccess = (response) => ({
  type: SET_BILLING_ADDRESS,
  response,
})

export const updateBillingAddress = (address) => dispatch => {
    // API CAll WILL BE CALLED HERE

   const resp = axios({
        method: 'post',
        url: getURL('SET_BILL_ADDR_INFO'),
        timeout: 30000, // Let's say you want to wait at least 30 secs
        data: address
    });
    resp.then((response) => {
   
      
      if(response.data.statusCode == "0"){
        dispatch(setBillingAddressOnSuccess(address))
        dispatch(setBillingAddressSuccess(response.data.statusCode))   
      }else{
      dispatch(setBillingAddressError(err))
       }

      //  dispatch(setBillingAddressOnSuccess(address))
      // dispatch(setBillingAddressSuccess("0")) 
        
    })
     .catch((err) => {
        dispatch(setBillingAddressError(err))
      })
 
}

export const resetBillingAddressStatus = (response) => dispatch => {
  dispatch({
    type: SET_BILLING_ADDRESS_SUCCESS,
             status: response
  } )
}


