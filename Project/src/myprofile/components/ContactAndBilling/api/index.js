/**
" * Mocking client-server processing
 */
import _profile from './userContacts.json';
import axios from 'axios';
import  { getURL } from "../../../../utils/config";

const TIMEOUT = 500

export default {
 // fetchContactAndBilling: (cb, timeout) =>
  //  setTimeout(() => cb(_profile), timeout || TIMEOUT),
 getContactAndBillingInfo :(cb) => {
  //console.log('Ajax call working');
  axios.get(getURL('GET_CD_INFO'))
    .then(response => cb(response))
     .catch(err => cb(err))
 }
}
