import React from "react";
import {getUid} from "../../../utils/config"

const Modal = props => {
  const tagId = props.tagId ? props.tagId : getUid("modal");
  const showClose = !props.show;
  return (
    <div id="overlayContainer" className={props.modalStatus ? 'visible' : 'hidden'}>
      <div id="overlayBackground"></div>
      <div id="overlayFrame" className="animated fadeIn a-fast">
       { showClose &&
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
       }
        <div>
          <div id={`overlayFrame ${tagId}`} className="aMyProfile aMyProfile__modal overlay-content">
            {props.children}
          </div>
        </div>
      </div>
    </div>
  )
}
export default Modal;