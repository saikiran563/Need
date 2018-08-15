import React,{ Component } from 'react'
export default ({managerInfo}) => {
  return(
    <div className='row owner-info-second' key={managerInfo.phoneNumber}>
       <div className='row col-xs-12 col-sm-11'>
           <h4 className='manager-name'>{ managerInfo.firstName } { managerInfo.lastName }</h4>
           <p>{managerInfo.phoneNumber}</p>
           <p>{managerInfo.emailId}</p>
       </div>
    </div>
  )
}
