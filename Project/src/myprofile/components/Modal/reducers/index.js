
import {
  createReducer,
  updateObject,
  updateItemInArray,
} from '../../../../utils/reducer';

import {
  SHOW_MODAL,
  HIDE_MODAL,
  SET_MODAL_CONTENT
} from '../actions/setModal'

const initialState = {
  showModal : false,
  modalContent : {
      header: '',
      error: '',
      addressEntered: {
                 address : "",
                 apartment: "",
                 city: "",
                 state: "",
                 zip: ""
      },
      addressSuggessions: [
        {
                      address : "",
                      apartment: "",
                      city: "",
                      state: "",
                      zip: ""
        }
      ]
  }
}

const showModal = (state, action) => {
  return updateObject(state, { showModal: true })
}

const hideModal = (state, action) => {
  return updateObject(state, { showModal: false })
}

const setModalContent = (state, action) => {
  return updateObject(state, {
    modalContent: action.contents,
  })
}

const modalReducer = (state = initialState, action) => {
  const { type } = action
  switch (type) {
    case SHOW_MODAL:
      return showModal(state, action)
    case HIDE_MODAL:
      return hideModal(state, action)
    case SET_MODAL_CONTENT:
      return setModalContent(state, action)
    default:
      return state
  }
}


export default modalReducer
