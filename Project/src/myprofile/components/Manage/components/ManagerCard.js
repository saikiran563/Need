import React,{ Component } from 'react'
export default ({managerInfo,isNewlyAdded}) => {
  const phoneNumber = managerInfo.phoneNumber === 'Not Applicable' ? '' : managerInfo.phoneNumber
  return(
    <div className='row owner-info-second' key={managerInfo.phoneNumber}>
       <div className='row col-xs-12 col-sm-11'>
           <h4 className='medium-text bold'>{ managerInfo.firstName.toUpperCase() } { managerInfo.lastName.toUpperCase() }</h4>
           <div className='medium-text t-1'>{phoneNumber}</div>
           <div className='medium-text t-1'>{managerInfo.emailId.toLowerCase()}</div>
       </div>
         {
           isNewlyAdded &&
           <span className='text-success fa fa-check-circle medium-text'> Added </span>
         }
    </div>
  )
}
