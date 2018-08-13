import React, { Component } from 'react'
import Environment from '../../services/env'
import Messanger from '../../services/messanger'
import SyncingComponent from './generic/SyncingComponent.jsx'
import InfintieTable from '../presentational/InfiniteTable.jsx'
import axios from 'axios'

class RankingsTable extends SyncingComponent {

  constructor() {
    let urlPromise = Environment.load().then(env => `${env.moduleRankingsUrl}/rankings.json`)
    super('scores', urlPromise)
  }

  componentWillMount() {
    super.componentWillMount()
    Messanger.on('tournamentStage:update', () => this.reload())
    Messanger.on('teams:reload', () => this.reload())
  }

  tableHeaders() {
    let headers = ['Rank', 'Team']
    if(this.state.data[0].scores.length === 1) {
      headers.push('Score')
    } else {
      headers.push('High')
      const scoresHeaders = Array.from(new Array(this.state.data[0].scores.length),(val,index)=>(index+1))
      headers = headers.concat(scoresHeaders)
    }

    return headers
  }

  tableData() {
    return this.state.data.map(rank => {
      const tableRank = { Rank: rank.rank, Team: `#${rank.team.number} - ${rank.team.name}` }
      if (rank.scores.length === 1) {
        tableRank.Score = rank.scores[0]
      } else {
        tableRank.High = rank.highest
        rank.scores.forEach((score, index) => {
          tableRank[(index + 1).toString()] = score
        })
      }
      return tableRank
    })
  }

  render() {
    if(this.state.data) {
      return <InfintieTable id="rankings" largeCell="Team" headers={this.tableHeaders()} highlight={['High']} data={this.tableData()}/>
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
