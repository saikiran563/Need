/**
" * Mocking client-server processing
 */
import _profile from './userContacts.json';
import axios from 'axios';

const TIMEOUT = 500

export default {
 // fetchContactAndBilling: (cb, timeout) =>
  //  setTimeout(() => cb(_profile), timeout || TIMEOUT),
 getContactAndBillingInfo :(cb) => {
  //console.log('Ajax call working');
  axios.get("https://vzwqa3.verizonwireless.com/ui/acct/secure/data/secure/profile/contactAndBillingInfo")
    .then(response => cb(response))
     .catch(err => cb(err))
 }
}
