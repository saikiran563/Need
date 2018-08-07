
import axios from 'axios';
export const SHOW_MODAL = 'modal/SHOW_MODAL'
export const HIDE_MODAL = 'modal/HIDE_MODAL'
export const SET_MODAL_CONTENT = 'modal/SET_MODAL_CONTENT'

export const showModalPopup = () => ({
  type: SHOW_MODAL,
})
export const hideModalPopup = () => ({
  type: HIDE_MODAL,
})
export const setModalContents = contents => ({
  type: SET_MODAL_CONTENT,
  contents,
})


export const setBillingAddress = (address) => dispatch => {

  dispatch(hideModalPopup());
  dispatch(updateBillingAddress(address));
   
}

export const updateBillingAddress = address => dispatch => {
  axios.post("http://www.mocky.io/v2/5b42cc192e00006f00222fc9",{data: address})
      .then((response) => {
        dispatch(refreshContactBilling(response.data));
         
      })
      .catch((err) => {
        dispatch(getBillingAddressError(err))
      })
};

export const refreshContactBilling = contacts => ({
   type: 'contacts/FETCH_CONTACT_AND_BILLING_SUCCESS',
  contacts,
})