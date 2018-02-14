import React, { Component } from 'react';
import data from './data';
import Board from './Board';
import Display from './Display';

class Train extends Component {
  constructor(props) {
    super(props);
    this.state = {
      games: data.games,
      game: 0,
      move: 0,
      symm: 0
    };
  }

  compMove() {
    var move = this.state.node.children.reduce(pick);
    this.setState({player:true,node:move});
    function pick(a,b) {
      return stats(b) > stats(a) ? b : a;
      function stats(n) {
        return (n.stats.wins-n.stats.losses)/n.total;
      }
    }
  }

  render() {
  	var node = this.state.games[this.state.game].moves[this.state.move]
    return (
      <div className="Train">
      	<div><button onClick={this.props.click} >play against the computer</button></div>
      	<Display node={node} />
      	<Board node={node} symm={this.state.symm} />
      </div>
    );
  }
}

export default Train;
