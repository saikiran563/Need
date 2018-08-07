import mockProfileAPI from '../api'
import axios from 'axios'
export const FETCH_CONTACT_AND_BILLING_BEGIN = 'contacts/FETCH_CONTACT_AND_BILLING_BEGIN'
export const FETCH_CONTACT_AND_BILLING_SUCCESS = 'contacts/FETCH_CONTACT_AND_BILLING_SUCCESS'

const customHeaders = {
  
"Content-Type": "application/json",
"DoughCookie": "kjkjk",

"Authorization": "GYz2VVL++Kj5yjfGe80mazK3IH3vxU5sv8oeH/B0nVdc673VaWgzAb/BQQZyNCFaOQ+HuRzw5nxsA8ugHxFNkajuABEP+fMKkY6i+Im4DeXhtrjOe1bkaqoCPKbwkB2vZ4UoHchyzYoswIw6oCJ5g8kjqHkjcVU438chq6Gk1Tu9R+rq99jEPvl7TqROVwg1p7KWs/r7Fybc90BOD+5xDSOWYMPhiHSf0+ire9C5ZOePbLWx1bWePpZkSAfCkW2pdgEN/dy9ISF8kR2ke5NsJ84OHVzBQzC0KVjs5Dt9FLwuq7Wy5pglz60VLhlzkz5kwLCnN1UuSXHl8ckhPU8O0Q==",

"AuthToken": "GYz2VVL++Kj5yjfGe80mazK3IH3vxU5sv8oeH/B0nVdc673VaWgzAb/BQQZyNCFaOQ+HuRzw5nxsA8ugHxFNkajuABEP+fMKkY6i+Im4DeXhtrjOe1bkaqoCPKbwkB2vZ4UoHchyzYoswIw6oCJ5g8kjqHkjcVU438chq6Gk1Tu9R+rq99jEPvl7TqROVwg1p7KWs/r7Fybc90BOD+5xDSOWYMPhiHSf0+ire9C5ZOePbLWx1bWePpZkSAfCkW2pdgEN/dy9ISF8kR2ke5NsJ84OHVzBQzC0KVjs5Dt9FLwuq7Wy5pglz60VLhlzkz5kwLCnN1UuSXHl8ckhPU8O0Q==",

"ClientHeaders": {
	"client_ip": "10.191.198.160",
	"channel": "web",
	"accountNumber": "260741824-00001",
	"mdn": "8058442304",
	"role": "accountholder",
	"correlation_id": "52105127-0c02-4b83-97d7-2dda0e1f7605"
},

"Context": {
	"mCookieMap": {
		"dough": "kjkjk"
	},
	"loginContext": {
		"amAccountNumber": "260741824-00001",
		"amAH": "null",
		"amAHMTN": "null",
		"amBillerId": "null",
		"amCSRPassword": "null",
		"amCSRRole": "accountholder",
		"amCSRUserName": "test123",
		"amECPDId": "null",
		"amEmailAddress": "null",
		"amFederated": "null",
		"amFedId": "null",
		"amLastLogin": "null",
		"amLoginId": "TestUser",
		"amMobileNumber": "8058442304",
		"amMobileNumbersList": "{8058442304}",
		"amName": "Kimi",
		"amGreetingName": "null",
		"amOneVerizon": "null",
		"amProdName": "null",
		"amRole": "accountholder",
		"amServices": "null",
		"amSiteKeyRegistered": "null",
		"amSms": "null",
		"amUUID": "uuidkj",
		"amVzReward": "null",
		"smartRewardsEligible": "false",
		"companyNameFromIS": "null",
		"ECPDIdFromIS": "null",
		"CSR": "false",
		"federated": "false",
		"globalID": "",
		"homePhoneService": "false",
		"internetService": "false",
		"oneVerizon": "false",
		"registeredAH": "false",
		"site": "null",
		"requestedSessionId": "0000ZTfHTvsqau9wXWhi",
		"mfProfileLoggedIn": "true",
		"billingSystemLocation": "N",
		"siteKey": "false",
		"tvService": "false",
		"requestURI": "/gw/feeds",
		"clientIp": "10.69.84.55",
		"userAgent": "Mozilla/5.0",
		"newSession": "bw8YRva-3UDNKhKs-uFMHH9",
		"selMtn": "8058442304"
	},
	"localSessionTimedOut": "false",
	"visionErrorCode": "null",
	"visionErrorMsg": "null",
	"visionCicsErrorCode": "null",
	"securityBreachForAjax": "false",
	"securityBreach": "false",
	"isVisionServiceError": "false",
	"hasSQLException": "false",
	"sqlErrorMsg": "null",
	"sqlErrorCode": "null",
	"coherenceRefresh": "false"
},
"AM_MOBILE_NUMBER": "8968762345" , 
"AM_ROLE": "accountHolder",
"AM_UUID": "uuidkj"

}


export const fetchContactAndBilling = () => dispatch => {
  dispatch(fetchContactAndBillingBegin())

 // mockProfileAPI.fetchContactAndBilling(response => {
  //  dispatch(fetchContactAndBillingSuccess(response.data))
//})

	mockProfileAPI.getContactAndBillingInfo(response => {
		dispatch(fetchContactAndBillingSuccess(response.data))
	});
 
    //dispatch(getContactAndBillingInfo());
  
}
export const fetchContactAndBillingBegin = () => ({
  type: FETCH_CONTACT_AND_BILLING_BEGIN,
})
export const fetchContactAndBillingSuccess = contacts => ({
  type: FETCH_CONTACT_AND_BILLING_SUCCESS,
  contacts,
})

export const getContactAndBillingInfo = () => dispatch => {
  console.log('Ajax call working');
  axios.get("http://www.mocky.io/v2/5b4e000431000001405ebf1f")
    .then((response) => {
      dispatch(fetchContactAndBillingSuccess(response.data))
    })
     .catch((err) => {
        dispatch()
      })
}



