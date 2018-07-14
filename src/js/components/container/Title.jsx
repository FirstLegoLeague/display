import React, { Component } from 'react'
import Config from '../../services/config'
import SyncingComponent from './generic/SyncingComponent.jsx'
import { Textfit } from 'react-textfit';

class Title extends SyncingComponent {

  constructor() {
    let url = `${Config.tournamentUrl}/settings/title`
    super('title', url)
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
