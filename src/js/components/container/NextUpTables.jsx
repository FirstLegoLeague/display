import React from 'react'

import RestSyncingComponent from './generic/RestSyncingComponent.jsx'
import NextUpTeam from './NextUpTeam.jsx'

import Environment from '../../services/env'

import '../../../scss/components/NextUpTeams.scss'

const TEAMS_PER_ROW = 2

class NextUpTeams extends RestSyncingComponent {
  constructor () {
    const urlPromise = Environment.load().then(env => `${env.moduleTournamentUrl}/table/all`)
    super('tables:reload', urlPromise)
  }

  render () {
    if (this.state.data) {
      const matchTeams = this.props.matchTeams.filter(({ teamNumber }) => Boolean(teamNumber))
      return matchTeams.filter(({ teamNumber }) => Boolean(teamNumber)).map(({ tableId, teamNumber }) =>
        <NextUpTeam
          table={this.state.data.find(table => table.tableId === tableId)}
          team={this.props.teams.find(team => team.number === teamNumber)}
          columns={TEAMS_PER_ROW} />)
        .reduce((nextUpTeams, nextUpTeam, index) => {
          const row = index % (matchTeams.length / TEAMS_PER_ROW)
          if (!nextUpTeams[row]) {
            nextUpTeams[row] = []
          }
          nextUpTeams[row].push(nextUpTeam)
          return nextUpTeams
        }, [])
        .map(teamsRow => <div className='row' style={{ height: `${100 / (matchTeams.length / TEAMS_PER_ROW)}%` }} >{teamsRow}</div>)
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
