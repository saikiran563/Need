import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import Main from './components/Main'
import Overview from './components/QuickLinks'
import Security from './components/Security'
import ContactAndBilling from './components/contactandbilling';

import UserBlock from './components/Security/UserBlock'
import LeftContent from './components/QuickLinks/LeftContent';
require('../assets/css/main.css');
class ReactRouter extends Component {   
  render() {
    return (
      <React.Fragment>
        <Main>
          <div className="main_content">
           <div id="aMyProfile" className="oneD-wrapper aMyProfile aMyProfile__landing">           
         <div className="col-md-3 menu-container">
        <LeftContent/>
        </div> 
        <div className="col-md-9 a-quicklinks">                 
          <Route exact path="/" component={Overview} />
          <Route path="/security" component={Security} />
          <Route path="/userid" component={Security} />
          <Route path="/contactandbilling" component={ContactAndBilling} />
          </div>
          </div>
          </div>      
        </Main>
      </React.Fragment>
    )

  }
}
export default ReactRouter;

