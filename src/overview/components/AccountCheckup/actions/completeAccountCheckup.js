import mockAPI from '../api'

export const COMPLETE_ACCOUNT_CHECKUP_BEGIN =
  'account/COMPLETE_ACCOUNT_CHECKUP_BEGIN'
export const COMPLETE_ACCOUNT_CHECKUP = 'account/COMPLETE_ACCOUNT_CHECKUP'
export const COMPLETE_ACCOUNT_CHECKUP_SUCCESS =
  'account/COMPLETE_ACCOUNT_CHECKUP_SUCCESS'

export const completeAccountCheckup = id => dispatch => {
  dispatch(completeAccountCheckupBegin())

  mockAPI.completeAccountCheckup(id, response => {
    dispatch(completeAccountCheckupSuccess(response))
  })
}
export const completeAccountCheckupBegin = () => ({
  type: COMPLETE_ACCOUNT_CHECKUP_BEGIN,
})
/*
export const completeAccountCheckupSuccess = accountTile => ({
  type: COMPLETE_ACCOUNT_CHECKUP_SUCCESS,
  accountTile
});
*/
export const completeAccountCheckupSuccess = accountTile => {
  //console.log('completeAccountCheckupSuccess: ', accountTile);
  return {
    type: COMPLETE_ACCOUNT_CHECKUP_SUCCESS,
    accountTile,
  }
}
