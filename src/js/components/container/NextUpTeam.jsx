import React from 'react'

import RestSyncingComponent from './generic/RestSyncingComponent.jsx'

import Environment from '../../services/env'

class NextUpTeam extends RestSyncingComponent {
  constructor () {
    const urlPromise = Environment.load().then(env => `${env.moduleTournamentUrl}/team/all`)
    super('teams:reload', urlPromise)
  }

  render () {
    if (this.state.data) {
      const table = this.props.table.tableName
      const team = this.state.data.find(t => t.number === this.props.teamNumber)
      return <div className='column'>
        <div className='ui raised center aligned segment'>
          <div className='ui header'>
            {table}
          </div>
          <div className='ui statistic'>
            <div className='value'>#{team.number}</div>
            <div className='label'>{team.name}</div>
          </div>
        </div>
      </div>
    } else if (this.state.error) {
      return <div>Couldn't load teams</div>
    } else {
      return <div className='loading'>
        <div className='dimmer'>
          <div className='big loader' />
        </div>
      </div>
    }
  }
}

export default NextUpTeam
