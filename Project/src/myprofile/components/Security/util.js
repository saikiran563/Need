import axios from 'axios'
let CQ_INFO =  {};
const URL = "https://vzwqa3.verizonwireless.com/ui/acct/";
const API_NAME =  {
   GET_CQ_INFO: "secure/account/get_cq_messages/ProfileSecurityDetails",
   GET_META_INFO: "secure/data/secure/profile/securityInfo",
   GET_BAN_PWD_INFO:"secure/data/secure/profile/bannedPasswords",  /* bannedpwd url */
   GET_QUES_INFO:"secure/data/secure/profile/activeSecretQuestions", /* activeSecretQuestions */
   SET_QUES_INFO:"secure/data/secure/profile/secretQuestion",
   SET_USER_INFO:"secure/data/secure/profile/userIdInfo",
   SET_PIN_INFO:"ao/data/ao/profile/accPinInfo",
   SET_PASSWORD_INFO:"secure/data/secure/profile/passInfo"
}

// http://www.mocky.io/v2/5b4f59783200005a009c2e92

// const D_URL = "http://www.mocky.io/v2/5b64bb432e0000063e414168"; 
// const DUMMY_API_NAME =  {
//    GET_META_INFO:"",
//    SET_USER_INFO:"",
//    SET_PIN_INFO:"",
//    GET_QUES_INFO: "",
//    GET_CQ_INFO:"",
//    GET_BAN_PWD_INFO:""
// }
export function encrypt(str){
    return btoa(str);
}
export function decrypt(str){
    return atob(str);
}

export function getURL(api) {
    return URL + API_NAME[api];
    //  return D_URL + DUMMY_API_NAME[api];
}  

function getCqData() { 
  axios.get(getURL("GET_CQ_INFO"))
    .then((response) => {
   /* response.data = {
      errorCode_5881:"validation error",
      errorCode_5883:"user name not available"
    }*/
     CQ_INFO = response.data; 
    })
     .catch((err) => {
        CQ_INFO = {}
     })
}

export  function getErrorMsgByCode(errorCode) {
    return  CQ_INFO[`errorCode_${errorCode}`];
}

getCqData();