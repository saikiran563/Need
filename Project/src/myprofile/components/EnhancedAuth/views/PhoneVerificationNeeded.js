import React from "react";

const PhoneVerificationNeeded = props => {
  return (
    <div>
      <p>
        <span className="text-warning">
          <i className="fa fa-times-circle" />
        </span> The Account Owner's device must be to receive text messages in order to
        use this feature.
      </p>
      <div className="row">
        <div className="col-xs-6 radio_table__header">Text Message</div>
        <div className="col-xs-3">
          <p>{props.mobileNumber}</p>
        </div>
        <div className="footer col-xs-12">
          <a
            className="btn btn--round-invert"
            role="button"
            onClick={() => props.handleEditCancel("cancelblock")}
          >
            Cancel
          </a>
          <a href="/vzw/browse/devicechange/home.jsp"><button className="btn btn--round">Change Device</button></a>
        </div>
      </div>
    </div>
  );
};

export default PhoneVerificationNeeded;
