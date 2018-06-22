/**
 * Mocking client-server processing
 */
import _quickUpdateTiles from './quickUpdateTilesv2.json'

const TIMEOUT = 2500

export default {
  fetchQuickUpdateTiles: (cb, timeout) =>
    setTimeout(() => cb(_quickUpdateTiles), timeout || TIMEOUT),
}
