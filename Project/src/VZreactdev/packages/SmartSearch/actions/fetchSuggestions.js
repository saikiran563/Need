import axios from "axios";
import mockAPI from "../api";
import { getIsFetching } from "../reducers";

export const FETCH_SUGGESTIONS_BEGIN = "search/FETCH_SUGGESTIONS_BEGIN";
export const FETCH_SUGGESTIONS = "search/FETCH_SUGGESTIONS";
export const FETCH_SUGGESTIONS_SUCCESS = "search/FETCH_SUGGESTIONS_SUCCESS";

export const API_SMART_SEARCH_URL = reactGlobals.oneSearchSuggestionUrl
  ? reactGlobals.oneSearchSuggestionUrl
  : "/onesearch/typeahead?q=<keyword>&source=myv";

const changeSuggestionListFormat = list => {
  return list.map((obj, i) => {
    return obj.name;
  });
};
export const fetchSuggestions = inputValue => (dispatch, getState) => {
  if (getIsFetching(getState())) {
    return;
  }
  dispatch(fetchSuggestionsBegin());

  let cancelFetchRequest;

  const onSuccess = response => {
    //const json = response.data;
    //dispatch(fetchSuggestionsSuccess(json.data.suggestionList, inputValue));
    const json = response;
    dispatch(
      fetchSuggestionsSuccess(
        changeSuggestionListFormat(
          json.data.typeAheadSummary.TypeAheadSuggestedTerms.slice(0, 4)
        ),
        inputValue
      )
    );
  };

  const onError = error => {
    //console.log('*** isCancelRequest: ', searchAPI.isCancelRequest(error));
    /** 
    mockAPI.fetchSuggestions(response => {
      dispatch(
        fetchSuggestionsSuccess(
          changeSuggestionListFormat(
            response.data.typeAheadSummary.TypeAheadSuggestedTerms
          )
        )
      );
    });
**/
    if (!axios.isCancel(error)) {
      dispatch(fetchSuggestionsFail(error));
    }
  };

  if (cancelFetchRequest) {
    cancelFetchRequest();
  }

  let api_smart_search_url = API_SMART_SEARCH_URL.replace(
    /<keyword>/,
    inputValue
  );

  axios
    .get(
      api_smart_search_url,
      {},
      {
        cancelToken: new axios.CancelToken(function(c) {
          cancelFetchRequest = c;
        })
      }
    )
    .then(onSuccess)
    .catch(onError);
  /** 
  mockAPI.fetchSuggestions(response => {
    dispatch(
      fetchSuggestionsSuccess(
        changeSuggestionListFormat(
          response.data.typeAheadSummary.TypeAheadSuggestedTerms
        )
      )
    );
  });
  */
};
export const fetchSuggestionsBegin = () => ({
  type: FETCH_SUGGESTIONS_BEGIN
});
export const fetchSuggestionsSuccess = suggestions => ({
  type: FETCH_SUGGESTIONS_SUCCESS,
  suggestions
});
