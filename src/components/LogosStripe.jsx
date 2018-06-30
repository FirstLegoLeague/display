import React, { Component } from 'react'
import InfiniteStripe from './generic/InfiniteStripe'

class LogosStripe extends Component {
  render() {
    return <InfiniteStripe id="logos-stripe" speed="100">
      <div style={{backgroundColor: 'blue'}}></div>
      <div style={{backgroundColor: 'green'}}></div>
      <div style={{backgroundColor: 'red'}}></div>
      <div style={{backgroundColor: 'yellow'}}></div>
      <div style={{backgroundColor: 'purple'}}></div>
    </InfiniteStripe>
  }
}

export default LogosStripe
