import React, { Component } from 'react';
import '../node_modules/@first-lego-league/user-interface/current/assets/js/app'

import '../node_modules/@first-lego-league/user-interface/current/assets/css/app.css'
import './App.css';

import LogosStripe from './components/LogosStripe'
import ScoresTable from './components/ScoresTable'

class App extends Component {
  render() {
    return (
      <div className="App" style={{height:'100vh'}}>
        <div className="grid-y" style={{height:'100%'}}>
          <div className="cell small-10">
          	<ScoresTable></ScoresTable>
          </div>
          <div className="cell small-2">
          	<LogosStripe></LogosStripe>
          </div>
        </div>
      </div>
    );
  }
}

export default App
