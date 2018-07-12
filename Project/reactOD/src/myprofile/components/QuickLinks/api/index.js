/**
 * Mocking client-server processing
 */
import _profile from './profileTiles.json'

const TIMEOUT = 500

export default {
  fetchProfile: (cb, timeout) =>
    setTimeout(() => cb(_profile), timeout || TIMEOUT),
}
