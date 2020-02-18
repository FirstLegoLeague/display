import React from 'react'

import RestSyncingComponent from './generic/RestSyncingComponent.jsx'
import NextUpTeams from './NextUpTeams.jsx'

import Environment from '../../services/env'

const COLUMNS_BY_MATCH_TEAMS = ['two', 'two', 'two', 'two', 'four', 'four', 'four', 'four', 'six', 'six', 'six', 'six', 'eight', 'eight', 'eight', 'eight']

class NextUp extends RestSyncingComponent {
  constructor () {
    const urlPromise = Environment.load().then(env => `${env.moduleTournamentUrl}/match/upcoming`)
    super('UpcomingMatches:reload', urlPromise)
  }

  content () {
    if (this.state.data) {
      const gridClass = `ui ${COLUMNS_BY_MATCH_TEAMS[this.state.data[0].matchTeams.length - 1]} columns grid`
      return <div className={gridClass}>
        <NextUpTeams teams={this.state.data[0].matchTeams} />
      </div>
    } else if (this.state.error) {
      return <div>Couldn't load next matches</div>
    } else {
      return <div className='loading'>
        <div className='dimmer'>
          <div className='big loader' />
        </div>
      </div>
    }
  }

  render () {
    return <div id='main-row' className={this.props.showLocalLogos ? 'sixteen wide column logo-striped' : 'sixteen wide column'}>
      <div id='next-up' className='ui segment'>
        <div class='ui header'>Next up</div>
        {this.content()}
      </div>
    </div>
  }
}

export default NextUp
