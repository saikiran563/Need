/**
 * Mocking client-server processing
 */
import _profile from './enhancedAuth.json'

const TIMEOUT = 500

export default {
  fetchEnhancedAuth: (cb, timeout) =>
    setTimeout(() => cb(_profile), timeout || TIMEOUT),
}
