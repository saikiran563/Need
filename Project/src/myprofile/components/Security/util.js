
const URL = "https://vzwqa3.verizonwireless.com/ui/acct/";
const API_NAME =  {
   GET_META_INFO: "secure/data/secure/profile/securityInfo",
   SET_USER_INFO:"secure/data/secure/profile/userIdInfo",
   SET_PIN_INFO:"ao/data/ao/profile/accPinInfo",
   GET_QUES_INFO:"secure/data/secure/profile/activeSecretQuestions",
   SET_QUES_INFO:"secure/data/secure/profile/secretQuestion",
   SET_PASSWORD_INFO:"secure/data/secure/profile/passInfo"
}

// const D_URL = "http://www.mocky.io/v2/5b4f59783200005a009c2e92"; 
// const DUMMY_API_NAME =  {
//    GET_USER_INFO: "",
//    GET_META_INFO:"",
//    SET_USER_INFO:"",
//    SET_PIN_INFO:"",
//    GET_QUES_INFO: ""
// }
export function getURL(api) {
     return URL + API_NAME[api];
    //  return D_URL + DUMMY_API_NAME[api];
}  

