import React, { Component } from 'react';
import Display from './Display';
import Board from './Board';

class Move extends Component {
  constructor(props) {
    super(props);
    this.state = {
      move: 0
    };
  }

  render() {
    return (
      <div className="Move">
      	<Display node={this.props.game.moves[this.state.move]} />
        <Board node={this.props.game.moves[this.state.move]} symm={this.props.symm} />
      </div>
    );
  }
}

export default Move;



        

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

    