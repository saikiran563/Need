
import axios from 'axios'
const FETCH_SET_ENHANCED_AUTH_SUCCESS= "SET ENHANCED"

const SetAPIUrl ="";


export const setEnhancedAuth = () => dispatch => {
   
 axios.post("http://www.mocky.io/v2/5b5954ab2f000065005f92fc")
      .then((response) => {
        dispatch(setEnhancedAuthSuccess(response))
      })
      .catch((err) => {
        //dispatch(getUserIdError(err))
      })
    //dispatch(setEnhancedAuthSuccess());

}


export const  setEnhancedAuthSuccess = enhancedAuth => ({
    type: FETCH_SET_ENHANCED_AUTH_SUCCESS,
    enhancedAuth,
  })