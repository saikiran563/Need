import React from "react";

const EmailVerificationNeeded = props => {
  console.log(props);
  const buttonText = !props.verifyEmailClicked ? "Verify my email" : "Refresh";
  const refreshParagraphText = props.verifyEmailClicked ? (
    <span>
      Please check your email to confirm, then refresh, then <a style={{ padding: "0" }}>refresh this page.</a>
    </span>
  ) : (
    ""
  );
  const resendVerificationButton = !props.verifyEmailClicked ? (
    ""
  ) : (
    <button
      className="btn btn--round-invert"
      style={{ cursor: "pointer" }}
      onClick={props.verifyModal}
    >
      Re-send verification
    </button>
  );
  return (
    <div>
      <p>
        <span className="text-warning">
          <i className="fa fa-times-circle" />
        </span>
        You must have have a verified email address to use this feature. {refreshParagraphText}
      </p>
      <div className="row">
        <div className="col-xs-6 radio_table__header">Email</div>
        <div className="col-xs-3">
          <p>{props.emailAddress}</p>
        </div>
        <div className="col-xs-3">
          <p>
            <a
              href="#/contactbilling/email"
              className="btn btn-anchor"
              role="button"
            >
              Edit
            </a>
          </p>
        </div>
        <div className="footer col-xs-12">
          {resendVerificationButton}
          <button className="btn btn--round" onClick={props.verifyModal}>
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmailVerificationNeeded;
