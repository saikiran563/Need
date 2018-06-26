import axios from 'axios';

export const SET_USERID = 'security/SET_USERID'
export const SET_USERID_SUCCESS = 'security/SET_USERID_SUCCESS'
export const SET_USERID_ERROR = 'security/SET_USERID_ERROR'


export const setUserId = (id) => dispatch => {
    // API CAll WILL BE CALLED HERE
    axios.post(SOME_URL,{data: id})
      .then((response) => {
        dispatch(getUserIdSuccess(response))
      })
      .catch((err) => {
        dispatch(getUserIdError(err))
      })
}
export const getUserIdSuccess = (response) => ({
  type: SET_USERID_SUCCESS,
  response,
})
export const getUserIdError = (error) => ({
  type: SET_USERID_ERROR,
  error,
})

