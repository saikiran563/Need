import React from 'react'

export default ({accountHolderInfo}) => {
  return(
    <div key={accountHolderInfo.phoneNumber}>
       <div className='row owner-info'>
           <h4 className='manager-name'>{accountHolderInfo.firstName+ ' '+ accountHolderInfo.lastName}( Account Owner )</h4>
           <p>{accountHolderInfo.phoneNumber}</p>
           <p>{accountHolderInfo.emailId}</p>
       </div>
    </div>
  )
}
