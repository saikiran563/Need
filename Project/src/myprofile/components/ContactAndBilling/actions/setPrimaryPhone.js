import axios from 'axios';
import { getURL } from '../../../../utils/config';

export const SET_PRIMARY_PHONE = 'contacts/PRIMARY_PHONE'
export const SET_PRIMARY_PHONE_SUCCESS = 'contacts/SET_PRIMARY_PHONE_SUCCESS'
export const SET_PRIMARY_PHONE_ERROR = 'contacts/SET_PRIMARY_PHONE_ERROR'


export const setPrimaryPhone = (data) => dispatch => {
    // API CAll WILL BE CALLED HERE
    
    axios({
        method: 'post',
        url: getURL('SET_PHONE_INFO'),
        timeout: 30000, // Let's say you want to wait at least 30 secs
        data: data
    })
      .then((response) => {
        if(response.data.statusCode == "0"){
          dispatch(setPrimaryPhoneonSuccess(data));
          dispatch(getPrimaryPhoneSuccess(response.data.statusCode))
        }else{
          dispatch(getPrimaryPhoneError(err))
        }
        
      })
      .catch((err) => {
        dispatch(getPrimarPhoneError(err))
      })
}
export const getPrimaryPhoneSuccess = (response) => ({
  type: SET_PRIMARY_PHONE_SUCCESS,
  response,
})
export const setPrimaryPhoneOnSuccess = (response) => ({
   type: SET_PRIMARY_PHONE,
  response,
})
export const getPrimaryPhoneError = (error) => ({
  type: SET_PRIMARY_PHONE_ERROR,
  error,
})

