/**
 * Mocking client-server processing
 */
import _profile from './deviceTiles.json'

const TIMEOUT = 500

export default {
  fetchProfile: (cb, timeout) =>
    setTimeout(() => cb(_profile), timeout || TIMEOUT),
}
