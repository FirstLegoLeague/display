import React, { Component } from 'react'
import Environment from '../../services/env'
import Messenger from '../../services/messenger'
import axios from 'axios'
import { Textfit } from 'react-textfit'

function upperCaseFirstIfLetter (string) {
  let stringRegex = /^\D/
  let regex = new RegExp(stringRegex)

  if (regex.test(string)) {
    let first = string.slice(0, 1)
    let stelse = string.slice(1, string.length)
    return first.toUpperCase() + stelse
  }
  return string
}

class Stage extends React.Component {

  constructor () {
    super()
    this.state = {data: ''}
  }

  componentDidMount () {
    Environment.load()
      .then(env => {
        const url = `${env.moduleTournamentUrl}/settings/tournamentStage`
        return axios.get(url)
      }).then(response => this.setState({data: upperCaseFirstIfLetter(response.data)}))

    Messenger.on('tournamentStage:updated', message => {
      this.setState({data: upperCaseFirstIfLetter(message.data.value)})
    })
  }

  render () {
    if (this.state.data) {
      return <Textfit className="cell" mode="single" max="20" forceSingleModeWidth="false">
        {this.state.data}
      </Textfit>
    } else if (this.state.error) {
      return <div>Couldn't load title</div>
    } else {
      return <div className="loading">
        <div className="dimmer">
          <div className="big loader"></div>
        </div>
      </div>
    }
  }

}

export default Stage
