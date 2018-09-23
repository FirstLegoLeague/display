import React, { Component } from 'react'
import Environment from '../../services/env'
import Messenger from '../../services/messenger'
import SyncingComponent from './generic/SyncingComponent.jsx'
import InfiniteTable from '../presentational/InfiniteTable.jsx'
import axios from 'axios'

class RankingsTable extends SyncingComponent {

  constructor() {
    let urlPromise = Environment.load().then(env => `${env.moduleRankingsUrl}/rankings.json`)
    super('rankings', urlPromise)
  }

  componentWillMount() {
    super.componentWillMount()
    Messenger.on('tournamentStage:update', () => this.reload())
    Messenger.on('teams:reload', () => this.reload())
  }

  tableHeaders(maxScoresCount) {
    let headers = ['Rank', 'Team']
    if(maxScoresCount > 1) {
      headers.push('High')
      const scoresHeaders = Array.from(new Array(maxScoresCount),(val,index)=>((index + 1).toString()))
      headers = headers.concat(scoresHeaders)
    } else {
      headers.push('Score')
    }

    return headers
  }

  tableData(maxScoresCount) {
    return this.state.data.map(rank => {
      const tableRank = { Rank: rank.rank, Team: `#${rank.team.number} - ${rank.team.name}` }
      if (maxScoresCount > 1) {
        tableRank.High = rank.highest
        rank.scores.forEach((score, index) => {
          tableRank[(index + 1).toString()] = score
        })
      } else {
        tableRank.Score = rank.scores[0]
      }
      return tableRank
    })
  }

  render() {
    if(this.state.data) {
      const maxScoresCount = Math.max.apply(null, this.state.data.map(rank => rank.scores.length))
      return <InfiniteTable id="rankings"
        delay={3000}
        largeCell="Team"
        headers={this.tableHeaders(maxScoresCount)}
        highlight={['High', 'Score']}
        data={this.tableData(maxScoresCount)}/>
    } else if(this.state.error) {
      return <div>Couldn't load rankings</div>
    } else {
      return <div className="loading">
        <div className="dimmer">
          <div className="big loader"></div>
        </div>
      </div>
    }

  }
}

export default RankingsTable
