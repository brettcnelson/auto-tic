import React, { Component } from 'react';
import data from './data';
import Move from './Move';

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      game: 0,
      symm: 0
    };
  }

  render() {
  	var game = data.games[this.state.game];
    return (
      <div className="Game">
      	<div>Game: {this.state.game+1} of {data.games.length} - LeafID: {game.leafID} - Res: {game.res} - Moves: {game.moves.length-1}</div>
      	<Move game={data.games[this.state.game]} symm={this.state.symm} />
      </div>
    );
  }
}

export default Game;
