import axios from 'axios';
import { getURL } from '../../../../utils/config';

export const SET_EMAILID = 'contacts/SET_EMAILID'
export const SET_EMAILID_SUCCESS = 'contacts/SET_EMAILID_SUCCESS'
export const SET_EMAILID_ERROR = 'contacts/SET_EMAILID_ERROR'


export const setEmailId = (data) => dispatch => {
    // API CAll WILL BE CALLED HERE
    
    axios({
        method: 'post',
        url: getURL('SET_EMAIL_INFO'),
        timeout: 30000, // Let's say you want to wait at least 30 secs
        data: data
    })
      .then((response) => {
        if(response.data.statusCode == "0"){
          dispatch(setEmailIdonSuccess(data));
          dispatch(getEmailIdSuccess(response.data.statusCode))
        }else{
          dispatch(getEmailIdError(err))
        }
        
      })
      .catch((err) => {
        dispatch(getEmailIdError(err))
      })
}
export const getEmailIdSuccess = (response) => ({
  type: SET_EMAILID_SUCCESS,
  response,
});

export const setEmailIdonSuccess = (response) => ({
  type: SET_EMAILID,
  response
});

export const getEmailIdError = (error) => ({
  type: SET_EMAILID_ERROR,
  error,
})

