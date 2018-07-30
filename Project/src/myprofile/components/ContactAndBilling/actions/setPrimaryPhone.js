import axios from 'axios';

export const SET_PRIMARY_PHONE = 'contacts/PRIMARY_PHONE'
export const SET_PRIMARY_PHONE_SUCCESS = 'contacts/SET_PRIMARY_PHONE_SUCCESS'
export const SET_PRIMARY_PHONE_ERROR = 'contacts/SET_PRIMARY_PHONE_ERROR'


export const setPrimaryPhone = (data) => dispatch => {
    // API CAll WILL BE CALLED HERE
    axios.post('http://localhost:3000/contact',data)
      .then((response) => {
        dispatch(getPrimaryPhoneSuccess(response))
      })
      .catch((err) => {
        dispatch(getPrimaryPhoneError(err))
      })
}
export const getPrimaryPhoneSuccess = (response) => ({
  type: SET_PRIMARY_PHONE_SUCCESS,
  response,
})
export const getPrimaryPhoneError = (error) => ({
  type: SET_PRIMARY_PHONE_ERROR,
  error,
})

