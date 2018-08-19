import React,{ Component } from 'react'
export default ({managerInfo,isNewlyAdded}) => {
  const phoneNumber = ( managerInfo.phoneNumber === 'noLineAssigned' || managerInfo.phoneNumber === 'Not Applicable' )  ? '' : managerInfo.phoneNumber
  return(
    <div className='row owner-info-second' key={managerInfo.phoneNumber}>
       <div className='row col-xs-12 col-sm-11'>
           <h4 className='manager-name'>{ managerInfo.firstName } { managerInfo.lastName }</h4>
           <p>{phoneNumber}</p>
           <p>{managerInfo.emailId}</p>
       </div>
         {
           isNewlyAdded &&
           <span className='text-success fa fa-check-circle'> Added </span>
         }
    </div>
  )
}
