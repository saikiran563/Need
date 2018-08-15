import React, { Component } from "react";
import PropTypes from "prop-types";
import "./Search.css";

import { ICONS } from "../Icon/Icon-assets";
import Icon from "../Icon/Icon";

export default class Search extends Component {
  static propTyles = {
    children: PropTypes.string,
    className: PropTypes.string,
    placeHolderText: PropTypes.string,
    id: PropTypes.string
  };

  static defaultProps = {
    placeHolderText: "",
    onChange: () => {},
    input: ""
  };

  className_input = "vz-odt--search-input";

  state = {
    hasContent: this.props.value || this.props.defaultValue || false
  };

  handleChange = event => {
    this.props.onChange(event);
  };

  handleInput = event => {
    this.handleFocus(event);
  };

  handleFocus = event => {
    if (this.input.innerText === this.props.placeHolderText) {
      this.input.innerText = "\u00a0";
      setTimeout(() => {
        this.input.innerText = "";
      }, 10);
      /*
      let range = document.createRange();
      let sel = window.getSelection();
      range.setStart(this.input.firstChild, 1);
      range.collapse(true);
      sel.removeAllRanges();
      sel.addRange(range);
      this.input.focus();
      */
    }
  };

  handleBlur = event => {
    if (this.input.innerText === "" || this.input.innerText === "\u00a0") {
      this.input.innerText = this.props.placeHolderText;
      this.input.className = this.className_input;
    }
  };

  render() {
    const { className, id, placeHolderText, ...other } = this.props;

    const { hasContent } = this.state;

    const magnifyButton = (
      <button className="vz-odt--search-magnifier">
        <Icon
          icon={ICONS.MAGNIFIER}
          className="vz-odt--search-magnifier__icon"
          aria-label="search icon"
          role="search"
        />
      </button>
    );

    return (
      <div>
        <input
          tabIndex="-1"
          aria-hidden="true"
          disabled
          className="vz-odt--search-bottomline"
          alt=""
          aria-label="search term"
          role="search"
        />
        <span
          contentEditable
          className={this.className_input}
          id={id}
          onChange={this.handleChange}
          onInput={this.handleInput}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          ref={span => {
            this.input = span;
          }}
        >
          {placeHolderText}
        </span>
        {magnifyButton}
      </div>
    );
  }
}
