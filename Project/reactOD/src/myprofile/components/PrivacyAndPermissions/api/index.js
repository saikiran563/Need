/**
 * Mocking client-server processing
 */
import _profile from './privacy.json'

const TIMEOUT = 500

export default {
  fetchPrivacyAndPermissions: (cb, timeout) =>
    setTimeout(() => cb(_profile), timeout || TIMEOUT),
}
