import axios from 'axios'
import mockAPI from '../api'

export const FETCH_PROFILE_TILES_BEGIN = 'profile/FETCH_PROFILE_TILES_BEGIN'
export const FETCH_PROFILE_TILES = 'profile/FETCH_PROFILE_TILES'
export const FETCH_PROFILE_TILES_SUCCESS = 'profile/FETCH_PROFILE_TILES_SUCCESS'
export const EDIT_EMAIL = 'EDIT_EMAIL'

export const API_PROFILE_TILES_URL = "#";

export const fetchDeviceTiles = () => dispatch => {
  dispatch(fetchDeviceTilesBegin())


   mockAPI.fetchProfile(response => {
        dispatch(fetchDeviceTilesSuccess(response.cq));
      });

  // axios.get(API_PROFILE_TILES_URL)
  //   .then((response) => {

  //     dispatch(fetchDeviceTilesSuccess(response.data.cq.deviceTiles));
  //   })
  //   .catch((err) => {
  //     dispatch()
  //   })
      
  }

export const fetchDeviceTilesBegin = () => ({
  type: FETCH_PROFILE_TILES_BEGIN,
})
export const fetchDeviceTilesSuccess = deviceTiles => ({
  type: FETCH_PROFILE_TILES_SUCCESS,
  deviceTiles,
})


export const editemail= (flag)=>dispatch => {
dispatch(editemailaction(flag));
}

export const editemailaction = (flag) => ({
  type: EDIT_EMAIL,
  flag
})