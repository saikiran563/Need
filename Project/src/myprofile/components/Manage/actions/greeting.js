import mockProfileAPI from '../api'
import axios from 'axios'

import {
    POST_GREETING_NAME_URL
  } from '../api'

  /*Post the greeting name*/
export const POST_GREETING_NAME_BEGIN = 'POST_GREETING_NAME_BEGIN'
export const POST_GREETING_NAME_SUCCESS = 'POST_GREETING_NAME_SUCCESS'
export const POST_GREETING_NAME_FAIL = 'POST_GREETING_NAME_FAIL'

//Post greeting name
export const postGreetingName = (payload) => dispatch => {
  dispatch(postGreetingNameBegin())
  axios({
    method: 'POST',
    url: POST_GREETING_NAME_URL,
    data: payload,
    })
  .then(response => {
    dispatch(postGreetingNameSuccess())
  })
 .catch((error) => {
    dispatch(postGreetingNameFailed(error))
  })
}

const postGreetingNameBegin = () => ({
   type: POST_GREETING_NAME_BEGIN,
})

const postGreetingNameSuccess = response => ({
   type: POST_GREETING_NAME_SUCCESS,
   response
})

const postGreetingNameFailed = error => ({
  type: POST_GREETING_NAME_FAIL,
  error
})
