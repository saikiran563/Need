export { fetchDeviceTiles } from './fetchProfile';
export { editemail } from './fetchProfile';

export { show_popup } from './popup';
export { close_popup } from './popup';
export {
  FETCH_PROFILE_TILES_BEGIN,
  FETCH_PROFILE_TILES_SUCCESS,
} from './fetchProfile'
export const SHOWPOPUP ="SHOWPOPUP";
export const CLOSEPOPUP ="CLOSEPOPUP";
export const EDIT_EMAIL="EDIT_EMAIL";
export const SHOW_PROFILE_TILES = 'profile/SHOW_PROFILE_TILES';
export const showDeviceTiles = () => ({
  type: SHOW_PROFILE_TILES,
})
