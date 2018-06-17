import React, { Component } from 'react'
import { Transition } from 'react-transition-group'

export class FadeInTransition extends React.Component {
  defaultStyle = {
    opacity: 0,
    transition: `${this.props.duration}ms linear ease-out`,
    transitionProperty: 'opacity, transform',
    transitionDelay: `${this.props.delay}ms`,
  }

  transitionStyles = {
    entering: {
      opacity: 0,
      transform: 'translateY(10%)',
    },
    entered: {
      opacity: 1,
      transform: 'translateY(0)',
    },
    exited: {
      opacity: 0,
      transform: 'translateY(10%)',
    },
  }

  handleEnter = elem => {
    //console.log('******handleEnter: ', elem);
  }

  handleEntering = elem => {
    //console.log('******handleEntering: ', elem);
  }

  handleEntered = elem => {
    //console.log('*****handleEntered: ', elem);
  }
  handleExited = elem => {
    //console.log('*****handleExited: ', elem);
  }
  render() {
    const { in: inProp, children } = this.props
    return (
      <Transition
        {...this.props}
        in={inProp}
        appear={true}
        timeout={this.props.duration}
        onEnter={this.handleEnter}
        onEntering={this.handleEntering}
        onEntered={this.handleEntered}
        onExited={this.handleExited}
        unmountOnExit={true}
      >
        {(state, props) => {
          const currentStyles = this.transitionStyles[state]
          //console.log('***********state: ', state, children, currentStyles);

          return React.cloneElement(children, {
            ...props,
            style: Object.assign({}, this.defaultStyle, currentStyles),
          })
        }}
      </Transition>
    )
  }
}

export default FadeInTransition
