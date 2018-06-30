/**
 * Mocking client-server processing
 */
import _profile from './userContacts.json'

const TIMEOUT = 500

export default {
  fetchContactAndBilling: (cb, timeout) =>
    setTimeout(() => cb(_profile), timeout || TIMEOUT),
}
