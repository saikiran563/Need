import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import Main from './components/Main'
import QuickLinks from './components/QuickLinks/QLinks'
import Security from './components/Security'
import ContactAndBilling from './components/ContactAndBilling/contactBilling';

import PrivacyAndPermissions from './components/PrivacyAndPermissions/privacyPermissions';
import UserBlock from './components/Security/UserBlock'
import LeftNav from './components/LeftNavBar/leftNav';
require('../assets/css/main.css');
class ReactRouter extends Component {   
  render() {
    return (
      <React.Fragment>
        <Main>
          <div className="main_content">
           <div id="aMyProfile" className="oneD-wrapper aMyProfile aMyProfile__landing">           
         <div className="col-md-3 menu-container">
        <LeftNav/>
        </div> 
        <div className="col-md-9 a-quicklinks">                        
          <Route exact path="/" component={QuickLinks} />
          <Route path="/security" component={Security} />
          <Route path="/userid" component={Security} />
          <Route path="/contactbilling" component={ContactAndBilling} />
          <Route path="/privacypermissions" component={PrivacyAndPermissions} />              
          </div>
          </div>
          </div>      
        </Main>
      </React.Fragment>
    )

  }
}
export default ReactRouter;

