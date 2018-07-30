import axios from 'axios';
//import {C as Constants  } from 'Constants';
export const SET_PASSWORD = 'security/SET_PASSWORD'
export const SET_PASSWORD_SUCCESS = 'security/SET_PASSWORD_SUCCESS'
export const SET_PASSWORD_ERROR = 'security/SET_PASSWORD_ERROR'
//console.log(C.MAPURL,"-",C.HOSTNAME);

export const setPassword = (id) => dispatch => {
    // API CAll WILL BE CALLED HERE
   /* axios.post("https://jsonplaceholder.typicode.com/posts/1",{data: id})
      .then((response) => {
        dispatch(getUserIdSuccess(response))
      })
      .catch((err) => {
        dispatch(getUserIdError(err))
      })*/
      dispatch(getPasswordSuccess({"response":"success","id":id}))
}
export const getPasswordSuccess = (response) => ({
  type: SET_PASSWORD_SUCCESS,
  response,
})
export const getPasswordError = (error) => ({
  type: SET_PASSWORD_ERROR,
  error,
})
