import axios from 'axios';


export const menuPlacementUpdate=menuPlacement=>({
  type:'UPDATE_MENU_PLACEMENT',
  payload:menuPlacement
});

export const updateMenuPlacement=(menuPlacement)=>dispatch=>{
  dispatch(menuPlacementUpdate(menuPlacement))
};
