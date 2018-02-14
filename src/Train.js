import React, { Component } from 'react';
import data from './data';
import Board from './Board';
import Display from './Display';

class Train extends Component {
  constructor(props) {
    super(props);
    this.state = {
      node: data.games[0].moves[0],
      game: 0,
      move: 0,
      symm: 2
    };
  }

  compMove() {
  	var node;
  	if (this.state.node.children.length) {
  		var move = this.state.move+1;
  		node = data.games[this.state.game].moves[move];
  		this.setState({move:move,node:node});
  	}
  	else if (data.games[this.state.game+1]) {
  		var game = this.state.game+1;
  		node = data.games[game].moves[0];
  		this.setState({game:game,move:0,node:node});
  	}
  }

  render() {
  	setTimeout(()=>this.compMove(),200);
  	var game = data.games[this.state.game];
    return (
      <div className="Train">
      	<div><button onClick={this.props.click} >play against the computer</button></div>
      	<div>Game: {this.state.game+1} of {data.games.length} - LeafID: {game.leafID} - Res: {game.res} - Moves: {game.moves.length-1}</div>
      	<Display node={this.state.node} />
      	<Board node={this.state.node} symm={this.state.symm} />
      </div>
    );
  }
}

export default Train;
