import React, { Component } from 'react'
import Messenger from '../../services/messenger.js'
import Reveal from 'react-foundation-components/lib/reveal'

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
        time: message.data.time.toString()
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
