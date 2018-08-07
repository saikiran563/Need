//For PROD
const BASE_URL = "https://vzwqa3.verizonwireless.com/ui/acct/";
const API_NAME =  {
   GET_CD_INFO: "secure/data/secure/profile/contactAndBillingInfo",
   SET_EMAIL_INFO: "secure/data/secure/profile/emailAddress",
   SET_PHONE_INFO:"secure/data/secure/profile/primaryPhone",
   SET_BILL_ADDR_INFO:"secure/data/secure/profile/billingAddressInfo",
//    SET_SERV_ADDR_INFO:"serviceaddress"
}

// // For local Dev
// const BASE_URL = "http://localhost:3000/"
// const API_NAME =  {
//    GET_CD_INFO: "contact",
//    SET_EMAIL_INFO: "email",
//    SET_PHONE_INFO:"primaryphone",
//    SET_BILL_ADDR_INFO:"billingaddress",
//    SET_SERV_ADDR_INFO:"serviceaddress"

// }

export function getURL(api) {
     return BASE_URL + API_NAME[api];
}  

 