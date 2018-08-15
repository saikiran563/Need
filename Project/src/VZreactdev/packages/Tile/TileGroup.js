import React, { Component } from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";

import Tile from "./Tile";
import { ICONS } from "../Icon/Icon-assets";

import CarouselIndicator from "../CarouselIndicator/CarouselIndicator";
import { media } from "../../util/style";

export default class TileGroup extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    activeIndicatorIndex: 0,
    isScrolling: false
  };

  static propTypes = {
    className: PropTypes.string,
    isCarousel: PropTypes.bool
  };

  static defaultProps = {
    isCarousel: false
  };

  slideWidth = 328;
  prevPosition;

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
    this.handleScroll();
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  handleScroll = event => {
    let index = Math.abs(
      Math.round(this.container.scrollLeft / this.slideWidth)
    );
    this.setState({
      activeIndicatorIndex: index,
      isScrolling: this.container.scrollLeft !== this.prevPosition
    });
    this.prevPosition = this.container.scrollLeft;
    //console.log('activeIndicatorIndex : ' + index);
  };

  render() {
    const {
      children,
      className,
      isCarousel,
      isAnswerTile,
      device,
      deviceHorizontalRule,
      ...other
    } = this.props;

    const props = {};

    const carouselIndicatorComp = isCarousel ? (
      <CarouselIndicator
        numSlides={children.length}
        device={device}
        activeIndicatorIndex={this.state.activeIndicatorIndex}
      />
    ) : null;

    let alertFound = false;

    const isAlertTile = (tile, numSlides, i) => {
      if (tile.props.alertMode && !alertFound) {
        if (!(numSlides - 1 == i)) {
          alertFound = true;
          return true;
        }
      } else {
        return false;
      }
    };

    const extendedTiles = React.Children.map(children, (tile, i) => {
      if (i < children.length - 1) {
        return React.cloneElement(tile, {
          active:
            i === this.state.activeIndicatorIndex || !isCarousel ? true : false,
          isparentscrolling: this.state.isScrolling,
          isCarousel: isCarousel,
          numSlides: children.length,
          alertMode: isAlertTile(tile, children.length, i)
        });
      } else {
        return React.cloneElement(tile, {
          active:
            i === this.state.activeIndicatorIndex || !isCarousel ? true : false,
          isparentscrolling: this.state.isScrolling,
          isCarousel: isCarousel,
          numSlides: children.length,
          alertMode: false,
          collapsed: alertFound
        });
      }
    });

    return (
      <div>
        <StyledTileGroup
          innerRef={div => {
            this.container = div;
          }}
          className={className}
          onScroll={this.handleScroll}
          device={device}
          deviceHorizontalRule={deviceHorizontalRule}
          isAnswerTile={isAnswerTile}
          {...other}
        >
          {extendedTiles}
        </StyledTileGroup>
        {carouselIndicatorComp}
      </div>
    );
  }
}

const StyledTileGroup = styled.div`
  -ms-overflow-style: none; /*ie hide*/
  position: relative;
  display: flex;
  flex-direction: row;
  max-width: 79.5rem;
  padding: 0 0 2rem 0;
  margin: 0 auto;
  overflow-x: auto;
  overflow-y: hidden;
  ${props =>
    props.isCarousel &&
    `
      flex-direction: row;
      flex-wrap: nowrap;
      overflow-x: auto;
      -webkit-overflow-scrolling: touch;
      margin: 1.25rem auto 0 auto;
    `};
  ${media.mobile`
    ${props =>
      props.isStacked &&
      `
          flex-direction: column;
          margin-top: -.69rem;
        `};
      ${props =>
        props.isAnswerTile &&
        `
          flex-direction: column;
          margin-top: -.69rem;
        `};
      ${props =>
        props.device &&
        `
          flex-direction: column;
          margin-top: -.69rem;
        `};
      ${props =>
        props.device &&
        `
          padding-bottom: 0px;
        `};
    `};
  ${props =>
    props.device &&
    `
      flex-wrap: wrap;

      `};
`;
