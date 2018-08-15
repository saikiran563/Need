import React, { Component, Children } from 'react'
import PropTypes from 'prop-types'
import './SectionHeader.css'
import { media } from "../../util/style";
import styled from "styled-components";

export default class SectionHeader extends Component {
  static propTypes = {}

  static defaultProps = {}

  render() {
    const {} = this.props

    return (
      <StyledHeaderSection
        className="vz-odt--header__section"
        aria-label={this.props.children}
        aria-hidden="false"
        tabIndex="0"
      >
        {this.props.children}

        <div className="vz-odt--header__section_highlight" />
      </StyledHeaderSection>
    )
  }
}

const StyledHeaderSection = styled.h2 `
  ${media.mobile `
    font-size: 25px;
  `}
  font-family: "NeueHaasGroteskDisplayBold", Arial, Helvetica, sans-serif;
  font-size: 2rem;
  height: 3.5rem;
  display:flex;
  flex-direction: column;
  padding: 0 1rem;
  max-width: 79.5rem;
  margin: 0rem auto 2rem auto;
  outline: none;
  `
