import axios from 'axios'
import mockAPI from '../api'


export const FETCH_ENHANCED_AUTH_BEGIN = 'enhancedauth/FETCH_ENHANCED_AUTH_BEGIN'
export const FETCH_ENHANCED_AUTH_SUCCESS = 'enhancedauth/FETCH_ENHANCED_AUTH_SUCCESS'

export const API_ENHANCED_AUTH_URL = "#";


export const fetchEnhancedAuth = () => dispatch => {
    dispatch(fetchEnhancedAuthBegin())


    mockAPI.fetchEnhancedAuth(response => {
        dispatch(fetchEnhancedAuthSuccess(response.data));
      });

  // axios.get(API_LEFTNAV_URL)
  //   .then((response) => {

  //     dispatch(fetchLeftNavSuccess(response.cq));
  //   })
  //   .catch((err) => {
  //     dispatch()
  //   })


}


export const fetchEnhancedAuthBegin = () => ({
    type: FETCH_ENHANCED_AUTH_BEGIN,
  })

  export const fetchEnhancedAuthSuccess = enhancedAuth => ({
    type: FETCH_ENHANCED_AUTH_SUCCESS,
    enhancedAuth,
  })