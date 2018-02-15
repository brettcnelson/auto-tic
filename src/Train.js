import React, { Component } from 'react';
import data from './data';
import Display from './Display';
import Board from './Board';

class Train extends Component {
  constructor(props) {
    super(props);
    this.state = {
      game:0,
      move:0,
      symm:0
    };
  }

  render() {
    var delay = 500;
    var currGame = data.games[this.state.game];
    if (currGame.moves[this.state.move+1]) {
      var move = this.state.move;
      setTimeout(()=>this.setState({move:move+1}),delay);
    }
    else if (data.games[this.state.game+1]) {
      var game = this.state.game;
      setTimeout(()=>this.setState({game:game+1,move:0}),delay)
    }
    var node = currGame.moves[this.state.move];

    return (
      <div className="Train">
      	<div><button onClick={this.props.click} >play against the computer</button></div>
        <div>Game {this.state.game+1} of {data.games.length} - LeafID: {currGame.leafID} - Res: {currGame.res} - Moves: {currGame.moves.length-1}</div>
      	<Display node={node} />
        <Board node={node} symm={this.state.symm} />
      </div>
    );
  }
}

export default Train;
