import axios from 'axios'
import mockAPI from '../api'

export const FETCH_ANSWER_TILES_BEGIN = 'search/FETCH_ANSWERS_BEGIN'
export const FETCH_ANSWERS = 'search/FETCH_TRENDING'
export const FETCH_ANSWER_TILES_SUCCESS = 'search/FETCH_ANSWERS_SUCCESS'

export const API_ANSWERS_URL =
  'https://vzwqa6.verizonwireless.com/smartsearch/answers'

export const fetchAnswers = (type, payload) => dispatch => {
  dispatch(fetchAnswersBegin())

  let cancelFetchRequest

  const onSuccess = response => {
    console.log('fetchAnswers.onSuccess: ', response)
    //const json = response.data;
    //dispatch(fetchSuggestionsSuccess(json.data.suggestionList, inputValue));
    const json = response
    dispatch(fetchAnswersSuccess(json.data))
  }

  const onError = error => {
    //console.log('*** isCancelRequest: ', searchAPI.isCancelRequest(error));
    console.log('fetchSuggestions.onError: ', error)
    mockAPI.fetchAnswers(response => {
      dispatch(fetchAnswersSuccess(response.data.answerTiles));
    });
    if (!axios.isCancel(error)) {
      dispatch(fetchAnswersFail(error))
    }
  }

  if (cancelFetchRequest) {
    cancelFetchRequest()
  }
  console.log('ajax call: ', API_ANSWERS_URL)
  axios
    .post(
    API_ANSWERS_URL,
    {
      payload: payload,
      tile_type: type,
    },
    {
      cancelToken: new axios.CancelToken(function (c) {
        cancelFetchRequest = c
      }),
    }
    )
    .then(onSuccess)
    .catch(onError)
}
export const fetchAnswersBegin = () => ({
  type: FETCH_ANSWER_TILES_BEGIN,
})
export const fetchAnswersSuccess = answerTiles => ({
  type: FETCH_ANSWER_TILES_SUCCESS,
  answerTiles,
})
