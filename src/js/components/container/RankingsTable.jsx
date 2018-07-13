import React, { Component } from 'react'
import Config from '../../services/config'
import Messanger from '../../services/messanger'
import SyncingComponent from './generic/SyncingComponent.jsx'
import InfintieTable from '../presentational/InfiniteTable.jsx'

class RankingsTable extends SyncingComponent {

  constructor() {
    super('scores', '')
    this.url = `${Config.tournamentUrl}/rankings/practice`

    Messanger.on('settings:reload', () => {
      axios.get(this.url).then(response => {
        this.url = `${Config.tournamentUrl}/rankings/${response.data}`
      })
    })
  }

  tableData() {
    return this.state.data.map(rank => {
      const tableRank = { Rank: rank.rank, Team: `#${rank.team.number} - ${rank.team.name}` }
      if (rank.scores.length === 1) {
        tableRank.Score = rank.scores[0]
      } else {
        tableRank.High = rank.highest
        tableRank.scores.forEach((score, index) => {
          tableRank[(index + 1).toString()] = score
        })
      }
      return tableRank
    })
  }

  render() {
    if(!this.state.data) {
      return <div className="loading">
        <div className="dimmer">
          <div className="big loader"></div>
        </div>
      </div>
    }

    return <InfintieTable largeCell="Team" data={this.tableData()}/>
  }
}

export default RankingsTable
