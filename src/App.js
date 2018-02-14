import React, { Component } from 'react';
import './App.css';
import data from './data';
import Board from './Board';
import Buttons from './Buttons';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      play: true,
      node: data.tree.children[0].children[2].children[0],
      symm: 0
    };
  }
  render() {
    return (
      <div className="App">
        <Buttons play={this.state.play} />
        <Board node={this.state.node} symm={this.state.symm} />
      </div>
    );
  }
}

export default App;
