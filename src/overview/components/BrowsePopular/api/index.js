/**
 * Mocking client-server processing
 */
import _popularTiles from './popularTiles.json'

const TIMEOUT = 500

export default {
  fetchPopularTiles: (cb, timeout) =>
    setTimeout(() => cb(_popularTiles), timeout || TIMEOUT),
}
