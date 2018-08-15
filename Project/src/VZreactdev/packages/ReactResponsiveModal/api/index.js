/**
 * Mocking client-server processing
 */
import _modalContent from './modalContent.json'

const TIMEOUT = 2500

export default {
  fetchModalContent: (cb, timeout) =>
    setTimeout(() => cb(_modalContent), timeout || TIMEOUT),
}
