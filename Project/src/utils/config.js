import axios from 'axios';
let CQ_INFO =  {};
// For Contact
console.log("APIURL", reactGlobals.APIURL);
export const BASE_URL = reactGlobals.APIURL;
export const LOGOUT_URL = "https://login.verizonwireless.com/amserver/UI/Logout?login_again=true&targetURL=https://myaccount.verizonwireless.com/clp/login?redirect=/myv/overview/"
export const API_NAME = {
  GET_CD_INFO: "/secure/data/secure/profile/contactAndBillingInfo",
  SET_EMAIL_INFO: "/secure/data/secure/profile/emailAddress",
  SET_PHONE_INFO: "/secure/data/secure/profile/primaryPhone",
  SET_BILL_ADDR_INFO: "/secure/data/secure/profile/billingAddressInfo",
  SET_SERV_ADDR_INFO:"/secure/data/secure/profile/serviceAddressInfo",

  //For Security
  GET_CQ_INFO: "/secure/data/secure/account/get_cq_messages/ProfileErrorMessages",
  GET_META_INFO: "/secure/data/secure/profile/securityInfo",
  GET_BAN_PWD_INFO: "/secure/data/secure/profile/bannedPasswords",
  /* bannedpwd url */
  GET_QUES_INFO: "/secure/data/secure/profile/activeSecretQuestions",
  /* activeSecretQuestions */
  SET_QUES_INFO: "/secure/data/secure/profile/secretQuestion",
  SET_USER_INFO: "/secure/data/secure/profile/userIdInfo",
  SET_PIN_INFO: "/ao/data/ao/profile/accPinInfo",
  SET_PASSWORD_INFO: "/secure/data/secure/profile/passInfo",

  // SECURE PIN
  GET_SECRET_PIN_STATUS: "/secure/data/service/verifySecurePinStatus",
  GET_LIST_OF_USER_NUMBERS: "/secure/data/service/startSecurePin",
  SEND_SECURE_PIN_TO_PHONE: '/secure/data/service/sendSecurePin',
  CONFIRM_SECURE_PIN_CODE: '/secure/data/service/validateSecurePin',

  //PRIVACY AND PERMISSIONS
  GET_PRIVACY_SETTINGS: "/secure/data/secure/profile/privacyPermissions",
  POST_PRIVACY_SETTINGS: "/secure/data/secure/profile/privacyPermissions",

  //ENHANCED AUTHENTICATION
  GET_ENHANCED_AUTH: "/secure/data/ao/profile/twoFactorAuth",
  SET_ENHANCED_AUTH: "/secure/data/ao/profile/updateTwoFactorAuth"
}

// Contact & billing For local Dev

// const D_URL = "http://localhost:3000/"
// const DUMMY_API_NAME =  {
//    GET_CD_INFO: "contact",
//    SET_EMAIL_INFO: "email",
//    SET_PHONE_INFO:"primaryphone",
//    SET_BILL_ADDR_INFO:"billingaddress",
//    SET_SERV_ADDR_INFO:"serviceaddress"
// }

// Security For local Dev
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

let lastId = 0;

export const WARNING_TIMEOUT = 1000 * 60 * 12; 
export const LOGOUT_TIMEOUT = 1000 * 60 * 15;

export  function getUid(prefix='id') {
    lastId++;
    return `${prefix}${lastId}`;
}
export function encrypt(str){
    return btoa(str);
}
export function decrypt(str){
    return atob(str);
}

export function getURL(api) {
  return BASE_URL + API_NAME[api];
// return D_URL + DUMMY_API_NAME[api];
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
