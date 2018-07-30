import axios from 'axios';

export const SET_BILLING_ADDRESS = 'contacts/SET_BILLING_ADDRESS'
export const SET_BILLING_ADDRESS_SUCCESS = 'contacts/SET_BILLING_ADDRESS_SUCCESS'
export const SET_BILLING_ADDRESS_ERROR = 'contacts/SET_BILLING_ADDRESS_ERROR'

import {contents} from './verifyModalContent'

export const setBillingAddress = (address) => dispatch => {



            dispatch(showVerifyAddressModal());
            
            dispatch(showVerifiedAddress(contents));

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

export const getBillingAddressSuccess = (response) => ({
  type: SET_BILLING_ADDRESS_SUCCESS,
  response,
})
export const getBillingAddressError = (error) => ({
  type: SET_BILLING_ADDRESS_ERROR,
  error,
})

