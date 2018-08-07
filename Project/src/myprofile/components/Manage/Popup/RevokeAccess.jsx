import React, { Component } from 'react';


class RevokeAccess extends Component {
    render() {
        return (
          <div className="modal_content">
              <span className='revoke-popup-heading'>
                Are you sure you want to remove this account Manager ?
              </span>
              <br aria-hidden="true" />
              <br aria-hidden="true" />
              <div className='revoke-popup-seperator'/>
              <div className='revoke-popup-body'>
                <p>
                  Lorem Ipusum Lorem Ipusum Lorem Ipusum Lorem Ipusum Lorem Ipusum Lorem Ipusum Lorem Ipusum Lorem Ipusum Lorem Ipusum Lorem Ipusum Lorem Ipusum Lorem Ipusum Lorem Ipusum Lorem Ipusum Lorem Ipusum Lorem Ipusum
                </p>
              </div>
              <div className='flex'>
                  <div className='cancel-cont'>
                    <button className="btn btn--round-invert"  onClick={(e) =>this.props.onClosePopup()}>Cancel</button>
                  </div>
                  <div>
                    <button className="btn btn--round"  onClick={(e) =>this.props.handleRevokeAccess()}>Revoke Access</button>
                  </div>
              </div>
          </div>
        )
    }
}

export default RevokeAccess
