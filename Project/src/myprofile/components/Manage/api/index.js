/**
 * Mocking client-server processing
 */
import _profile from './profile.json'

const TIMEOUT = 500

export default {
  fetchSecurity: (cb, timeout) =>
    setTimeout(() => cb(_profile), timeout || TIMEOUT),
}
