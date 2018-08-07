import axios from 'axios';

export const SET_EMAILID = 'contacts/SET_EMAILID'
export const SET_EMAILID_SUCCESS = 'contacts/SET_EMAILID_SUCCESS'
export const SET_EMAILID_ERROR = 'contacts/SET_EMAILID_ERROR'


export const setEmailId = (data) => dispatch => {
    // API CAll WILL BE CALLED HERE
    axios.post('https://vzwqa3.verizonwireless.com/ui/acct/secure/data/secure/profile/emailAddress',data)
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

