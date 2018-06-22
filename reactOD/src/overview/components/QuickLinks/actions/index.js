export { fetchDeviceTiles } from './fetchProfile';
export { show_popup } from './popup';
export { close_popup } from './popup';
export {
  FETCH_DEVICE_TILES_BEGIN,
  FETCH_DEVICE_TILES_SUCCESS,
} from './fetchProfile'
export const SHOWPOPUP ="SHOWPOPUP";
export const CLOSEPOPUP ="CLOSEPOPUP";
export const SHOW_DEVICE_TILES = 'devices/SHOW_DEVICE_TILES';
export const showDeviceTiles = () => ({
  type: SHOW_DEVICE_TILES,
})
