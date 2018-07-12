import axios from 'axios';
//import {C as Constants  } from 'Constants';
export const SET_USERID = 'security/SET_USERID'
export const SET_USERID_SUCCESS = 'security/SET_USERID_SUCCESS'
export const SET_USERID_ERROR = 'security/SET_USERID_ERROR'
//console.log(C.MAPURL,"-",C.HOSTNAME);

export const setUserId = (id) => dispatch => {
    // API CAll WILL BE CALLED HERE
   /* axios.post("https://jsonplaceholder.typicode.com/posts/1",{data: id})
      .then((response) => {
        dispatch(getUserIdSuccess(response))
      })
      .catch((err) => {
        dispatch(getUserIdError(err))
      })*/
      dispatch(getUserIdSuccess({"response":"success","id":id}))
}
export const getUserIdSuccess = (response) => ({
  type: SET_USERID_SUCCESS,
  response,
})
export const getUserIdError = (error) => ({
  type: SET_USERID_ERROR,
  error,
})

