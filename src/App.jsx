import React, { Component } from 'react'
import ReactResizeDetector from 'react-resize-detector'

import isFullscreen from './js/services/fullscreen.js'
import '@first-lego-league/user-interface/current/app.js'

import '@first-lego-league/user-interface/current/app.css'
import './App.scss'

import Title from './js/components/container/Title.jsx'
import Timer from './js/components/container/Timer.jsx'
import SettingsButton from './js/components/container/SettingsButton.jsx'
import LogosStripe from './js/components/container/LogosStripe.jsx'
import RankingsTable from './js/components/container/RankingsTable.jsx'
import NextUp from './js/components/container/NextUp.jsx'

import Settings from './js/services/settings.js'

class App extends Component {
  constructor (props) {
    super(props)

    this.state = {
      isFullscreen: isFullscreen(),
      settings: Settings.settings
    }

    Settings.on('update', () => {
      this.setState({ settings: Settings.settings })
    })
  }

  appStyle () {
    const style = { height: '100vh' }
    style.direction = this.state.settings.RTL ? 'rtl' : 'ltr'
    return style
  }

  appClass () {
    return `app fll ui padded grid tile-background ${this.state.isFullscreen ? 'fullscreen' : ''} ${this.state.settings.RTL ? 'rtl' : ''}`
  }

  render () {
    return (
      <div className={this.appClass()}
        style={this.appStyle()}>
        <Title />
        {this.state.settings.showNextUp ? <NextUp showLocalLogos={this.state.settings.showLogos}/> : <RankingsTable showLocalLogos={this.state.settings.showLogos} />}
        <LogosStripe showLocalLogos={this.state.settings.showLogos} />
        <SettingsButton />
        {this.state.settings.showTimer ? <Timer /> : null}
        <ReactResizeDetector handleWidth handleHeight onResize={() => this.setState({ isFullscreen: isFullscreen() })} />
      </div>
    )
  }
}

export default App
