import React, { Component } from 'react'
import Messenger from '../../services/messenger.js'
import Modal from 'react-foundation-modal'

function pad (number, length) {
  return (new Array(length + 1).join('0') + number).slice(-length)
}

function parseTime (time, format) {
  switch (format) {
    case 'clock':
      return `${pad(Math.floor(time / 60), 2)}:${pad(time % 60, 2)}`
    case 'seconds':
    default:
      return `${time | 0}`
  }
}

class Timer extends Component {

  constructor () {
    super()
    this.state = {running: null, time: '00:00'}
  }

  componentDidMount () {
    Messenger.on('clock:start', () => {
      this.setState({running: true})
    })

    Messenger.on('clock:end', () => {
      this.setState({running: false})
    })

    Messenger.on('clock:stop', () => {
      this.setState({running: false})
    })

    Messenger.on('clock:time', message => {
      this.setState({
        running: this.state.running || this.state.running === null, // Keep running, or start running only if we aren't told not to.
        time: parseTime(message.data.time, message.data.clockFormat)
      })
    })
  }

  render () {
    const overlayStyle = {
      'backgroundColor': 'rgba(0,0,0,0)'
    }

    const revelStyle = {
      'background-color': '#f9ebde',
      'opacity': '0.75',
      'border': '2px #adadad solid'
    }

    return <Modal isModal size="tiny"
                  className="timer-modal"
                  overlayStyle={overlayStyle}
                  revealStyle={revelStyle}
                  open={this.state.running} closeStyle={{'display': 'none'}}>
      <div className="time text-center h1">{this.state.time}</div>
    </Modal>
  }
}

export default Timer
