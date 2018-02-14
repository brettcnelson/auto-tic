import React, { Component } from 'react';
import './App.css';
import data from './data';
import Board from './Board';
import Buttons from './Buttons';
import Display from './Display';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      play: true,
      first: true,
      player: false,
      node: data.tree,
      symm: 0,
      games: data.games,
      game: 0,
      move: 0
    };
  }

  switch() {
    var play = this.state.play;
    this.setState({play:!play});
  }

  firstChange() {
    var first = this.state.first;
    this.setState({first:!first});
  }

  render() {
    var button = this.state.play ? 
      <Buttons play={this.state.play} first={this.state.first} switch={()=>this.switch()} firstChange={()=>this.firstChange()} /> : 
      <Buttons switch={()=>this.switch()} />
    return (
      <div className="App">
        {button}
        <Display node={this.state.node} />
        <Board node={this.state.node} symm={this.state.symm} />
      </div>
    );
  }
}

export default App;
