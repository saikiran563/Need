import axios from 'axios';


export const handleClick=(toggleState)=>({
  type:'TOGGLE_ACCORDION',
  payload:toggleState
});

export const createID=()=>({
  type:'INCREMENT_ID'
})