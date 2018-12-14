import React, { Component } from 'react';
import ReactResizeDetector from 'react-resize-detector'

import isFullscreen from './js/services/fullscreen.js'
import '@first-lego-league/user-interface/current/assets/js/app.js'

import '@first-lego-league/user-interface/current/assets/css/app.css'
import './App.scss'

import Title from './js/components/container/Title.jsx'
import Timer from './js/components/container/Timer.jsx'
import SettingsButton from './js/components/container/SettingsButton.jsx'
import LogosStripe from './js/components/container/LogosStripe.jsx'
import RankingsTable from './js/components/container/RankingsTable.jsx'

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

  render() {
    return (
      <div className={`app ${this.state.isFullscreen ? 'fullscreen' : ''} ${this.state.settings.highContrast ? 'high-contrast' : ''}`} style={{height:'100vh'}}>
        <div className="grid-y" style={{height:'100%'}}>
          <div className="cell small-2">
            <Title />
          </div>
          <div className={`cell small-${this.state.settings.showLogos ? '8' : '10'} grid-y`} style={{'overflow-y': 'hidden'}}>
            <RankingsTable />
          </div>
          {this.state.settings.showLogos ? <div className="cell small-2">
            <LogosStripe />
          </div> : null}
        </div>
        <SettingsButton />
        {this.state.settings.showTimer ? <Timer /> : null}
        <ReactResizeDetector handleWidth handleHeight onResize={() => this.setState({ isFullscreen: isFullscreen() })} />
      </div>
    );
  }
}

export default App
