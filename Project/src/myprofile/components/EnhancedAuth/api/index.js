/**
 * Mocking client-server processing
 */
import _profile from './enhancedAuth.json'

// const TIMEOUT = 0

export default {
  fetchEnhAuthEdit: (cb, timeout) =>
    setTimeout(() => cb(_profile), timeout),
}


