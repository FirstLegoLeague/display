import React from 'react'

import RestSyncingComponent from './generic/RestSyncingComponent.jsx'

import Environment from '../../services/env'
import InfiniteStripe from '../presentational/InfiniteStripe.jsx'

class LogosStripe extends RestSyncingComponent {
  constructor () {
    const urlPromise = Environment.load().then(env => `${env.moduleTournamentUrl}/image/all`)
    super('images:reload', urlPromise)
  }

  stripe () {
    if (this.state.data) {
      const globalLogos = []
      for (let i = 0; i < this.state.data.global.length; i++) {
        globalLogos.push(<img src={this.state.data.global[i].image} />)
      }
      const localLogos = []
      for (let i = 0; i < this.state.data.local.length; i++) {
        localLogos.push(<img src={this.state.data.local[i].image} />)
      }
      return [
        <div id='global-logos'>{globalLogos}</div>,
        <div id='local-logos'>
          <InfiniteStripe speed='100'>{localLogos}</InfiniteStripe>
        </div>
      ]
    } else if (this.state.error) {
      return <div>Could'nt load logos</div>
    } else {
      return <div className='loading'>
        <div className='dimmer'>
          <div className='big loader' />
        </div>
      </div>
    }
  }

  render () {
    return <div className='row' id='logo-stripe-row'>
      {this.stripe()}
    </div>
  }
}

export default LogosStripe
