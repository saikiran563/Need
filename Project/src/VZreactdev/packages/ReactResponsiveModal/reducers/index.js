import {
    FETCH_MODAL_CONTENT_BEGIN,
  FETCH_MODAL_CONTENT_SUCCESS
} from "../actions/fetchModalContent";
  
  import {
    createReducer,
    updateObject,
  updateItemInArray
} from "../../../util/reducer";
  
  const initialState = {
    modalContent: [{}],
  isFetching: true
};
  
  const fetchModalContentBegin = (state, action) => {
  return updateObject(state, { isFetching: true });
};
  
  const fetchModalContentSuccess = (state, action) => {
    return updateObject(state, {
      isFetching: false,
    modalContent: action.data
  });
};
  
  const modalContentReducer = (state = initialState, action) => {
  const { type } = action;
    switch (type) {
      case FETCH_MODAL_CONTENT_BEGIN:
      return fetchModalContentBegin(state, action);
      case FETCH_MODAL_CONTENT_SUCCESS:
      return fetchModalContentSuccess(state, action);
      default:
      return state;
    }
};
  
export default modalContentReducer;
  