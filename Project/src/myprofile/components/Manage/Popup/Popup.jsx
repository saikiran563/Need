import React, { Component } from "react";
import RevokeAccess from  './RevokeAccess'
class Popup extends Component {
  render() {
    return (
      <div id="overlayContainer" className={this.props.showPopup ? "visible" : "hidden"}>
        <div id="overlayBackground">
          <div id="overlayFrame" className="animated fadeIn a-fast">
              {
                this.props.showCrossWires &&
                <span className="close-wrapper">
                  <a id="overlayClose" onClick={()=>{this.props.onClosePopup()}} role="button">
                    <span className="a-sr a-sr-fix" aria-hidden="false">
                      Close
                    </span>
                    <span className="a-icon-overlay-close" aria-hidden="true">
                    </span>
                  </a>
              </span>
              }
            <div>
              <div id="security-modal" className="aMyProfile aMyProfile__modal overlay-content">
                  {this.props.children}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Popup;
