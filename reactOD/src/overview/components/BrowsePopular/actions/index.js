export { fetchPopularTiles } from './fetchPopularTiles'
export {
  FETCH_POPULAR_TILES_BEGIN,
  FETCH_POPULAR_TILES_SUCCESS,
} from './fetchPopularTiles'

export const SHOW_POPULAR_TILES = 'devices/SHOW_POPULAR_TILES'
export const showPopularTiles = () => ({
  type: SHOW_POPULAR_TILES,
})
