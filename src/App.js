import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      play: false,
    };
  }

  render() {
    var game = this.state.play ? 
      <Play /> :
      <Train />;
    return (
      <div className="App">{game}</div>
    );
  }
}

export default App;
