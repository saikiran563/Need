import mockProfileAPI from '../api'
import axios from 'axios'
import  { getURL,encrypt, decrypt } from "../util"
export const FETCH_SECURITY_BEGIN = 'security/FETCH_SECURITY_BEGIN'
export const FETCH_SECURITY_SUCCESS = 'security/FETCH_SECURITY_SUCCESS'
export const GET_META_INFO = 'security/GET_META_INFO'
export const GET_META_FAIL = 'security/GET_META_FAIL'
export const SET_USER_INFO = 'security/SET_USER_INFO'
export const SET_USER_FAIL = 'security/SET_USER_FAIL'
export const FETCH_SECURITY_ERROR ='security/FETCH_SECURITY_ERROR'
export const SET_PIN_INFO ='security/UPDATE_PIN_INFO'
export const SET_PIN_ERROR ='security/UPDATE_PIN_ERROR'
export const SET_QUES_INFO = 'security/SET_QUES_INFO'
export const SET_QUES_FAIL = 'security/SET_QUES_FAIL'
export const GET_QUES_INFO = 'security/GET_QUES_INFO'
export const GET_QUES_FAIL = 'security/GET_QUES_FAIL'
export const GET_BAN_PWD_INFO = 'security/GET_BAN_PWD_INFO'
export const GET_BAN_PWD_FAIL = 'security/GET_BAN_PWD_FAIL'
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
   type: SET_PIN_ERROR,
   error
})

export const getBannedListSuccess = response => ({
   type: GET_BAN_PWD_INFO,
   response
})
export const getBannedListError = error => ({
   type: GET_BAN_PWD_FAIL,
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

export const getMetaData = () => dispatch => {
  axios.get(getURL("GET_META_INFO"))
    .then((response) => {
    dispatch(getMetaDataSuccess(response.data))
    })
     .catch((err) => {
        dispatch(getMetaDataError(err))
      })
}

export const getQuestionInfo = () => dispatch => {
  

  axios.get(getURL("GET_QUES_INFO"))
  .then(
    (response) => {
    response.data = {
		"questions" : [{
		                      	"Id":"33",
		                      	"Question":"What was the first live concert you attended?"
	                          	}, 
                              {
			                        "Id":"34", 
		                        	"Question":"Where did you and your spouse first meet?"
		                          }]
		                        }

      dispatch(getQuestionSuccess(response.data.questions));
    },
    (error) => {
      console.log('Questions APi failed ')
    }
  )
}

export const getBannedPwdList = () => dispatch => {
  

  axios.get(getURL("GET_BAN_PWD_INFO"))
  .then(
    (response) => {
    response.data = {
    "bannedPasswords": [
       
        {
            "containsList": "MDAwMHwxMTExfDIyMjJ8MzMzM3w0NDQ0fDU1NTV8NjY2Nnw3Nzc3fDg4ODh8OTk5OXwxMjM0fDIwMDB8Njk2OXwxMjM2NHwwOTg3Nnw5ODc2NXw4NzY1NHw3NjU0M3w2NTQzMnw1NDMyMXwxMDIwMzB8MTEyMjMzfDEyMTIxMnwxMjMxMjN8MTIzMzIxfDEzMTMxM3wyMjIyMjJ8NjU0MzIxfDc1Mzk1MXwxMjNxd2V8MXEydzNlfDFxMnczZTRyfDFxYXoyd3N4fGFhYWFhYXxhYmNkfGFjY2Vzc3xhbmdlbHN8YXNkYXNkfGFzZGZhc2RmfGFzZGZnaHxhc2RmZ2hqa2x8YXNkZmdoamtsfGFzc2hvbGV8YXplcnR5fGJhZGJveXxiYW5hbmF8YmF0bWFufGJpZ2RhZGR5fGJpZ2RpY2t8YmlnZG9nfGJpZ3RpdHN8Yml0Y2h8Yml0ZW1lfGJsYWNrfGJsb3dqb2J8Ymxvd21lfGJsdWV8Ym9vYm9vfGJvb21lcnxib3N0b258YnVsbGRvZ3xidXR0aGVhZHxjYW1hcm98Y2FwdGFpbnxjaGVlc2V8Y2hpY2Fnb3xjaGlja2VufGNob2NvbGF0ZXxjb2ZmZWV8Y29tcGFxfGNvbXB1dGVyfGNvb2tpZXxjb3J2ZXR0ZXxjb3dib3l8ZGFsbGFzfGRpYWJsb3xkaWFtb25kfGRpY2t8ZHJhZ29ufGRyZWFtd2VhdmVyfGRyaXZlcnxlYWdsZXN8ZW50ZXJ8ZmFsY29ufGZkc2F8ZmVuZGVyfGZlcnJhcml8Zmlvc3xmaXNoaW5nfGZsb3dlcnxmb290YmFsbHxmcmVlZG9tfGdhdGV3YXl8Z2lybHN8Z29sZmVyfGd1aXRhcnxoYW1tZXJ8aGFyZGNvcmV8aGVsbG98aG9ja2V5fGhvb3RlcnN8aG9ybnl8aG91c2V8aHVudGVyfGljZW1hbnxpbnRlcm5ldHxpd2FudHV8anVuaW9yfGtpbGxlcnxrbmlnaHR8bGFrZXJzfGxldG1laW58bGl2ZXJwb29sfGxvdmV8bWFkZG9nfG1hcmluZXxtYXN0ZXJ8bWF0cml4fG1hdmVyaWNrfG1vbmV5fG1vbmtleXxtb25zdGVyfG1vcmdhbnxtdXN0YW5nfG15ZW1haWx8bmFzY2FyfG5jYzE3MDF8b3JhbmdlfHBANTV3MHJkfHBAc3N3MHJkfHBhJCR3b3JkfHBhbnRoZXJ8cGFudGllc3xwYXNzfHBhc3N3MHJkfHBhc3N3b3JkfHBlYW51dHxwZXBwZXJ8cGhvZW5peHxwbGF5ZXJ8cGxlYXNlfHBvcm58cG9yc2NoZXxwcmluY2Vzc3xwdXJwbGV8cHVzc3l8cWF6d3N4fHF3ZXJ0eXxxd2VydHl1aW9wfHJhYmJpdHxyYWlkZXJzfHJhbmdlcnxzYW1zdW1nfHNjb290ZXJ8c2VjcmV0fHNleHNleHxzZXh5fHNoYWRvd3xzaWx2ZXJ8c21va2V5fHNub29weXxzb2NjZXJ8c3Bhbmt5fHNwYXJreXxzcGlkZXJ8c3RhcndhcnN8c3RlZWxlcnN8c3VtbWVyfHN1bnNoaW5lfHN1cGVybWFufHRlbm5pc3x0ZXN0fHRodW5kZXJ8dGlnZXJzfHRpZ2dlcnx0cnVzdG5vMXx2ZXJpem9ufHZpa2luZ3x3ZWxjb21lfHdoYXRldmVyfHdpbm5lcnx3aW50ZXJ8d2l6YXJkfHhhdmllcnx4eHh4eHh8eWFtYWhhfHlhbmtlZXN8eWVsbG93fHp4Y3Zibm18YWFhYXxiYmJifGNjY2N8ZGRkZHxlZWVlfGZmZmZ8Z2dnZ3xoaGhofGlpaWl8ampqanxra2trfGxsbGx8bW1tbXxubm5ufG9vb298cHBwcHxxcXFxfHJycnJ8c3Nzc3x0dHR0fHV1dXV8dnZ2dnx3d3d3fHh4eHh8eXl5eXx6enp6"
        },
        {
            "exactList": "bmljb2xlMSF8cGF0cmljazF8cGF0cmljazJ8cGF0cmljazN8cGF0cmljazR8cGF0cmljazV8cGF0cmljazZ8cGF0cmljazd8cGF0cmljazh8cGF0cmljazl8cmljaGFyZDF8cmljaGFyZDJ8cmljaGFyZDN8cmljaGFyZDR8cmljaGFyZDV8cmljaGFyZDZ8cmljaGFyZDd8cmljaGFyZDh8cmljaGFyZDl8cm9iZXJ0ITF8cm9iZXJ0MSF8c2FtYW50aGExfHNhbWFudGhhMnxzYW1hbnRoYTN8c2FtYW50aGE0fHNhbWFudGhhNXxzYW1hbnRoYTZ8c2FtYW50aGE3fHNhbWFudGhhOHxzYW1hbnRoYTl8c3RldmVuITF8c3RldmVuMSF8dGF5bG9yITF8dGF5bG9yMSF8dGhvbWFzMSF8dGhvbWFzITF8d2lsbGlhbTF8d2lsbGlhbTJ8d2lsbGlhbTN8d2lsbGlhbTR8d2lsbGlhbTV8d2lsbGlhbTZ8d2lsbGlhbTd8d2lsbGlhbTh8d2lsbGlhbTl8d2lsbGllMSF8d2lsbGllITF8d2lsc29uITF8d2lsc29uMSF8YWxleGFuZGVyMXxhbGV4YW5kZXIyfGFsZXhhbmRlcjN8YWxleGFuZGVyNHxhbGV4YW5kZXI1fGFsZXhhbmRlcjZ8YWxleGFuZGVyN3xhbGV4YW5kZXI4fGFsZXhhbmRlcjl8YW50aG9ueTF8YW50aG9ueTJ8YW50aG9ueTN8YW50aG9ueTR8YW50aG9ueTV8YW50aG9ueTZ8YW50aG9ueTd8YW50aG9ueTh8YW50aG9ueTl8YXNobGV5ITF8YXNobGV5MSF8YXVzdGluITF8YXVzdGluMSF8YmFpbGV5MSF8YmFpbGV5ITF8YmFybmV5ITF8YmFybmV5MSF8YmFzZWJhbGwxfGJhc2ViYWxsMnxiYXNlYmFsbDN8YmFzZWJhbGw0fGJhc2ViYWxsNXxiYXNlYmFsbDZ8YmFzZWJhbGw3fGJhc2ViYWxsOHxiYXNlYmFsbDl8YnJhbmRvbjF8YnJhbmRvbjJ8YnJhbmRvbjN8YnJhbmRvbjR8YnJhbmRvbjV8YnJhbmRvbjZ8YnJhbmRvbjd8YnJhbmRvbjh8YnJhbmRvbjl8YnJhbmR5MSF8YnJhYm5keSExfGJ1c3RlcjEhfGJ1c3RlciExfGNhbWVyb24xfGNhbWVyb24yfGNhbWVyb24zfGNhbWVyb240fGNhbWVyb241fGNhbWVyb242fGNhbWVyb243fGNhbWVyb244fGNhbWVyb245fGNhcmxvczEhfGNhcmxvcyExfGNoYXJsZXMxfGNoYXJsZXMyfGNoYXJsZXMzfGNoYXJsZXM0fGNoYXJsZXM1fGNoYXJsZXM2fGNoYXJsZXM3fGNoYXJsZXM4fGNoYXJsZXM5fGNoYXJsaWUhMXxjaGFybGllMSF8Y2hlbHNlYTEhfGNoZWxzZWEhMXxjaGVzdGVyMSF8Y2hlc3RlciExfGNocmlzdG9waGVyMXxjaHJpc3RvcGhlcjJ8Y2hyaXN0b3BoZXIzfGNocmlzdG9waGVyNHxjaHJpc3RvcGhlcjV8Y2hyaXN0b3BoZXI2fGNocmlzdG9waGVyN3xjaHJpc3RvcGhlcjh8Y2hyaXN0b3BoZXI5fGRha290YTEhfGRha290YSExfGRhbmllbCExfGRhbmllbDEhfGRlbm5pczEhfGRlbm5pcyExfGVkd2FyZCExfGVkd2FyZDEhfGZ1Y2ttZTEhfGZ1Y2ttZSExfGZ1Y2t5b3UxfGZ1Y2t5b3UyfGZ1Y2t5b3UzfGZ1Y2t5b3U0fGZ1Y2t5b3U1fGZ1Y2t5b3U2fGZ1Y2t5b3U3fGZ1Y2t5b3U4fGZ1Y2t5b3U5fGdhbmRhbGYxfGdhbmRhbGYyfGdhbmRhbGYzfGdhbmRhbGY0fGdhbmRhbGY1fGdhbmRhbGY2fGdhbmRhbGY3fGdhbmRhbGY4fGdhbmRhbGY5fGdlb3JnZTEhfGdlb3JnZSExfGdpbmdlciExfGdpbmdlcjEhfGhhbm5haCExfGhhbm5haDEhfGhhcmxleSExfGhhcmxleTEhfGhlYXRoZXIxfGhlYXRoZXIyfGhlYXRoZXIzfGhlYXRoZXI0fGhlYXRoZXI1fGhlYXRoZXI2fGhlYXRoZXI3fGhlYXRoZXI4fGhlYXRoZXI5fGphY2tpZTEhfGphY2tpZSExfGphY2tzb24xfGphY2tzb24yfGphY2tzb24zfGphY2tzb240fGphY2tzb241fGphY2tzb242fGphY2tzb243fGphY2tzb244fGphY2tzb245fGplbm5pZmVyMXxqZW5uaWZlcjJ8amVubmlmZXIzfGplbm5pZmVyNHxqZW5uaWZlcjV8amVubmlmZXI2fGplbm5pZmVyN3xqZW5uaWZlcjh8amVubmlmZXI5fGplc3NpY2EhMXxqZXNzaWNhMSF8am9obnNvbjF8am9obnNvbjJ8am9obnNvbjN8am9obnNvbjR8am9obnNvbjV8am9obnNvbjZ8am9obnNvbjd8am9obnNvbjh8am9obnNvbjl8am9yZGFuITF8am9yZGFuMSF8am9zZXBoITF8am9zZXBoMSF8am9zaHVhITF8am9zaHVhMSF8anVzdGluMSF8anVzdGluITF8bWFnZ2llMSF8bWFnZ2llITF8bWFydGluITF8bWFydGluMSF8bWF0dGhldzF8bWF0dGhldzJ8bWF0dGhldzN8bWF0dGhldzR8bWF0dGhldzV8bWF0dGhldzZ8bWF0dGhldzd8bWF0dGhldzh8bWF0dGhldzl8bWVyY2VkZXMxfG1lcmNlZGVzMnxtZXJjZWRlczN8bWVyY2VkZXM0fG1lcmNlZGVzNXxtZXJjZWRlczZ8bWVyY2VkZXM3fG1lcmNlZGVzOHxtZXJjZWRlczl8bWVybGluITF8bWVybGluITF8bWljaGFlbDF8bWljaGFlbDJ8bWljaGFlbDN8bWljaGFlbDR8bWljaGFlbDV8bWljaGFlbDZ8bWljaGFlbDd8bWljaGFlbDh8bWljaGFlbDl8bWljaGVsbGUxfG1pY2hlbGxlMnxtaWNoZWxsZTN8bWljaGVsbGU0fG1pY2hlbGxlNXxtaWNoZWxsZTZ8bWljaGVsbGU3fG1pY2hlbGxlOHxtaWNoZWxsZTl8bWlja2V5ITF8bWlja2V5MSF8bWlja2V5bW91c2UxfG1pY2tleW1vdXNlMnxtaWNrZXltb3VzZTN8bWlja2V5bW91c2U0fG1pY2tleW1vdXNlNXxtaWNrZXltb3VzZTZ8bWlja2V5bW91c2U3fG1pY2tleW1vdXNlOHxtaWNrZXltb3VzZTl8bWlsbGVyMSF8bWlsbGVyITF8bmljb2xlITE="
        }
    ],
    "correlation_id": "52105127-0c02-4b83-97d7-2dda0e1f7605"
}

      var list = response.data.bannedPasswords;
      list.containsList = decrypt(list[0].containsList).split("|");
      list.exactList = decrypt(list[1].exactList).split("|");
      dispatch(getBannedListSuccess(list));
    },
    (error) => {
      console.log('Banned list  APi failed ')
    }
  )
}

export const setUserId = (id) => dispatch => {
  
  
    // API CAll WILL BE CALLED HERE
    var payload = JSON.stringify({"newUserName": id})     
  
  
   
   const resp = axios.get(getURL("SET_USER_INFO"));
    resp.then((response) => {
        
        response.data = {"statusCode":0,"correlation_id":"1ee38b25-871b-47c4-8cae-0a4705034544","jn":"10-119-13-144-myvpostpay_acctgw1"};
        response.data.userId = id;
        dispatch(setUserIdSuccess(response.data))   
    })
     .catch((err) => {
       console.log("set user ",err);
        dispatch(setUserIdError(err))
      })
      

   /*var resp = axios.post(getURL("SET_USER_INFO"),payload,{
        headers: {
            'Content-Type': 'application/json',
        }
    })
     resp.then((response) => {
       // console.log('set user id working');
        // console.log(response);
        response.data.userId = id;
        dispatch(setUserIdSuccess(response.data))
      })
      .catch((err) => {
        dispatch(setUserIdError(err))
      })*/
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
        dispatch(setQuestionSuccess(response.data))
      })
      .catch((err) => {
        dispatch(setPinError(err))
      })
}
export const setPin = (pin) => dispatch => {
    // API CAll WILL BE CALLED HERE
   var payload = JSON.stringify(pin);
   var resp = axios.post(getURL("SET_PIN_INFO"),payload,{
        headers: {
            'Content-Type': 'application/json',
        }
    })
      resp.then((response) => {
        dispatch(setPinSuccess(response.data))
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
        dispatch(setPasswordSuccess(response.data))
      })
      .catch((err) => {
        dispatch(setUserIdError(err))
      })
}