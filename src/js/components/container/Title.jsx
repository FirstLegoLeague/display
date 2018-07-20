import React, { Component } from 'react'
import Environment from '../../services/env'
import SyncingComponent from './generic/SyncingComponent.jsx'
import { Textfit } from 'react-textfit';

class Title extends SyncingComponent {

  constructor() {
    let urlPromise = Environment.load().then(env => `${env.moduleTournamentUrl}/settings/tournamentTitle`)
    super('title', urlPromise)
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
