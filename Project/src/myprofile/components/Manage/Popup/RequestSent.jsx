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
                  Lorem ipsum consequat. Nulla dictum erat non sapien semper, id malesuada velit consectetur.
                  Lorem ipsum consequat. Nulla dictum erat non sapien semper, id malesuada velit consectetur.
                </p>
                <br />
                <p>
                  Lorem ipsum consequat. Nulla dictum erat non sapien semper, id malesuada velit consectetur.
                  Lorem ipsum consequat. Nulla dictum erat non sapien semper, id malesuada velit consectetur.
                </p>
              <div className='request-sent-close-cont'>
                  <button className="btn btn--round"  onClick={(e) =>this.props.onClosePopup()}>Close</button>
              </div>
          </div>
        )
    }
}

export default RevokeAccess
