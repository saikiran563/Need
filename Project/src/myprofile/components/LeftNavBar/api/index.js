/**
 * Mocking client-server processing
 */
import _profile from './leftNav.json'

const TIMEOUT = 0

export default {
  fetchLeftNav: (cb, timeout) =>
    setTimeout(() => cb(_profile), timeout || TIMEOUT),
}
