import React, { Component } from 'react';
import data from './data';
import Board from './Board';
import Display from './Display';

class Play extends Component {
  constructor(props) {
    super(props);
    this.state = {
      node: data.tree,
      player: false,
      symm: 0
    };
  }

  squareClick(p) {

  }

  compMove() {
    var move = this.state.node.children.reduce(pick);
    this.setState({node:move,player:true});
    function pick(a,b) {
      return stats(b) > stats(a) ? b : a;
      function stats(n) {
        return (n.stats.wins-n.stats.losses)/n.total;
      }
    }
  }

  render() {
  	!this.state.player && setTimeout(()=>this.compMove(),1000);
    return (
      <div className="Play">
      	<div><button onClick={this.props.click} >watch comp train</button></div>
      	<Display node={this.state.node} />
      	<Board node={this.state.node} symm={this.state.symm} squareClick={(p)=>this.squareClick(p)} />
      </div>
    );
  }
}

export default Play;


//           compMove() {
//     var node;
//     if (this.state.node.children.length) {
//       var move = this.state.move+1;
//       node = data.games[this.state.game].moves[move];
//       this.setState({move:move,node:node});
//     }
//     else if (data.games[this.state.game+1]) {
//       var game = this.state.game+1;
//       node = data.games[game].moves[0];
//       this.setState({game:game,move:0,node:node});
//     }
//   }

// setTimeout(()=>this.compMove(),200);
//     var game = data.games[this.state.game];

