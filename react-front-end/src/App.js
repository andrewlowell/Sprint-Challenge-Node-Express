import React, { Component } from 'react';
import './App.css';
import Projects from './Projects.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Projects />
        </header>
      </div>
    );
  }
}

export default App;
