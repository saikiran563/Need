import React, { Component } from "react";
import styled, { css } from "styled-components";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Modal from "react-responsive-modal";

import Button from "../Button/Button";
import BarGraph from "../Graph/BarGraph";
import { media } from "../../util/style";
import VzwBarChart from "../Graph/BarChart";
import * as actions from "../ReactResponsiveModal/actions";
import "./Modal.css";

class TileFooter extends Component {
  static defaultProps = {
    modalResponse: true,
    purchase: false
  }

  state = {
    openGetMoreDataModal: false,
    openEnableSafetyModeModal: false,
    openPurchaseDataBoostModal: false,
    openConfirmationSucccessModal: false
  };

  onClickEnableSafetyMode = encryptedMtn => {
    if(reactGlobals.modal && reactGlobals.modal.enableSafetyMode){
    this.props.actions.fetchModalContent(
      reactGlobals.modal.enableSafetyMode.buttons[0].buttonLink,
      "POST",
      { mdn: encryptedMtn, safModeToggleAction: "enable" },
      "enableSafety"
    );
    }
  };

  onCloseEnableSafetyModeModal = () => {
    this.setState({ openEnableSafetyModeModal: false });
  };

  onExitedEnableSafetyModeModal = () => {
    this.setState({ openEnableSafetyModeModal: false });
  };

  onOpenEnableSafetyModeModal = () => {
    this.setState({ openEnableSafetyModeModal: true });
  };

  onClickPurchaseDataBoost = () => {
    this.setState({
      openGetMoreDataModal: false,
      openPurchaseDataBoostModal: true
    });
  };

  onCloseGetMoreDataModal = () => {
    this.setState({ openGetMoreDataModal: false });
  };

  onExitedGetMoreDataModal = () => {
    this.setState({ openGetMoreDataModal: false });
  };

  onOpenGetMoreDataModal = () => {
    this.setState({ openGetMoreDataModal: true });
  };

  onClickConfirmPurchase = (encryptedMtn) => {
    if(reactGlobals.modal && reactGlobals.modal.purchaseDataBoost){
      this.props.actions.fetchModalContent(reactGlobals.modal.purchaseDataBoost.buttons[0].buttonLink, "POST", {mdn: encryptedMtn}, "purchase");
      this.setState({ openConfirmationSucccessModal: true});
    }
  }

  onClosePurchaseDataBoostModal = () => {
    this.setState({ openPurchaseDataBoostModal: false });
  };

  onExitedPurchaseDataBoostModal = () => {
    this.setState({ openPurchaseDataBoostModal: false });
  };

  onOpenPurchaseDataBoostModal = () => {
    this.setState({
      openGetMoreDataModal: false,
      openPurchaseDataBoostModal: true
    });
  };

  onCloseConfirmationSucccessModal = () => {
    this.setState({ openConfirmationSucccessModal: false });
  };

  onClickConfirmationOk = () => {
    this.setState({ openConfirmationSucccessModal: false });
  };

  render() {
    const {
      ctaBtn,
      ctaBtn2,
      image,
      video,
      fullscreenImage,
      ctaClick,
      alertMode,
      barValue,
      barBaseValue,
      barLabelText,
      barValueExplain,
      contractType,
      graphBarColor,
      siteCatPerContentImp,
      headline,
      inverted,
      device,
      deviceSubheaderMTN,
      deviceHorizontalRule,
      hidealldeviceCAT,
      upgradeUrl,
      upgradeEligible,
      byodDevice,
      background,
      type,
      barChartData,
      barLabelPrefix,
      barChartHeight,
      encryptedMtn
    } = this.props;

    const CATcomp = !ctaBtn ? (
      device ? (
        <a href={ctaClick}>
          <Button
            kind={Button.BUTTON_TYPE.CHEVRON_CTA}
            inverted={alertMode || inverted}
            aria-label={headline}
            siteCatPerContentImp={siteCatPerContentImp}
            device={device}
            deviceSubheaderMTN={deviceSubheaderMTN}
            deviceHorizontalRule={deviceHorizontalRule}
            hidealldeviceCAT={hidealldeviceCAT}
            role={"link"}
            id={
              device
                ? deviceSubheaderMTN
                  ? null
                  : deviceHorizontalRule
                    ? null
                    : "device-ctn"
                : null
            }
          />
        </a>
      ) : (
        <Button
          onClick={ctaClick}
          kind={Button.BUTTON_TYPE.CHEVRON_CTA}
          inverted={alertMode || inverted}
          aria-label={headline}
           background={background}
          siteCatPerContentImp={siteCatPerContentImp}
          hidealldeviceCAT={hidealldeviceCAT}
          role={"link"}
        />
      )
    ) : (
      <Button
        onClick={() => {
          if (_.has(ctaBtn, "buttonLink")) {
            window.location.href = _.get(ctaBtn, "buttonLink");
          }
        }}
        kind={Button.BUTTON_TYPE.PRIMARY}
        inverted={ctaBtn.buttonType === "background-white" ? true : false}
        background={background}
        type={"LIVE_TILE"}
        siteCatPerContentImp={siteCatPerContentImp}
      >
        {ctaBtn.buttonText}
      </Button>
    );
    let CTAModal1 =
      ctaBtn &&
      reactGlobals.modal &&
      reactGlobals.modal && reactGlobals.modal.enableSafetyMode &&
      ctaBtn.buttonLink === reactGlobals.modal.enableSafetyMode.buttonLink ? (
        <Button
          kind={Button.BUTTON_TYPE.PRIMARY}
          inverted={ctaBtn.buttonType === "background-white" ? true : false}
          background={background}
          onClick={this.onOpenEnableSafetyModeModal}
          type={"LIVE_TILE"}
          disabled={!this.props.modalResponse && !this.openEnableSafetyModeModal}
        >
          {this.props.modalResponse ? ctaBtn.buttonText : 'Safety Mode in Progress'}
        </Button>
      ) : null;

    CTAModal1 =
      ctaBtn &&
      reactGlobals.modal &&
      reactGlobals.modal.getMoreData &&
      ctaBtn.buttonLink === reactGlobals.modal.getMoreData.buttonLink ? (
        <Button
          kind={Button.BUTTON_TYPE.PRIMARY}
          inverted={ctaBtn.buttonType === "background-white" ? true : false}
          background={background}
          onClick={this.onOpenGetMoreDataModal}
          type={"LIVE_TILE"}
          disabled={this.props.purchase}
        >
          {ctaBtn.buttonText}
        </Button>
      ) : (
        CTAModal1
      );

    let CTAModal2 =
      ctaBtn2 &&
      reactGlobals.modal &&
      reactGlobals.modal.getMoreData &&
      ctaBtn2.buttonLink === reactGlobals.modal.getMoreData.buttonLink ? (
        <Button
          kind={Button.BUTTON_TYPE.PRIMARY}
          inverted={ctaBtn2.buttonType === "background-white" ? true : false}
          background={background}
          onClick={this.onOpenGetMoreDataModal}
          type={"LIVE_TILE"}
          disabled={this.props.purchase}
        >
          {ctaBtn2.buttonText}
        </Button>
      ) : null;

    CTAModal2 =
      ctaBtn2 &&
      reactGlobals.modal &&
      reactGlobals.modal && reactGlobals.modal.enableSafetyMode &&
      ctaBtn2.buttonLink === reactGlobals.modal.enableSafetyMode.buttonLink ? (
        <Button
          kind={Button.BUTTON_TYPE.PRIMARY}
          inverted={ctaBtn2.buttonType === "background-white" ? true : false}
          background={background}
          onClick={this.onOpenEnableSafetyModeModal}
          type={"LIVE_TILE"}
          disabled={!this.props.modalResponse && !this.openEnableSafetyModeModal}
        >
          {this.props.modalResponse ? ctaBtn2.buttonText : 'Safety Mode in Progress'}
        </Button>
      ) : (
        CTAModal2
      );

    const CATcomp2 = ctaBtn2 && (
      <Button
        onClick={() => {
          if (_.has(ctaBtn2, "buttonLink")) {
            window.location.href = _.get(ctaBtn2, "buttonLink");
          }
        }}
        kind={Button.BUTTON_TYPE.SECONDARY}
        inverted={ctaBtn2.buttonType === "background-black" ? true : false}
        background={background}
        siteCatPerContentImp={siteCatPerContentImp}
      >
        {ctaBtn2.buttonText}
      </Button>
    );
    const bargraph =
      barValue && barBaseValue ? (
        <BarGraph
          barValue={barValue}
          barBaseValue={barBaseValue}
          barLabelText={barLabelText}
          barValueExplain={barValueExplain}
          upgradeUrl={upgradeUrl}
          upgradeEligible={upgradeEligible}
          byodDevice={byodDevice}
          contractType={contractType}
          graphBarColor={graphBarColor}
        />
      ) : null;

    const {
      openGetMoreDataModal,
      openEnableSafetyModeModal,
      openPurchaseDataBoostModal,
      openConfirmationSucccessModal
    } = this.state;

    const modal = {
      background: "none",
      "max-width": "600px",
      padding: 0
    };

    const overlay = {
      background: "rgba(0, 0, 0, 0.5)"
    };

    return (
      <StyledTileFooter
        ctaBtnText={ctaBtn ? ctaBtn.buttonText : null}
        image={image}
        device={device}
        deviceSubheaderMTN={deviceSubheaderMTN}
        deviceHorizontalRule={deviceHorizontalRule}
        hidealldeviceCAT={hidealldeviceCAT}
        upgradeUrl={upgradeUrl}
        upgradeEligible={upgradeEligible}
        byodDevice={byodDevice}
        type={type}
      >
        <StyledVzwBarChart barChartHeight={barChartHeight}>
          {barChartData ? (
            <VzwBarChart data={barChartData} labelPrefix={barLabelPrefix} />
          ) : null}
        </StyledVzwBarChart>
        {(!CTAModal1 && (!image && !video && !fullscreenImage)) ||
        (device && !deviceSubheaderMTN)
          ? CATcomp
          : CTAModal1}
        <StyledCATcomp2>
          {(!CTAModal2 && (!image && !video && !fullscreenImage)) ||
          (device && !deviceSubheaderMTN)
            ? CATcomp2
            : CTAModal2}
        </StyledCATcomp2>
        {bargraph}
        {reactGlobals.modal && reactGlobals.modal.enableSafetyMode &&
        <Modal
          open={openEnableSafetyModeModal && this.props.modalResponse}
          onClose={this.onCloseEnableSafetyModeModal || this.props.modalResponse}
          onExited={this.onExitedEnableSafetyModeModal}
          center
          styles={{ modal, overlay }}
        >
          <div class="modal-content">
            <div class="modal-header">
              <h2
                class="modal-title a-heading-sm a-mar-bottom-lg"
                id="modal-title"
              />
              <p />
              <span class="close-wrapper" role="button" tabindex="0">
                <a id="overlayClose" href="javascript:void(0);" role="button">
                  <span class="a-sr a-sr-fix" aria-hidden="false">
                    Close
                  </span>
                  <span class="a-icon-overlay-close" aria-hidden="true" />
                </a>
              </span>
            </div>
            <div class="modal-body">
            
              <div class="a-wrapper">
                <h2 class="modal-title a-heading-sm a-mar-bottom-lg">
                {reactGlobals.modal.enableSafetyMode.header}
                </h2>
                <p>
                {reactGlobals.modal.enableSafetyMode.body}
                </p>
                <div class="a-mar-top-lg a-cta-container">
                  <a
                    href="javascript:void(0);"
                    class="a-btn a-btn-filled"
                    onClick={() => this.onClickEnableSafetyMode(encryptedMtn)}
                  >
                    {reactGlobals.modal.enableSafetyMode.buttons[0].buttonText}
                  </a>
                  <a
                    href="javascript:void(0);"
                    class="a-link a-mar-left-md"
                    onClick={this.onCloseEnableSafetyModeModal}
                  >
                    Cancel
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Modal>}
        {reactGlobals.modal && reactGlobals.modal.getMoreData && <Modal open={openGetMoreDataModal && !this.props.purchase} onClose={this.onCloseGetMoreDataModal} onExited={this.onExitedGetMoreDataModal} center styles={{modal, overlay}}>
      <div class="modal-content">
        <div class="modal-header">
            <h2 class="modal-title a-heading-sm a-mar-bottom-lg" id="modal-title">{reactGlobals.modal.getMoreData.header}</h2>
            <p>{reactGlobals.modal.getMoreData.subHeader}</p>
            <span class="close-wrapper" role="button" tabindex="0">
              <a id="overlayClose" href="javascript:void(0);" role="button">
                <span class="a-sr a-sr-fix" aria-hidden="false">Close</span>
                <span class="a-icon-overlay-close" aria-hidden="true"></span>
              </a>
            </span>
        </div>
        <div class="modal-body">
          <div class="a-table a-width-100 a-more-data">
            <div class="a-data-option a-table-cell a-pad-right-md">
              <span class="a-circle a-circle-red a-icon-data_boost"></span>
              <div class="a-data-option-info">
                <h3 class="a-subhead-sm">{reactGlobals.modal.getMoreData.body[0].header}</h3>
                <p>{reactGlobals.modal.getMoreData.body[0].body}</p>
              </div>
              <div class="a-text-center">
                <a href="javascript:void(0);" class="a-btn a-btn-filled a-mar-top-lg" role="button" onClick={this.onClickPurchaseDataBoost}>{reactGlobals.modal.getMoreData.body[0].button[0].buttonText}</a>
              </div>
            </div>
            <div class="a-data-option a-table-cell a-pad-left-md">
              <span class="a-circle a-circle-red-dark a-icon-plan-switch"></span>
              <div class="a-data-option-info">
                <h3 class="a-subhead-sm">{reactGlobals.modal.getMoreData.body[1].header}</h3>
                <p>{reactGlobals.modal.getMoreData.body[1].body}</p>
              </div>
              <div class="a-text-center">
                <a href="https://www.verizonwireless.com/digital/cpc/cpcLandingPage" class="a-btn a-mar-top-lg">{reactGlobals.modal.getMoreData.body[1].button[0].buttonText}</a>
              </div>
            </div>
          </div>
        </div>
      </div>          
      </Modal>}
      {reactGlobals.modal && reactGlobals.modal.purchaseDataBoost && <Modal open={openPurchaseDataBoostModal && !this.props.purchase} onClose={this.onClosePurchaseDataBoostModal} onExited={this.onExitedPurchaseDataBoostModal} center styles={{modal, overlay}}>
        <div class="modal-content">
          <div class="modal-header">
            <h2 class="modal-title a-heading-sm a-mar-bottom-lg" id="modal-title">{reactGlobals.modal.purchaseDataBoost.header}</h2>
            <p>{reactGlobals.modal.purchaseDataBoost.subheader}</p>
            <span class="close-wrapper" role="button" tabindex="0">
            <a id="overlayClose" href="javascript:void(0);" role="button">
            <span class="a-sr a-sr-fix" aria-hidden="false">Close</span>
            <span class="a-icon-overlay-close" aria-hidden="true"></span>
            </a>
            </span>
          </div>
        <div class="modal-body">
          <div class="a-gray-bg a-purchase-data" data-purchasedataboost="true">
          <p class="a-subhead-sm">{reactGlobals.modal.purchaseDataBoost.body[0]}</p>
          <div class="a-table a-width-100 a-mar-bottom-lg">
            <div class="a-table-cell a-text-center">
              <span class="a-circle a-circle-red-dark a-icon-video"></span>
              <div>
              <span class="a-bold a-block" aria-hidden="true">{reactGlobals.modal.purchaseDataBoost.body[1]}</span>
              <span aria-hidden="true">{reactGlobals.modal.purchaseDataBoost.body[2]}</span>
              <span class="a-sr">{reactGlobals.modal.purchaseDataBoost.body[1]}</span>
              </div>
            </div>
            <div class="a-table-cell a-text-center">
              <span class="a-circle a-circle-red-dark a-icon-photos"></span>
              <div>
              <span class="a-bold a-block" aria-hidden="true">{reactGlobals.modal.purchaseDataBoost.body[3]}</span>
              <span aria-hidden="true">{reactGlobals.modal.purchaseDataBoost.body[4]}</span>
              <span class="a-sr">1,500 photo posts</span>
              </div>
            </div>
            <div class="a-table-cell a-text-center">
            <span class="a-circle a-circle-red-dark a-icon-music"></span>
            <div>
            <span class="a-bold a-block" aria-hidden="true">{reactGlobals.modal.purchaseDataBoost.body[5]}</span>
            <span aria-hidden="true">{reactGlobals.modal.purchaseDataBoost.body[6]}</span>
            <span class="a-sr">17 hours of music</span>
            </div>
            </div>
          </div>
          <p>{reactGlobals.modal.purchaseDataBoost.body[7]}</p>
          <div class="a-mar-top-lg a-cta-container">
          <a href="javascript:void(0);" class="a-btn a-btn-filled" onClick={() => this.onClickConfirmPurchase(encryptedMtn)}>Confirm Purchase</a>
          <a href="javascript:void(0);" class="a-link a-mar-left-md" onClick={this.onClosePurchaseDataBoostModal}>Cancel</a>
          </div>
          </div>
        </div>
        </div>
      </Modal>}
      {reactGlobals.modal && reactGlobals.modal.confirmation &&<Modal open={openConfirmationSucccessModal && this.props.purchase} onClose={this.onCloseConfirmationSucccessModal} center styles={{modal, overlay}}>
        <div class="modal-content">
          <div class="modal-header">
              <h2 class="modal-title a-heading-sm a-mar-bottom-lg" id="modal-title">{reactGlobals.modal.confirmation.header}</h2>
              <p>{reactGlobals.modal.confirmation.subheader}</p>
              <span class="close-wrapper" role="button" tabindex="0">
                <a id="overlayClose" href="javascript:void(0);" role="button">
                  <span class="a-sr a-sr-fix" aria-hidden="false">
                    Close
                  </span>
                  <span class="a-icon-overlay-close" aria-hidden="true" />
                </a>
              </span>
          </div>
          <div class="modal-body">
            <div class="a-mar-top-lg">
              <span class="a-block">{reactGlobals.modal.confirmation.body}</span>
              <a href="javascript:void(0);" class="a-btn a-mar-top-lg" onClick={this.onClickConfirmationOk}>{reactGlobals.modal.confirmation.buttons[0].buttonText}</a>
            </div>
          </div>
        </div>
        </Modal>}
      </StyledTileFooter>
    );
  }
}

const StyledVzwBarChart = styled.div`
  font-size: 12px;
  font-family: NHaasGroteskDSStd-55Rg;
  height: 175px;
  width: 100%;
  height: ${props => props.barChartHeight + "rem"};
`;

const StyledCATcomp2 = styled.span`
  margin-left: 20px;
`;
const StyledTileFooter = styled.div`
  position: absolute;
  width: 100%;
  right: 0;
  bottom: 0;
  padding: 0;
  text-align: ${props => (props.ctaBtnText ? "left" : "right")};
  ${props =>
    props.type === "browsePopular" &&
    `
      z-index: -1;
    `};
  ${media.mobile`
    ${props =>
      props.type === "browsePopular" &&
      `
        display: none;
      `};
  `};
  ${props =>
    props.image &&
    `
      margin-bottom: 1.875rem;
    `};
  ${media.mobile`
    ${props =>
      props.device &&
      !props.deviceSubheaderMTN &&
      !props.deviceHorizontalRule &&
      `
      left: 160px;
      bottom: -25px;
      `};
  `};
  ${props =>
    props.device &&
    !props.deviceSubheaderMTN &&
    !props.deviceHorizontalRule &&
    `
    bottom: -25px;
    `};
  ${media.mobile`
    ${props =>
      props.device &&
      !props.deviceSubheaderMTN &&
      props.deviceHorizontalRule &&
      `
      display: none;
      `};
  `};
  ${props =>
    props.hidealldeviceCAT &&
    !props.deviceSubheaderMTN &&
    `
    display: none;
  `};
`;

const mapStateToProps = state => {
  if (state.modalContent && state.modalContent.modalContent) {
    if (
      state.modalContent.modalContent.type === "enableSafety" &&
      state.modalContent.modalContent.msg === "SUCCESS"
    ) {
      return {
        isFetching: state.isFetching,
        modalResponse: false,
        purchase: false
      };
    }
    if (
      state.modalContent.modalContent.type === "purchase" &&
      state.modalContent.modalContent.errorCode === "00"
    ) {
      return {
        isFetching: state.isFetching,
        modalResponse: true,
        purchase: true
      };
    }
  }
  return {
    isFetching: state.isFetching,
    modalResponse: true,
    purchase: false
  };
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TileFooter);

