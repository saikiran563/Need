import axios from 'axios'
import mockAPI from '../api'
import { getIsFetching } from '../reducers'

export const FETCH_SUGGESTIONS_BEGIN = 'search/FETCH_SUGGESTIONS_BEGIN'
export const FETCH_SUGGESTIONS = 'search/FETCH_SUGGESTIONS'
export const FETCH_SUGGESTIONS_SUCCESS = 'search/FETCH_SUGGESTIONS_SUCCESS'

export const API_SMART_SEARCH_URL =
  // 'http://10.119.36.94:9003/smartsearch/questions';
  //'http://10-119-9-161.ebiz.verizon.com:11336/smartsearch/questions';
  'https://vzwqa6.verizonwireless.com/smartsearch/questions'

export const fetchSuggestions = inputValue => (dispatch, getState) => {
  if (getIsFetching(getState())) {
    return
  }
  dispatch(fetchSuggestionsBegin())

  let cancelFetchRequest

  const onSuccess = response => {
    console.log('fetchSuggestions.onSuccess: ', response)
    //const json = response.data;
    //dispatch(fetchSuggestionsSuccess(json.data.suggestionList, inputValue));
    const json = response
    dispatch(fetchSuggestionsSuccess(json.data.questions, inputValue))
  }

  const onError = error => {
    //console.log('*** isCancelRequest: ', searchAPI.isCancelRequest(error));
    console.log('fetchSuggestions.onError: ', error)
    if (!axios.isCancel(error)) {
      dispatch(fetchSuggestionsFail(error))
    }
  }

  if (cancelFetchRequest) {
    cancelFetchRequest()
  }
  console.log('ajax call: ', API_SMART_SEARCH_URL, inputValue)
  axios
    .post(
      API_SMART_SEARCH_URL,
      {
        payload: inputValue,
      },
      {
        cancelToken: new axios.CancelToken(function(c) {
          cancelFetchRequest = c
        }),
      }
    )
    .then(onSuccess)
    .catch(onError)
  
  mockAPI.fetchSuggestions(response => {
    //console.log('*** mockAPI.fetchSuggestions: ', response);
    dispatch(fetchSuggestionsSuccess(response.data.suggestions));
  });
  
}
export const fetchSuggestionsBegin = () => ({
  type: FETCH_SUGGESTIONS_BEGIN,
})
export const fetchSuggestionsSuccess = suggestions => ({
  type: FETCH_SUGGESTIONS_SUCCESS,
  suggestions,
})
