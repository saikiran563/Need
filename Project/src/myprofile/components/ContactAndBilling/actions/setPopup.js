
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


export const updateBillingAddress = (address) => dispatch => {

  // dispatch(hideModalPopup());
  // dispatch(updateBillingAddress(address));
  dispatch(refreshContactBilling(address));
   
}

// export const updateBillingAddress = address => dispatch => {
//   axios.post("http://localhost:3000/contact",address)
//       .then((response) => {
//         dispatch(refreshContactBilling(response.data));
         
//       })
//       .catch((err) => {
//         dispatch(getBillingAddressError(err))
//       })
// };

export const refreshContactBilling = address => ({
   type: 'contacts/FETCH_CONTACT_AND_BILLING_SUCCESS',
  'contactDetails': address,
});