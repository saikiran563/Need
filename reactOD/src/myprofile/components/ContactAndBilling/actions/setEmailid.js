import axios from 'axios';

export const SET_EMAILID = 'contacts/SET_EMAILID'
export const SET_EMAILID_SUCCESS = 'contacts/SET_EMAILID_SUCCESS'
export const SET_EMAILID_ERROR = 'contacts/SET_EMAILID_ERROR'


export const setEmailId = (id) => dispatch => {
    // API CAll WILL BE CALLED HERE
    axios.post(SOME_URL,{data: id})
      .then((response) => {
        dispatch(getEmailIdSuccess(response))
      })
      .catch((err) => {
        dispatch(getEmailIdError(err))
      })
}
export const getEmailIdSuccess = (response) => ({
  type: SET_EMAILID_SUCCESS,
  response,
})
export const getEmailIdError = (error) => ({
  type: SET_EMAILID_ERROR,
  error,
})

