import React, { Component } from 'react';
import '@first-lego-league/user-interface/current/assets/js/app.js'

import '@first-lego-league/user-interface/current/assets/css/app.css'
import './App.scss'

import Title from './js/components/container/Title.jsx'
import Timer from './js/components/container/Timer.jsx'
import LogosStripe from './js/components/container/LogosStripe.jsx'
import RankingsTable from './js/components/container/RankingsTable.jsx'

class App extends Component {
  render() {
    return (
      <div className="App" style={{height:'100vh'}}>
        <div className="grid-y" style={{height:'100%'}}>
          <div className="cell small-2">
            <Title />
          </div>
          <div className="cell small-8 grid-y" style={{'overflow-y': 'hidden'}}>
            <RankingsTable />
          </div>
          <div className="cell small-2">
          	<LogosStripe />
          </div>
        </div>
        <Timer />
      </div>
    );
  }
}

export default App
