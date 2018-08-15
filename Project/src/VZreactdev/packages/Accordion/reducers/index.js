
const initialState = {
    open: false,
    idNum:0
};

export default function (state = initialState, action) {    
    switch (action.type) {
    case 'TOGGLE_ACCORDION': {
        console.log(action.payload);
        return Object.assign({}, state, {
            open: action.payload
        });
    }
    case 'INCREMENT_ID':{
        return Object.assign({},state,{
            idNum:state.idNum+1
        })
    }
    default:
      return state;
  }
}

