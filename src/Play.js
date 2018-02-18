import React, { Component } from 'react';
import { tree } from './data';
import Board from './Board';
import Display from './Display';

class Play extends Component {
  constructor(props) {
    super(props);
    this.state = {
      node: tree,
      first: false,
      player: false,
      symm: 1
    };
  }

  changePlayer() {
    var player = this.state.first;
    this.setState({node:tree,first:!player,player:!player,symm:1});
  }

  playAgain() {
    var player = this.state.first;
    this.setState({node:tree,symm:Math.ceil(Math.random()*8),player:player});
  }

  squareClick(p) {
    console.log('CLICKED',p)
    var node = this.state.node.children.filter(c=>c.moves[p])[0];
    console.log('MOVE',node)

    this.setState({node:node,player:false});
  }

  isSameBoard(b1,b2) {
    for (var key in b1) {
      if (b1[key] !== b2[key]) {
        return false;
      }
    }
    return true;
  }

  compMove() {
    var node = this.state.node.children.reduce(pick);
    var moves = Object.keys(node.moves);
    var symms = node.moves[moves[Math.floor(Math.random()*moves.length)]];
    var symm = symms[Math.floor(Math.random()*symms.length)];
    console.log(node,moves,symm)
    this.setState({node:node,player:true,symm:symm+1});
    function pick(a,b) {
      return stats(b) > stats(a) ? b : a;
      function stats(n) {
        return (n.stats.wins-n.stats.losses)/n.stats.total;
      }
    }
  }

  render() {
  	!this.state.player && this.state.node.children.length && setTimeout(()=>this.compMove(),1000);
    return (
      <div className="Play">
      	<div><button onClick={this.props.click} >watch comp train</button><button onClick={()=>this.changePlayer()} >{this.state.first ? 'let the comp go first' : 'you go first'}</button><button onClick={()=>this.playAgain()}>play again</button></div>
        <Display stats={this.state.node.stats} letter={this.state.node.letter} />
      	<Board node={this.state.node} symm={this.state.symm} click={(p)=>this.squareClick(p)} comp={!this.state.player} />
        <div>currSymm = {this.state.symm}</div>
      </div>
    );
  }
}

export default Play;
