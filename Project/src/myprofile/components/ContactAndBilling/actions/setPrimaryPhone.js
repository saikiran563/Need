import axios from 'axios';

export const SET_PRIMARY_PHONE = 'contacts/PRIMARY_PHONE'
export const SET_PRIMARY_PHONE_SUCCESS = 'contacts/SET_PRIMARY_PHONE_SUCCESS'
export const SET_PRIMARY_PHONE_ERROR = 'contacts/SET_PRIMARY_PHONE_ERROR'


export const setPrimaryPhone = (data) => dispatch => {
    // API CAll WILL BE CALLED HERE
    axios.post('https://vzwqa3.verizonwireless.com/ui/acct/secure/data/secure/profile/primaryPhone',data)
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

