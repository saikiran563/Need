import mockProfileAPI from '../api'
import axios from 'axios'
import  { getURL } from "../util"
export const FETCH_SECURITY_BEGIN = 'security/FETCH_SECURITY_BEGIN'
export const FETCH_SECURITY_SUCCESS = 'security/FETCH_SECURITY_SUCCESS'
export const GET_USER_INFO = 'security/GET_USER_INFO'
export const GET_USER_FAIL = 'security/GET_USER_FAIL'
export const GET_META_INFO = 'security/GET_META_INFO'
export const GET_META_FAIL = 'security/GET_META_FAIL'
export const SET_USER_INFO = 'security/SET_USER_INFO'
export const SET_USER_FAIL = 'security/SET_USER_FAIL'
export const FETCH_SECURITY_ERROR ='security/FETCH_SECURITY_ERROR'
export const SET_PIN_INFO ='security/UPDATE_PIN_INFO'
export const SET_PIN_ERROR ='security/UPDATE_PIN_ERROR'
export const GET_QUES_INFO = 'security/GET_QUES_INFO'
export const GET_QUES_FAIL = 'security/GET_QUES_FAIL'
export const SET_QUES_INFO = 'security/SET_QUES_INFO'
export const SET_QUES_FAIL = 'security/SET_QUES_FAIL'
export const SET_PASSWORD_INFO = 'security/SET_PASSWORD_INFO'
export const SET_PASSWORD_FAIL = 'security/SET_PASSWORD_FAIL'

export const fetchSecurity = () => dispatch => {
  dispatch(fetchSecurityBegin())

  mockProfileAPI.fetchSecurity(response => {
    dispatch(fetchSecuritySuccess(response.data))
  })
}
export const fetchSecurityBegin = () => ({
  type: FETCH_SECURITY_BEGIN,
})
export const fetchSecuritySuccess = securities => ({
  type: FETCH_SECURITY_SUCCESS,
  securities,
})
export const fetchSecurityError = error => ({
  type: FETCH_SECURITY_ERROR,
  error,
})
export const getUserIdSuccess = response => ({
   type: GET_USER_INFO,
   response
})
export const getUserIdError = error => ({
   type: GET_USER_FAIL,
   error
})

export const getMetaDataSuccess = response => ({
   type: GET_META_INFO,
   response
})
export const getMetaDataError = error => ({
   type: GET_META_FAIL,
   error
})

export const setUserIdSuccess = response => ({
   type: SET_USER_INFO,
   response
})
export const setUserIdError = error => ({
   type: SET_USER_FAIL,
   error
})
export const setPinSuccess = response => ({
   type: SET_PIN_INFO,
   response
})
export const setPinError = error => ({
   type: SET_PIN_FAIL,
   error
})
export const getQuestionSuccess = response => ({
   type: GET_QUES_INFO,
   response
})
export const getQuestionError = error => ({
   type: GET_QUES_FAIL,
   error
})

export const setQuestionSuccess = response => ({
   type: SET_QUES_INFO,
   response
})
export const setQuestionError = error => ({
   type: SET_QUES_FAIL,
   error
})

export const setPasswordSuccess = response => ({
  type: SET_PASSWORD_INFO,
  response
})

export const setPasswordFail = error => ({
  type: SET_PASSWORD_FAIL,
  error
})

export const setUserId = (id) => dispatch => {
    // API CAll WILL BE CALLED HERE
    var payload = JSON.stringify({"newUserName": id})     
  // axios.get(getURL("SET_USER_INFO"))
   const resp = axios.get(getURL("SET_USER_INFO"));
    resp.then((response) => {
   // console.log('set user id working');
        // console.log(response);
        response.data.userId = id;
        dispatch(setUserIdSuccess(response))   
    })
     .catch((err) => {
        dispatch(setUserIdError(err))
      })
  //  var resp = axios.post(getURL("SET_USER_INFO"),payload,{
  //       headers: {
  //           'Content-Type': 'application/json',
  //       }
  //   })
  //    resp.then((response) => {
  //      // console.log('set user id working');
  //       // console.log(response);
  //       response.data.userId = id;
  //       dispatch(setUserIdSuccess(response),payload)
  //     })
  //     .catch((err) => {
  //       dispatch(setUserIdError(err))
  //     })
}

export const getMetaData = () => dispatch => {
  axios.get(getURL("GET_META_INFO"))
    .then((response) => {
    dispatch(getMetaDataSuccess(response.data))
    })
     .catch((err) => {
        dispatch(getMetaDataError(err))
      })
}

export const getUserInfo = () => dispatch => {
  axios.get(getURL("GET_USER_INFO"))
    .then((response) => {
    dispatch(getUserIdSuccess(response.data))
    
    })
     .catch((err) => {
        dispatch(getUserIdError(err))
      })
}

export const getQuestionInfo = () => dispatch => {
  

  axios.get(getURL("GET_QUES_INFO"))
  .then(
    (response) => {
    /* response.data = {
		"questions" : [{
		                      	"Id":"33",
		                      	"Question":"What was the first live concert you attended?"
	                          	}, 
                              {
			                        "Id":"34", 
		                        	"Question":"Where did you and your spouse first meet?"
		                          }]
		                        }

      dispatch(getQuestionSuccess(response.data.questions));*/
      dispatch(getQuestionSuccess(response.questions))
    },
    (error) => {
      console.log('Questions APi failed ')
    }
  )
}

export const setQuestionInfo = (question) => dispatch => {
 // API CAll WILL BE CALLED HERE
    var payload = JSON.stringify(question)
   var resp = axios.post(getURL("SET_QUES_INFO"),payload,{
        headers: {
            'Content-Type': 'application/json',
        }
    });
      resp.then((response) => {
        dispatch(setQuestionSuccess(response))
      })
      .catch((err) => {
        dispatch(setPinError(err))
      })
}
export const setPin = (pin) => dispatch => {
    // API CAll WILL BE CALLED HERE
    var payload = JSON.stringify(pin);
                 // console.log(payload);
                  
   var resp = axios.post(getURL("SET_PIN_INFO"),payload,{
        headers: {
            'Content-Type': 'application/json',
        }
    })
      resp.then((response) => {
        dispatch(setPinSuccess(response))
      })
      .catch((err) => {
        dispatch(setPinError(err))
      })
}


export const setPassword = (passwordObject) => dispatch => {
    var payload = JSON.stringify(passwordObject)     
   var resp = axios.post(getURL("SET_PASSWORD_INFO"),payload,{
        headers: {
            'Content-Type': 'application/json',
        }
    })
     resp.then((response) => {     
        dispatch(setPasswordSuccess(response))
      })
      .catch((err) => {
        dispatch(setUserIdError(err))
      })
}