import React from 'react'

import RestSyncingComponent from './generic/RestSyncingComponent.jsx'
import NextUpTeams from './NextUpTeams.jsx'

import Environment from '../../services/env'
import { upperCaseFirstIfLetter } from '../../services/upper_case'

import '../../../scss/components/NextUp.scss'

class NextUp extends RestSyncingComponent {
  constructor () {
    const urlPromise = Environment.load().then(env => `${env.moduleTournamentUrl}/match/upcoming`)
    super('UpcomingMatches:reload', urlPromise)
  }

  content () {
    if (this.state.data && this.state.data.length > 0) {
      return [
        <div class='ui huge header'>{upperCaseFirstIfLetter(this.state.data[0].stage)} match #{this.state.data[0].matchId}</div>,
        <div className='ui grid'>
          <NextUpTeams matchTeams={this.state.data[0].matchTeams} />
        </div>
      ]
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
      <div id='next-up' className='ui basic segment'>
        {this.content()}
      </div>
    </div>
  }
}

export default NextUp
