import React, { Component } from 'react';


class RevokeAccess extends Component {
    render() {
        return (
          <div className="modal_content">
            <p>
              <strong>
                Are you sure you want to remove account Manager Access.
              </strong>
              <br aria-hidden="true" />
              <br aria-hidden="true" />
                <p>
                  Lorem Ipusum Lorem Ipusum Lorem Ipusum Lorem Ipusum Lorem Ipusum Lorem Ipusum Lorem Ipusum Lorem Ipusum Lorem Ipusum Lorem Ipusum Lorem Ipusum Lorem Ipusum Lorem Ipusum Lorem Ipusum Lorem Ipusum Lorem Ipusum 
                </p>
              <div>
                  <a>Learn More</a>
                  <button className="btn btn--round"  onClick={(e) =>this.props.handleRevokeAccess()}>Revoke Access</button>
              </div>
            </p>
          </div>
        )
    }
}

export default RevokeAccess
