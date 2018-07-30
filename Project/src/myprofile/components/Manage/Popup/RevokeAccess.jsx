import React, { Component } from 'react';


class RevokeAccess extends Component {
    render() {
        return (
          <div className="modal_content">
              <strong>
                Are you sure you want to remove account Manager Access.
              </strong>
              <br aria-hidden="true" />
              <br aria-hidden="true" />
                <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas rutrum in erat vel
                consequat. Nulla dictum erat non sapien semper, id malesuada velit consectetur.
                </p>
                <p>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas rutrum in erat vel
                consequat. Nulla dictum erat non sapien semper, id malesuada velit consectetur.
                </p>
              <div>
                  <a>Learn More</a>
                  <button className="btn btn--round"  onClick={(e) =>this.props.handleRevokeAccess()}>Revoke Access</button>
              </div>
          </div>
        )
    }
}

export default RevokeAccess
