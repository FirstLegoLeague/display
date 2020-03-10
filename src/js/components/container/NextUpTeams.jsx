import React from 'react'

import RestSyncingComponent from './generic/RestSyncingComponent.jsx'
import NextUpTables from './NextUpTables.jsx'

import Environment from '../../services/env'

class NextUpTeams extends RestSyncingComponent {
  constructor () {
    const urlPromise = Environment.load().then(env => `${env.moduleTournamentUrl}/team/all`)
    super('teams:reload', urlPromise)
  }

  render () {
    if (this.state.data) {
      return <NextUpTables matchTeams={this.props.matchTeams} teams={this.state.data} />
    } else if (this.state.error) {
      return <div>Couldn't load table names</div>
    } else {
      return <div className='loading'>
        <div className='dimmer'>
          <div className='big loader' />
        </div>
      </div>
    }
  }
}

export default NextUpTeams
