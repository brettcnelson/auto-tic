import React, { Component } from 'react';
import './App.css';
import Play from './Play';
import Train from './Train';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      play: true,
    };
  }

  switchPlay() {
    var play = this.state.play;
    this.setState({play:!play});
  }

  render() {
    var mode = this.state.play ? <Play click={()=>this.switchPlay()} /> : <Train click={()=>this.switchPlay()} />;
    return (
      <div className="App">{mode}</div>
    );
  }
}

export default App;
