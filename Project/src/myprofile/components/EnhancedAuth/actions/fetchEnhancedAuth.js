import axios from 'axios'
import mockAPI from '../api'

export const FETCH_ENHANCED_AUTH_EDIT_BEGIN = 'FETCH_ENHANCED_AUTH_EDIT_BEGIN';

export const FETCH_ENHANCED_AUTH_EDIT_SUCCESS = 'FETCH_ENHANCED_AUTH_EDIT_SUCCESS';

import  { getURL,encrypt, decrypt, BASE_URL, API_NAME } from "../../../../utils/config"

export const fetchEnhAuthEdit = () => dispatch => {
dispatch(fetchEnhAuthEditBegin())

  // mockAPI.fetchEnhAuthEdit(response => {
  //   dispatch(fetchEnhancedAuthEdit(response))
  // })
  // http://localhost:3000/enauth
  // https://vzwqa2.verizonwireless.com/ui/acct/secure/data/ao/profile/twoFactorAuth
  axios.interceptors.request.use(function (config) {
     
    // show loader
    return config;
}, function (error) {
    return Promise.reject(error);
});

// Add a response interceptor
axios.interceptors.response.use(function (response) {
  
    console.log("------------  Ajax pending",response);
    dispatch(fetchEnhancedAuthEdit(response.data));
   
    return response;
}, function (error) {
    return Promise.reject(error);
});
  axios.get(getURL('GET_ENHANCED_AUTH'))
    .then((response) => {
   
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

 