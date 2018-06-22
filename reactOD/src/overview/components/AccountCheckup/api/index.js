/**
 * Mocking client-server processing
 */
import _accountTiles from './accountTiles.json'

import _completeCheckup from './completeCheckup.json'

const TIMEOUT = 500

export default {
  fetchAccountTiles: (cb, timeout) =>
    setTimeout(
      () => cb(_accountTiles),
      10000
    ) /* 10 sec to simulate a slow API response */,

  completeAccountCheckup: (tile, cb, timeout) =>
    setTimeout(
      () => cb(_completeCheckup.data[tile.checkupId || tile.id]),
      timeout || TIMEOUT
    ),
}
