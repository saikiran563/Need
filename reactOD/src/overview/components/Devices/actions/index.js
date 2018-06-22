export { fetchDeviceTiles } from './fetchDeviceTiles'
export {
  FETCH_DEVICE_TILES_BEGIN,
  FETCH_DEVICE_TILES_SUCCESS,
} from './fetchDeviceTiles'

export const SHOW_DEVICE_TILES = 'devices/SHOW_DEVICE_TILES'
export const showDeviceTiles = () => ({
  type: SHOW_DEVICE_TILES,
})
