import React from 'react'

import RestSyncingComponent from './generic/RestSyncingComponent.jsx'
import NextUpTeam from './NextUpTeam.jsx'

import Environment from '../../services/env'

import '../../../scss/components/NextUpTeams.scss'

class NextUpTeams extends RestSyncingComponent {
  constructor () {
    const urlPromise = Environment.load().then(env => `${env.moduleTournamentUrl}/table/all`)
    super('tables:reload', urlPromise)
  }

  render () {
    if (this.state.data) {
      return this.props.teams.map(({ tableId, teamNumber }) => <NextUpTeam table={this.state.data.find(table => table.tableId === tableId)} teamNumber={teamNumber} />)
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
