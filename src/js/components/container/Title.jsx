import React, { Component } from 'react'
import Environment from '../../services/env'
import Messenger from '../../services/messenger'
import axios from 'axios'
import { Textfit } from 'react-textfit';
import Stage from './Stage.jsx'
import MhubSyncingComponent from './generic/MhubSyncingComponent.jsx'

class Title extends MhubSyncingComponent {

  constructor() {
    const urlPromise = Environment.load().then(env => `${env.moduleTournamentUrl}/settings/tournamentTitle`)
    super('tournamentTitle:updated', urlPromise)
    this.state = { data: '' }
  }

  render() {
    if(this.state.data) {
      return <div className="grid-x grid-margin-y" id="title-row">
        <div className="cell small-2" id="fll-logo" />
        <div className="cell small-8 grid-x grid-padding-x align-center-middle text-center">
          <Textfit className="cell" mode="single" max="50" forceSingleModeWidth="false">
            {this.state.data}
          </Textfit>
          <Stage />
        </div>
        <div className="cell small-2" id="challenge-logo" />
      </div>
    } else if(this.state.error) {
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

export default Title
