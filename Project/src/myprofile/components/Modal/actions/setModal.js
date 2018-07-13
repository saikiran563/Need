
export const SHOW_MODAL = 'modal/SHOW_MODAL'
export const HIDE_MODAL = 'modal/HIDE_MODAL'
export const SET_MODAL_CONTENT = 'modal/SET_MODAL_CONTENT'

export const showModalPopup = () => ({
  type: SHOW_MODAL,
})
export const hideModalPopup = () => ({
  type: HIDE_MODAL,
})
export const setModalContents = contents => ({
  type: SET_MODAL_CONTENT,
  contents,
})