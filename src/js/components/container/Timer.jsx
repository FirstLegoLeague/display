import React, { Component } from 'react'
import { Textfit } from 'react-textfit'

import Messenger from '../../services/messenger.js'

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
    this.state = {
      running: null,
      time: '00:00'
    }
  }

  componentDidMount () {
    Messenger.on('clock:start', () => {
      this.setState({ running: true })
    })

    Messenger.on('clock:end', () => {
      this.setState({ running: false })
    })

    Messenger.on('clock:stop', () => {
      this.setState({ running: false })
    })

    Messenger.on('clock:time', message => {
      this.setState({
        running: this.state.running || this.state.running === null, // Keep running, or start running only if we aren't told not to.
        time: parseTime(message.data.time, message.data.clockFormat)
      })
    })
  }

  render () {
    // if (!this.state.running) {
    //   return ''
    // }

    return <div id='timer' className='ui raised segment'>
      <Textfit mode='single' max='100' forceSingleModeWidth='false'>
        {this.state.time}
      </Textfit>
    </div>
  }
}

export default Timer
