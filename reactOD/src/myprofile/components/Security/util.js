
const URL = "http://148.132.118.159:9088/gw/acct/";
const API_NAME =  {
   GET_USER_INFO: "secure/profile/securityInfo",
   SET_USER_INFO:"secure/profile/userIdInfo",
   SET_PIN_INFO:"ao/profile/accPinInfo"
}

const D_URL = "https://jsonplaceholder.typicode.com/"; 
const DUMMY_API_NAME =  {
   GET_USER_INFO: "posts/1",
   SET_USER_INFO:"secure/profile/userIdInfo",
   SET_PIN_INFO:"ao/profile/accPinInfo"
}
export function getURL(api) {
    // return URL + API_NAME[api];
     return D_URL + DUMMY_API_NAME[api];
}  
