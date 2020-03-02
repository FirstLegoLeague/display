import React from 'react'

import { Textfit } from 'react-textfit'

import Stage from './Stage.jsx'
import MhubSyncingComponent from './generic/MhubSyncingComponent.jsx'

import Environment from '../../services/env'

class Title extends MhubSyncingComponent {
  constructor () {
    const urlPromise = Environment.load().then(env => `${env.moduleTournamentUrl}/settings/tournamentTitle`)
    super('tournamentTitle:updated', urlPromise)
    this.state = { data: '' }
  }

  render () {
    if (this.state.data) {
      return <div className='row' id='title-row'>
        <div class='three wide column' id='fll-logo' />
        <div class='center aligned ten wide column' id='title'>
          <Textfit className='cell' mode='single' max='50' forceSingleModeWidth={false}>
            {this.state.data}
          </Textfit>
          <Stage />
        </div>
        <div class='three wide column' id='challenge-logo' />
      </div>
    } else if (this.state.error) {
      return <div>Couldn't load title</div>
    } else {
      return <div className='loading'>
        <div className='dimmer'>
          <div className='big loader' />
        </div>
      </div>
    }
  }
}

export default Title
