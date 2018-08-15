import axios from 'axios'
import mockAPI from '../api'

export const FETCH_ENHANCED_AUTH_EDIT_BEGIN = 'FETCH_ENHANCED_AUTH_EDIT_BEGIN';

export const FETCH_ENHANCED_AUTH_EDIT_SUCCESS = 'FETCH_ENHANCED_AUTH_EDIT_SUCCESS';


export const fetchEnhAuthEdit = () => dispatch => {
dispatch(fetchEnhAuthEditBegin())

  // mockAPI.fetchEnhAuthEdit(response => {
  //   dispatch(fetchEnhancedAuthEdit(response))
  // })
  // https://vzwqa2.verizonwireless.com/ui/acct/secure/data/ao/profile/twoFactorAuth

  axios.get("https://vzwqa2.verizonwireless.com/ui/acct/secure/data/ao/profile/twoFactorAuth")
    .then((response) => {
    dispatch(fetchEnhancedAuthEdit(response.data))
    })
     .catch((err) => {
       dispatch()
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

export const fetchEnhAuthEditBegin = () => ({
  type: FETCH_ENHANCED_AUTH_EDIT_BEGIN,
})

export const fetchEnhancedAuthEdit = (enhancedAuth) => ({
  type: FETCH_ENHANCED_AUTH_EDIT_SUCCESS,
  enhancedAuth
})

 