import React, { Component } from 'react';
import './App.css';

import LogosCarousel from './components/LogosCarousel';

class App extends Component {
  render() {
    return (
      <div className="App">
      	<LogosCarousel name="Logos"></LogosCarousel>
      </div>
    );
  }
}

export default App;
