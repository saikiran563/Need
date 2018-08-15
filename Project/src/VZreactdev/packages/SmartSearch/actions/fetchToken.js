import axios from "axios";
import mockAPI from "../api";
import { setCookie, getCookie } from "../../../util/Cookie";
import qs from "qs";

export const FETCH_TOKEN_BEGIN = "search/FETCH_TOKEN_BEGIN";
export const FETCH_TOKEN = "search/FETCH_TOKEN";
export const FETCH_TOKEN_SUCCESS = "search/FETCH_TOKEN_SUCCESS";

export const API_TOKEN_URL = reactGlobals.askVZTokenUrl
  ? reactGlobals.askVZTokenUrl
  : "/cv/cbav/secured/api/search/init";

export const fetchToken = (type, payload) => dispatch => {
  dispatch(fetchTokenBegin());
  const AV_TOKEN_COOKIE = "avToken";
  const tokenFromCookie = getCookie(AV_TOKEN_COOKIE);

  let cancelFetchRequest;

  const onSuccess = response => {
    debugger;
    //const json = response.data;
    //dispatch(fetchSuggestionsSuccess(json.data.suggestionList, inputValue));
    const json = response;
    setCookie(AV_TOKEN_COOKIE, json.data.conversationToken);
    dispatch(fetchTokenSuccess(json.data));
  };

  const onError = error => {
    /** 
    mockAPI.fetchToken(response => {
     
      dispatch(fetchTokenSuccess(response.data));
    });
    */
    if (!axios.isCancel(error)) {
      dispatch(fetchTokenFail(error));
    }
  };

  if (cancelFetchRequest) {
    cancelFetchRequest();
  }
  if (reactGlobals.discoverHubAskVZ) {
    if (tokenFromCookie) {
      let payload = {};
      payload.conversationToken = tokenFromCookie;
      dispatch(fetchTokenSuccess(payload));
    } else {
      var param = {
        section: "postpay",
        origin: "1digital",
        category: "overview",
        authentication: "true"
      };

      axios({
        url: API_TOKEN_URL,
        timeout: 20000,
        withCredentials: true,
        responseType: "json",
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-type": "application/x-www-form-urlencoded"
        },
        data: qs.stringify(param)
      })
        /**axios
    .post(
    API_TOKEN_URL,
    {
      section: "postpay",
      origin: "1digital",
      category: "overview",
      authentication: true
    },
    {
      cancelToken: new axios.CancelToken(function (c) {
          cancelFetchRequest = c;
        })
    }
    )**/
    .then(onSuccess)
    .catch(onError);
  }
  }
};
export const fetchTokenBegin = () => ({
  type: FETCH_TOKEN_BEGIN
});
export const fetchTokenSuccess = token => ({
  type: FETCH_TOKEN_SUCCESS,
  token
});
