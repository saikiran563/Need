import axios from 'axios'
import mockAPI from '../api'

export const FETCH_LEFTNAV_BEGIN = 'leftnav/FETCH_LEFTNAV_BEGIN'
export const FETCH_LEFTNAV_SUCCESS = 'leftnav/FETCH_LEFTNAV_SUCCESS'

export const API_LEFTNAV_URL = "#";

export const fetchLeftNav = () => dispatch => {
  dispatch(fetchLeftNavBegin())


   mockAPI.fetchLeftNav(response => {
        dispatch(fetchLeftNavSuccess(response.cq));
      });

  // axios.get(API_LEFTNAV_URL)
  //   .then((response) => {

  //     dispatch(fetchLeftNavSuccess(response.cq));
  //   })
  //   .catch((err) => {
  //     dispatch()
  //   })
      
  }

export const fetchLeftNavBegin = () => ({
  type: FETCH_LEFTNAV_BEGIN,
})
export const fetchLeftNavSuccess = leftNav => ({
  type: FETCH_LEFTNAV_SUCCESS,
  leftNav,
})