import React, { Component } from 'react'
import Messanger from '../../services/messanger.js'
import Config from '../../services/config.js'
import Reveal from 'react-foundation-components/lib/reveal'

class Timer extends Component {
  
  constructor() {
    super()
    this.state = { running: false, seconds: 0, minutes: 0 }
  }

  componentDidMount() {
    Messanger.on('timer:start', () => {
      this.setState({ running: true })
    })

    Messanger.on('timer:stop', () => {
      this.setState({ running: false })
    })

    Messanger.on('timer:time', message => {
      const time = parseInt(message.data.time)
      this.setState({
        minutes: Math.floor(time / 60).toString(),
        seconds: (time % 60).toString()
      })
    })
  }

  render() {
  	return <Reveal size="tiny" show={this.state.running}>
      <div className="text-center h1">{this.state.minutes}:{this.state.seconds}</div>
    </Reveal>
  }
}

export default Timer
