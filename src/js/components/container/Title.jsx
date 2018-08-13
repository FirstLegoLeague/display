import React, { Component } from 'react'
import Environment from '../../services/env'
import Messenger from '../../services/messenger'
import axios from 'axios'
import { Textfit } from 'react-textfit';

class Title extends React.Component {

  componentDidMount() {
    Environment.load()
      .then(env => {
        const url = `${env.moduleTournamentUrl}/settings/tournamentTitle`
        return axios.get(url)
      }).then(response => this.setState({ data: response.data }))

    Messenger.on('tournamentTitle:updated', data => {
      this.setState({ data: data.value })
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

    return <div className="grid-x grid-margin-y" id="title-row">
      <div className="cell small-2" id="fll-logo" />
      <div className="cell small-8 grid-x grid-padding-x align-center-middle text-center">
        <Textfit className="cell" mode="single" max="50" forceSingleModeWidth="false">
          {this.state.data}
        </Textfit>
      </div>
      <div className="cell small-2" id="challenge-logo" />
    </div>
  }

}

export default Title
