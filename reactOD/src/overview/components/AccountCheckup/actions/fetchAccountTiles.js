import mockAPI from '../api'

export const FETCH_ACCOUNT_TILES_BEGIN = 'account/FETCH_ACCOUNT_TILES_BEGIN'
export const FETCH_ACCOUNT_TILES = 'account/FETCH_ACCOUNT_TILES'
export const FETCH_ACCOUNT_TILES_SUCCESS = 'account/FETCH_ACCOUNT_TILES_SUCCESS'

export const fetchAccountTiles = () => dispatch => {
  //console.log('fetchAccountTiles');
  dispatch(fetchAccountTilesBegin())

  mockAPI.fetchAccountTiles(response => {
    //console.log('mockAPI.fetchAccountTiles: ', response)
    dispatch(fetchAccountTilesSuccess(response.data.accountTiles))
  })
}
export const fetchAccountTilesBegin = () => ({
  type: FETCH_ACCOUNT_TILES_BEGIN,
})
export const fetchAccountTilesSuccess = accountTiles => ({
  type: FETCH_ACCOUNT_TILES_SUCCESS,
  accountTiles,
})
