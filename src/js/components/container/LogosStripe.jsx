import React, { Component } from 'react'
import Config from '../../services/config'
import InfiniteStripe from '../presentational/InfiniteStripe.jsx'
import SyncingComponent from './generic/SyncingComponent.jsx'

class LogosStripe extends SyncingComponent {

  constructor() {
    let url = `${Config.tournamentUrl}/settings/logos`
    super('logos', url)
  }

  render() {
    if(!this.state.data) {
      return <div className="loading">
        <div className="dimmer">
          <div className="big loader"></div>
        </div>
      </div>
    }

    let logos = []
    for (let i = 0; i < this.state.data.length; i++) {
        logos.push(<img src={this.state.data[i]}></img>)
    }
    return <InfiniteStripe id="logos-stripe" speed="100">{logos}</InfiniteStripe>
  }

}

export default LogosStripe
