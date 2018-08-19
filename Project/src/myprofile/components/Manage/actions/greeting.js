import mockProfileAPI from '../api'
import axios from 'axios'

import {
    POST_GREETING_NAME_URL
  } from '../api'

  /*Post the greeting name*/
export const POST_GREETING_NAME_BEGIN = 'POST_GREETING_NAME_BEGIN'
export const POST_GREETING_NAME_SUCCESS = 'POST_GREETING_NAME_SUCCESS'
export const POST_GREETING_NAME_FAIL = 'POST_GREETING_NAME_FAIL'

//Post greeting name.
export const postGreetingName = (payload) => dispatch => {
  dispatch(postGreetingNameBegin())
   axios.post(POST_GREETING_NAME_URL,JSON.stringify(payload),{headers: {'Content-Type':'application/json'}})
  .then(response => {
    dispatch(postGreetingNameSuccess(payload.greetingName))
  })
 .catch((error) => {
    dispatch(postGreetingNameFailed(error))
  })
}

const postGreetingNameBegin = () => ({
   type: POST_GREETING_NAME_BEGIN,
})

const postGreetingNameSuccess = (updatedGreetingName) => ({
   type: POST_GREETING_NAME_SUCCESS,
   updatedGreetingName
})

const postGreetingNameFailed = error => ({
  type: POST_GREETING_NAME_FAIL,
  error
})
