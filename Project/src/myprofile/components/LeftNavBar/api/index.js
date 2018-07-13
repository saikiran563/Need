/**
 * Mocking client-server processing
 */
import _profile from './leftNav.json'

const TIMEOUT = 500

export default {
  fetchLeftNav: (cb, timeout) =>
    setTimeout(() => cb(_profile), timeout || TIMEOUT),
}
