import React, { Component } from 'react'
import Environment from '../../services/env'
import InfiniteStripe from '../presentational/InfiniteStripe.jsx'
import RestSyncingComponent from './generic/RestSyncingComponent.jsx'

class LogosStripe extends RestSyncingComponent {

  constructor() {
    let urlPromise = Environment.load().then(env => `${env.moduleTournamentUrl}/image/all`)
    super('images:reload', urlPromise)
  }

  render() {
    if(this.state.data) {
      let logos = []
      for (let i = 0; i < this.state.data.length; i++) {
          logos.push(<img src={this.state.data[i].image}></img>)
      }
      return <InfiniteStripe id="logos-stripe" speed="100">{logos}</InfiniteStripe>
    } else if(this.state.error) {
      return <div>Could'nt load logos</div>
    } else {
      return <div className="loading">
        <div className="dimmer">
          <div className="big loader"></div>
        </div>
      </div>
    }
  }

}

export default LogosStripe
