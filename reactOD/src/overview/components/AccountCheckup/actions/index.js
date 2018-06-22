export {
  FETCH_ACCOUNT_TILES_BEGIN,
  FETCH_ACCOUNT_TILES_SUCCESS,
} from './fetchAccountTiles'
export { fetchAccountTiles } from './fetchAccountTiles'

export {
  COMPLETE_ACCOUNT_CHECKUP_BEGIN,
  COMPLETE_ACCOUNT_CHECKUP_SUCCESS,
} from './completeAccountCheckup'
export { completeAccountCheckup } from './completeAccountCheckup'

export const SHOW_ACCOUNT_TILES = 'account/SHOW_ACCOUNT_TILES'
export const showAccountTiles = () => ({
  type: SHOW_ACCOUNT_TILES,
})
