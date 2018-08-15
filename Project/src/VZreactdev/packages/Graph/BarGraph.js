import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import IsInViewport from "../../util/InViewport";

import "./BarGraph.css";

export default class BarGraph extends Component {
  static propTypes = {
    barValue: PropTypes.number.isRequired,
    barBaseValue: PropTypes.number.isRequired,
    barLabelText: PropTypes.string,
    barValueExplain: PropTypes.string,
    className: PropTypes.string,
    contractType: PropTypes.string,
    graphBarColor: PropTypes.string
  };

  static defaultProps = {
    baseValue: 100
  };

  state = {
    visible: true
  };

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);

    this.handleScroll();
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  handleScroll = event => {
    if (!this.state.visible) {
      if (IsInViewport(this.bargraph)) {
        this.setState({
          visible: true
        });
      }
    }
  };

  render() {
    const {
      barValue,
      barBaseValue,
      className,
      barLabelText,
      barValueExplain,
      bargraph,
      upgradeUrl,
      upgradeEligible,
      byodDevice,
      hidealldeviceCAT,
      contractType,
      graphBarColor,
      ...other
    } = this.props;

    const props = {
      //Set the width of the bar when the bar component is visible
      widthValue: this.state.visible
        ? (this.props.barValue / this.props.barBaseValue) * 100 + "%"
        : "0%"
    };

    const labelElem = barLabelText ? (
      <h3
        className={
          this.props.byodDevice
            ? "vz-odt--bargraph-byodDevice"
            : this.props.upgradeEligible
              ? "vz-odt--bargraph-label-upgradeEligible"
              : "vz-odt--bargraph-label"
        }
      >
        {barLabelText}
      </h3>
    ) : null;

    const labelLink = barValueExplain ? (
      <a
        className={
          this.props.hidealldeviceCAT
            ? "vz-odt--bargraph-hiddenCTA"
            : "vz-odt--bargraph-ValueExplain"
        }
        href={this.props.upgradeUrl}
      >
        {barValueExplain}
      </a>
    ) : null;

    //const valuebarColorCondition = (props.widthValue === '100%')?():null;

    return (
      <div
        className="vz-odt--bargraph"
        ref={div => {
          this.bargraph = div;
        }}
      >
        {labelLink}
        {labelElem}
        <div
          className={
            this.props.byodDevice
              ? "vz-odt--bargraph-byodDevice"
              : "vz-odt--bargraph-bar"
          }
        >
          <div
            className="vz-odt--bargraph-valuebar"
            style={{
              width: props.widthValue,
              borderBottomColor: this.props.graphBarColor
            }}
          />
          <span
            className={
              this.props.contractType === "EDGE"
                ? "vz-odt--bargraph-halfbarEnd"
                : null
            }
          />
          <span className="vz-odt--bargraph-fullbarEnd" />
        </div>
      </div>
    );
  }
}
