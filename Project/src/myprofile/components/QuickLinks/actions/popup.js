export const showpopupaction = (data) => ({
  type: "SHOWPOPUP",
  data
  
})
export const closepopupaction = (data) => ({
  type: "CLOSEPOPUP"

})
export const show_popup = (data) => dispatch => {
  dispatch(showpopupaction(data));
}

export const close_popup = (data) => dispatch => {
  dispatch(closepopupaction(data));
}