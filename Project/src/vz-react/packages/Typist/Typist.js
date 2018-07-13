import React, { Component } from 'react'
import PropTypes from 'prop-types'
import AnimationTextWave from '../../util/AnimationTextWave'
import classNames from 'classnames'

import '../Search/Search.css'

export default class Typist extends Component {
  constructor(props) {
    super(props)

    this.state = {
      content: '',
    }

    this.contentArray = this.props.children.split(' ')
  }

  static propTypes = {
    onTypingDone: PropTypes.func,

    typingSpeed: PropTypes.number,
    startDelay: PropTypes.number,

    className: PropTypes.string,
  }

  static defaultProps = {
    typingSpeed: 150,
    startDelay: 0,
    onTypingDone: () => {},
  }

  handleTypingDone = () => {
    this.props.onTypingDone()
    console.log('onTypingDone')
  }

  index = 0

  componentDidMount = () => {
    this.updateDelay = setTimeout(this.startUpdateContent, 0)
  }

  startUpdateContent = () => {
    console.log('startUpdateContent ' + this.props.typingSpeed)
    this.updateTimer = setInterval(this.updateContent, this.props.typingSpeed)
    clearTimeout(this.updateDelay)
  }

  updateContent = () => {
    this.setState({
      content: this.contentArray.join(' '),
    }) /** 
        if(this.index<this.contentArray.length-1){
            this.index ++;
            console.log('update content ' + this.index);
        }else{**/

    setTimeout(this.handleTypingDone, 1500)
    clearInterval(this.updateTimer)

    /**}**/
  }

  render() {
    const { className, ...other } = this.props

    return (
      <div className={className}>
        <AnimationTextWave initialDelay={0.2}>
          {this.state.content.split(' ')}
        </AnimationTextWave>
      </div>
    )
  }
}
