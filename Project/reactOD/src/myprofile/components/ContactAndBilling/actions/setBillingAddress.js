import axios from 'axios';

export const SET_BILLING_ADDRESS = 'contacts/SET_BILLING_ADDRESS'
export const SET_BILLING_ADDRESS_SUCCESS = 'contacts/SET_BILLING_ADDRESS_SUCCESS'
export const SET_BILLING_ADDRESS_ERROR = 'contacts/SET_BILLING_ADDRESS_ERROR'


export const setBillingAddress = (address) => dispatch => {
    // API CAll WILL BE CALLED HERE
    axios.post(SOME_URL,{data: id})
      .then((response) => {
        dispatch(getBillingAddressSuccess(response))
      })
      .catch((err) => {
        dispatch(getBillingAddressError(err))
      })
}
export const getBillingAddressSuccess = (response) => ({
  type: SET_BILLING_ADDRESS_SUCCESS,
  response,
})
export const getBillingAddressError = (error) => ({
  type: SET_BILLING_ADDRESS_ERROR,
  error,
})

