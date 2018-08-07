import axios from 'axios'
import mockAPI from '../api'

export const FETCH_ENHANCED_AUTH_EDIT = 'FETCH_ENHANCED_AUTH_EDIT';

// export const API_ENHANCED_AUTH_URL = "#";

// http://www.mocky.io/v2/5b612eb1300000dc046a4007

export const fetchEnhAuthEdit = () => dispatch => {

  mockAPI.fetchEnhAuthEdit(response => {
    dispatch(fetchEnhancedAuthEdit(response))
  })
}

// export const fetchEnhAuthEdit = () => dispatch => {
//   axios.get("http://www.mocky.io/v2/5b6765353200000810ee127e") //EDIT API 
//   .then((response) => {

//     dispatch(fetchEnhancedAuthEdit(response.data));
//   })
//   .catch((err) => {
//     dispatch()
//   })

// }


export const fetchEnhancedAuthEdit = (enhancedAuth) => ({
  type: FETCH_ENHANCED_AUTH_EDIT,
  enhancedAuth
})

 