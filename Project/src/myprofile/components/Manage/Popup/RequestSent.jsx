import React, { Component } from 'react';


class RevokeAccess extends Component {
    render() {
        return (
          <div className="modal_content">
              <strong>
                Account Manager Access Request Sent
              </strong>
              <br aria-hidden="true" />
              <br aria-hidden="true" />
                <p>
                Your request to become an Account Manager is now with the Account Owner for approval. If accepted, you’ll get an email with next steps.
                </p>
                <br />

              <div className='request-sent-close-cont'>
                  <button className="btn btn--round"  onClick={(e) =>this.props.onClosePopup()}>Close</button>
              </div>
          </div>
        )
    }
}

export default RevokeAccess
