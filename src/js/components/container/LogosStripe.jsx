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
      const logos = []
      for (let i = 0; i < this.state.data.length; i++) {
        logos.push(<img src={this.state.data[i].image} />)
      }
      return <InfiniteStripe id='logos-stripe' speed='100'>{logos}</InfiniteStripe>
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
