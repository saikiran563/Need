/**
 * Mocking client-server processing
 */
import _deviceTiles from './deviceTiles.json'

const TIMEOUT = 1000

export default {
  fetchDeviceTiles: (cb, timeout) =>
    setTimeout(() => cb(_deviceTiles), timeout || TIMEOUT),
}
