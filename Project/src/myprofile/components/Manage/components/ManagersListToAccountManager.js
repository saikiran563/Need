import React,{ Component } from 'react'
const COUNT_OF_MANAGERS_TO_SHOW_ON_PEAK_VIEW = 2
import AccountHolderCard from './AccountHolderCard'
import ManagerCard from './ManagerCard'

class ManagersListToAccountManager extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLearnMoreSelected: false
    }
  }

  toggleLearnMore() {
    this.setState({
      isLearnMoreSelected: !this.state.isLearnMoreSelected
    })
  }

  render(){
    const { managers } = this.props
    const { isLearnMoreSelected } = this.state
    let peekManagers = []
    managers.forEach((eachManager, index) => {
        if( index  <  COUNT_OF_MANAGERS_TO_SHOW_ON_PEAK_VIEW ) {
          peekManagers.push(eachManager)
        }
    })
    if(isLearnMoreSelected){
      return(
        <div>
          {
            managers.map( eachManager => {
              return eachManager.role === 'accountHolder' ?
              <AccountHolderCard accountHolderInfo={eachManager}/> :
              <ManagerCard managerInfo={eachManager}/>
            })
          }
          <div className='row'>
              <div className='col-md-8'/>
              <div className='col-md-4'>
                  <button className='btn btn--round' onClick={()=>this.toggleLearnMore()}>Hide</button>
              </div>
          </div>
        </div>
      )
    }
    return(
      <div>
        {
          peekManagers.map( eachManager => {
            return eachManager.role === 'accountHolder' ?
            <AccountHolderCard accountHolderInfo={eachManager}/> :
            <ManagerCard managerInfo={eachManager}/>
          })
        }
        <div className='row'>
            <div className='col-md-8'/>
            <div className='col-md-4'>
                <button className='btn btn--round' onClick={()=>this.toggleLearnMore()}>Learn More</button>
            </div>
        </div>
      </div>
    )
  }
}

export default ManagersListToAccountManager
