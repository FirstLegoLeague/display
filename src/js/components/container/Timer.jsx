import React, { Component } from 'react'
import Messenger from '../../services/messenger.js'
import Reveal from 'react-foundation-components/lib/reveal'

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

  constructor() {
    super()
    this.state = { running: false, time: '00:00' }
  }

  componentDidMount() {
    Messenger.on('clock:start', () => {
      this.setState({ running: true })
    })

    Messenger.on('clock:end', () => {
      this.setState({ running: false })
    })

    Messenger.on('clock:end', () => {
      this.setState({ running: false })
    })

    Messenger.on('clock:time', message => {
      this.setState({
        running: true,
        time: parseTime(message.data.time, message.data.clockFormat)
      })
    })
  }

  render() {
  	return <Reveal size="tiny" show={this.state.running}>
      <div className="text-center h1">{this.state.time}</div>
    </Reveal>
  }
}

export default Timer
