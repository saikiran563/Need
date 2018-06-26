import axios from 'axios'
import mockProfileAPI from '../api'

export const FETCH_QUICK_UPDATE_TILES_BEGIN =
  'quickUpdates/FETCH_QUICK_UPDATE_TILES_BEGIN'
export const FETCH_QUICK_UPDATE_TILES = 'quickUpdates/FETCH_QUICK_UPDATES'
export const FETCH_QUICK_UPDATE_TILES_SUCCESS =
  'quickUpdates/FETCH_QUICK_UPDATE_TILES_SUCCESS'

export const API_QUICK_UPDATES_TILES_URL =
  'https://vzwqa6.verizonwireless.com/ui/hub/data/secure/live-tiles?page=overview'

export const fetchQuickUpdateTiles = () => dispatch => {
  dispatch(fetchQuickUpdateTilesBegin())

  const onSuccess = response => {
    console.log('=====fetchQuickUpdateTiles.onSuccess:===== ', response)
    if (response.data.status === 'success') {
      dispatch(fetchQuickUpdateTilesSuccess(response.data.liveTiles))
    } else {
      console.log(
        'fetchQuickUpdateTiles did not return status success so running mock api'
      )
      mockProfileAPI.fetchQuickUpdateTiles(response => {
        dispatch(fetchQuickUpdateTilesSuccess(response.liveTiles))
      })
    }
  }

  const onError = error => {
    console.log('fetchQuickUpdateTiles.onError: ', error)
    if (!axios.isCancel(error)) {
      //dispatch(fetchDeviceTilesFail(error));
      mockProfileAPI.fetchQuickUpdateTiles(response => {
        dispatch(fetchQuickUpdateTilesSuccess(response.liveTiles))
      })
    }
  }
  console.log('ajax call: ', API_QUICK_UPDATES_TILES_URL)
  axios
    .get(API_QUICK_UPDATES_TILES_URL)
    .then(onSuccess)
    .catch(onError)

  /**
  mockProfileAPI.fetchQuickUpdateTiles(response => {
    dispatch(fetchQuickUpdateTilesSuccess(response.liveTiles));
  });
  **/
}
export const fetchQuickUpdateTilesBegin = () => ({
  type: FETCH_QUICK_UPDATE_TILES_BEGIN,
})
export const fetchQuickUpdateTilesSuccess = quickUpdateTiles => ({
  type: FETCH_QUICK_UPDATE_TILES_SUCCESS,
  quickUpdateTiles,
})
