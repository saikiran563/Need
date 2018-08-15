import axios from "axios";
import mockAPI from "../api";

export const FETCH_MODAL_CONTENT_BEGIN = "modal/FETCH_MODAL_CONTENT_BEGIN";
export const FETCH_MODAL_CONTENT = "modal/FETCH_MODAL_CONTENT";
export const FETCH_MODAL_CONTENT_SUCCESS = "search/FETCH_MODAL_CONTENT_SUCCESS";

export const fetchModalContent = (API_MODAL_CONTENT_URL, requestMethod, queryStringParams, type) => dispatch => {
  dispatch(fetchModalContentBegin());

  const onSuccess = response => {
    response.data.type = type;
    dispatch(fetchModalContentSuccess(response.data));
  };

  const onError = error => {
    if (!axios.isCancel(error)) {
      mockAPI.fetchModalContent(response => {
        response.data.type = type;
        dispatch(fetchModalContentSuccess(response.data));
      });
    }
  };

  if(requestMethod === 'GET') {
    axios
      .get(API_MODAL_CONTENT_URL)
      .then(onSuccess)
      .catch(onError);
  }
  else if(requestMethod === 'POST'){
    axios
      .post(API_MODAL_CONTENT_URL, queryStringParams)
      .then(onSuccess)
      .catch(onError);
  }
};

export const fetchModalContentBegin = () => ({
  type: FETCH_MODAL_CONTENT_BEGIN
});

export const fetchModalContentSuccess = data => ({
  type: FETCH_MODAL_CONTENT_SUCCESS,
  data
});
