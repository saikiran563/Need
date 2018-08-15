
const initialState = {
    menuPlacement:"bottom"
};

export default function (state = initialState, action) {    
    switch (action.type) {
    case 'UPDATE_MENU_PLACEMENT':{
        return Object.assign({},state,{
            menuPlacement:action.payload
        })
    }
    default:
      return state;
  }
}

