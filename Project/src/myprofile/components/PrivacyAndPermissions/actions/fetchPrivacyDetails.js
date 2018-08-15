import mockProfileAPI from "../api";
import axios from "axios";
export const FETCH_PRIVACY_AND_PERMISSIONS_BEGIN =
  "privacies/FETCH_PRIVACY_AND_PERMISSIONS_BEGIN";
export const FETCH_PRIVACY_AND_PERMISSIONS_SUCCESS =
  "privacies/FETCH_PRIVACY_AND_PERMISSIONS_SUCCESS";
export const POST_PRIVACY_PERMISSIONS = "POST_PRIVACY_PERMISSIONS";
const PRIVACY_PERMISSIONS = "PRIVACY_PERMISSIONS";

import  { getURL,encrypt, decrypt, BASE_URL, API_NAME } from "../../../../utils/config"

const customHeaders = {
  Accept: "application/json"
};
export const fetchPrivacyAndPermissions = () => dispatch => {
  // dispatch(fetchPrivacyAndPermissionsBegin())
  // mockProfileAPI.fetchPrivacyAndPermissions(response => {
  //   dispatch(fetchPrivacyAndPermissionsSuccess(response))
  // })
  // http://www.mocky.io/v2/5b6c58102f00003700893d08
  // https://vzwqa2.verizonwireless.com/ui/acct/secure/data/secure/profile/privacyPermissions
  axios.get(getURL('GET_PRIVACY_SETTINGS'))
    .then(response => {
      console.log(response);
      dispatch(fetchPrivacyAndPermissionsSuccess(response.data));
    })
    .catch((err) => {
    });
};

export const postPrivacyPermissions = privacyData => async dispatch => {
  const response = await axios.post(getURL('POST_PRIVACY_SETTINGS'),
    privacyData,
    {
      headers: {
        "Content-Type": "application/json"
      }
    }
  );
  // response.data = response.config.data;
  dispatch({
    type: POST_PRIVACY_PERMISSIONS,
    payload: privacyData
  });
};

export const fetchPrivacyAndPermissionsBegin = () => ({
  type: FETCH_PRIVACY_AND_PERMISSIONS_BEGIN
});
export const fetchPrivacyAndPermissionsSuccess = payload => ({
  type: FETCH_PRIVACY_AND_PERMISSIONS_SUCCESS,
  payload
});
