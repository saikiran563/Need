import axios from 'axios'
import mockAPI from '../api'

export const FETCH_DEVICE_TILES_BEGIN = 'devices/FETCH_DEVICE_TILES_BEGIN'
export const FETCH_DEVICE_TILES = 'devices/FETCH_DEVICE_TILES'
export const FETCH_DEVICE_TILES_SUCCESS = 'devices/FETCH_DEVICE_TILES_SUCCESS'

export const API_DEVICE_TILES_URL =
  'https://vzwqa6.verizonwireless.com/ui/hub/data/ao/mydevices/devices-list'

export const fetchDeviceTiles = () => dispatch => {
  dispatch(fetchDeviceTilesBegin())

  const onSuccess = response => {
    console.log('fetchDeviceTiles.onSuccess: ', response)
    const json = response
    if (response.data.header.errorCode === '00') {
      dispatch(
        fetchDeviceTilesSuccess(
          json.data.data.deviceTiles
            .slice(0, 5)
            .concat(json.data.data.deviceTiles.slice(-1))
        )
      )
      //dispatch(fetchDeviceTilesSuccess(json.data.data.deviceTiles));
    } else {
      console.log(
        'fetchDeviceTiles did not return status success so running mock api'
      )
      mockAPI.fetchProfile(response => {
        //dispatch(fetchDeviceTilesSuccess(response.data.deviceTiles.slice(0,3)));
        dispatch(
          fetchDeviceTilesSuccess(
            response.data.deviceTiles
              .slice(0, 5)
              .concat(response.data.deviceTiles.slice(-1))
          )
        )
      })
    }
  }

  const onError = error => {
    console.log('fetchDeviceTiles.onError: ', error)
    if (!axios.isCancel(error)) {
      //dispatch(fetchDeviceTilesFail(error));
      mockAPI.fetchProfile(response => {
        //dispatch(fetchDeviceTilesSuccess(response.data.deviceTiles.slice(0,3)));
        dispatch(
          fetchDeviceTilesSuccess(
            response.data.deviceTiles
            
          )
        )
      })
    }
  }
  console.log('ajax call: ', API_DEVICE_TILES_URL)
  axios
    .get(API_DEVICE_TILES_URL)
    .then(onSuccess)
    .catch(onError)
  /**
   mockAPI.fetchDeviceTiles(response => {
        dispatch(fetchDeviceTilesSuccess(response.data.deviceTiles));
      });
  **/
}
export const fetchDeviceTilesBegin = () => ({
  type: FETCH_DEVICE_TILES_BEGIN,
})
export const fetchDeviceTilesSuccess = deviceTiles => ({
  type: FETCH_DEVICE_TILES_SUCCESS,
  deviceTiles,
})
