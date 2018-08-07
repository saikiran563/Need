import React from "react";

const Modal = props => {
  return (
    <div id="overlayContainer" className={props.modalStatus ? 'visible' : 'hidden'}>
      <div id="overlayBackground"></div>
      <div id="overlayFrame" className="animated fadeIn a-fast">
        <span className="close-wrapper">
          <a 
            id="overlayClose"
            style={{ textDecoration: "none" }} 
            onClick={props.closeModal} 
            role="button">
            <span className="a-sr a-sr-fix" aria-hidden="false">Close</span>
            <span className="a-icon-overlay-close" aria-hidden="true"></span>
          </a>
        </span>
        <div>
          <div id="security-modal" className="aMyProfile aMyProfile__modal overlay-content">
            {props.children}
          </div>
        </div>
      </div>
    </div>
  )
}
export default Modal;