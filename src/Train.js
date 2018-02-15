import React, { Component } from 'react';
import data from './data';
import Display from './Display';
import Board from './Board';

class Train extends Component {
  constructor(props) {
    super(props);
    this.state = {
      paused: false,
      game:0,
      move:0,
      symm:0
    };
  }

  togglePause() {
    var paused = this.state.paused;
    this.setState({paused:!paused});
  }

  render() {
    var currGame = data.games[this.state.game];
    if (!this.state.paused) {
      var delay = 1000;
      if (currGame.moves[this.state.move+1]) {
        var move = this.state.move;
        setTimeout(()=>!this.state.paused && this.setState({move:move+1}),delay);
      }
      else if (data.games[this.state.game+1]) {
        var game = this.state.game;
        setTimeout(()=>!this.state.paused && this.setState({game:game+1,move:0}),delay)
      }
    }
    var node = currGame.moves[this.state.move];
    return (
      <div className="Train">
      	<div><button onClick={this.props.click} >play against the computer</button><button onClick={()=>this.togglePause()}>{this.state.paused ? 'resume' : 'pause'}</button></div>
        <div>Game {this.state.game+1} of {data.games.length} - LeafID: {currGame.leafID} - Res: {currGame.res} - Moves: {currGame.moves.length-1} - Symm: {this.state.symm}</div>
      	<Display node={node} />
        <Board node={node} symm={this.state.symm} />
      </div>
    );
  }
}

export default Train;
