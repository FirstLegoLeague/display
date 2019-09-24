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
      for (let i = 0; i < this.state.data.globalLogos.length; i++) {
        globalLogos.push(<img src={this.state.data.globalLogos[i].image} />)
      }
      const localLogos = []
      for (let i = 0; i < this.state.data.localLogos.length; i++) {
        localLogos.push(<img src={this.state.data.localLogos[i].image} />)
      }
      return <div id='logos-stripe'>
        <div id='global-logos'>{globalLogos}</div>
        <InfiniteStripe id='local-logos' speed='100'>{localLogos}</InfiniteStripe>
      </div>
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
