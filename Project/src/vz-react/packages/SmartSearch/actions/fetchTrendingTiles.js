import axios from 'axios'
import mockAPI from '../api'

export const FETCH_TRENDING_TILES_BEGIN = 'search/FETCH_TRENDING_TILES_BEGIN'
export const FETCH_TRENDING_TILES = 'search/FETCH_TRENDING'
export const FETCH_TRENDING_TILES_SUCCESS =
  'search/FETCH_TRENDING_TILES_SUCCESS'

export const API_TRENDING_TILES_URL =
  'https://vzwqa6.verizonwireless.com/smartsearch/answers'

export const fetchTrendingTiles = (type, payload) => dispatch => {
  dispatch(fetchTrendingTilesBegin())

  let cancelFetchRequest

  const onSuccess = response => {
    console.log('fetchTrendingTiles.onSuccess: ', response)
    //const json = response.data;
    //dispatch(fetchSuggestionsSuccess(json.data.suggestionList, inputValue));
    const json = response
    dispatch(fetchTrendingTilesSuccess(json.data))
  }

  const onError = error => {
    //console.log('*** isCancelRequest: ', searchAPI.isCancelRequest(error));
    console.log('fetchSuggestions.onError: ', error)
    if (!axios.isCancel(error)) {
      dispatch(fetchTrendingTilesFail(error))
    }
  }

  if (cancelFetchRequest) {
    cancelFetchRequest()
  }
  console.log('ajax call: ', API_TRENDING_TILES_URL)
  axios
    .post(
      API_TRENDING_TILES_URL,
      {
        payload: payload,
        tile_type: type,
      },
      {
        cancelToken: new axios.CancelToken(function(c) {
          cancelFetchRequest = c
        }),
      }
    )
    .then(onSuccess)
    .catch(onError)

  mockAPI.fetchTrendingTiles(response => {
    dispatch(fetchTrendingTilesSuccess(response.data.trendingTiles));
  });
}
export const fetchTrendingTilesBegin = () => ({
  type: FETCH_TRENDING_TILES_BEGIN,
})
export const fetchTrendingTilesSuccess = trendingTiles => ({
  type: FETCH_TRENDING_TILES_SUCCESS,
  trendingTiles,
})
