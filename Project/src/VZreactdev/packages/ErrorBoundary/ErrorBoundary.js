import React, { Component } from "react";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, info) {
    this.setState({ hasError: true });
    console.log(error, info);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.jsx) {
        return this.props.jsx;
      }
      return <h1>Something went wrong.</h1>;
    }
    return this.props.children;
  }
}
