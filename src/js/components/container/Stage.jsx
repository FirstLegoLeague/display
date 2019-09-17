import React from 'react'

import { Textfit } from 'react-textfit'

import MhubSyncingComponent from './generic/MhubSyncingComponent.jsx'

import Environment from '../../services/env'

function upperCaseFirstIfLetter (string) {
  const stringRegex = /^\D/
  const regex = new RegExp(stringRegex)

  if (regex.test(string)) {
    const first = string.slice(0, 1)
    const stelse = string.slice(1, string.length)
    return first.toUpperCase() + stelse
  }
  return string
}

class Stage extends MhubSyncingComponent {
  constructor () {
    const urlPromise = Environment.load().then(env => `${env.moduleTournamentUrl}/settings/tournamentStage`)
    super('tournamentStage:updated', urlPromise)
    this.state = { data: '' }
  }

  render () {
    if (this.state.data) {
      return <Textfit className='cell' mode='single' max='15' forceSingleModeWidth='false'>
        {upperCaseFirstIfLetter(this.state.data)}
      </Textfit>
    } else if (this.state.error) {
      return <div>Couldn't load stage</div>
    } else {
      return <div className='loading'>
        <div className='dimmer'>
          <div className='big loader' />
        </div>
      </div>
    }
  }
}

export default Stage
