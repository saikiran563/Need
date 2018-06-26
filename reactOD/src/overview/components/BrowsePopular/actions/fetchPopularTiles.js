import axios from 'axios'
import mockAPI from '../api'

export const FETCH_POPULAR_TILES_BEGIN = 'devices/FETCH_POPULAR_TILES_BEGIN'
export const FETCH_POPULAR_TILES = 'devices/FETCH_POPULAR_TILES'
export const FETCH_POPULAR_TILES_SUCCESS = 'devices/FETCH_POPULAR_TILES_SUCCESS'

export const API_POPULAR_TILES_URL = '/ui/hub/data/ao/mydevices/tiles/support'

export const fetchPopularTiles = () => dispatch => {
  dispatch(fetchPopularTilesBegin())

  const onSuccess = response => {
    console.log('fetchPopularTiles.onSuccess: ', response)
    //const json = response.data;
    //dispatch(fetchSuggestionsSuccess(json.data.suggestionList, inputValue));
    const json = response
    dispatch(fetchPopularTilesSuccess(json.data.data.supportTiles))
  }

  const onError = error => {
    //console.log('*** isCancelRequest: ', searchAPI.isCancelRequest(error));
    console.log('fetchPopularTiles.onError: ', error)
    if (!axios.isCancel(error)) {
      dispatch(fetchPopularTilesFail(error))
    }
  }
  console.log('ajax call: ', API_POPULAR_TILES_URL)
  axios
    .get(API_POPULAR_TILES_URL)
    .then(onSuccess)
    .catch(onError)

  /*mockAPI.fetchPopularTiles(response => {
    dispatch(fetchPopularTilesSuccess(response.data.popularTiles));
  });*/
}
export const fetchPopularTilesBegin = () => ({
  type: FETCH_POPULAR_TILES_BEGIN,
})
export const fetchPopularTilesSuccess = popularTiles => ({
  type: FETCH_POPULAR_TILES_SUCCESS,
  popularTiles,
})
