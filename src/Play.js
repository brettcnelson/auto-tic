import React, { Component } from 'react';
import { tree } from './data';
import Board from './Board';
import Display from './Display';
import Symm from './Symm';

class Play extends Component {
  constructor(props) {
    super(props);
    this.state = {
      node: tree,
      first: false,
      player: false,
      randSymm: false,
      symm: 0
    };
  }

  changeSymm(e) {
    var val = Number(e.target.value);
    val === -1 ? 
      this.setState({paused:true,symm:this.randomSymm(),randSymm:true}) : 
      this.setState({paused:true,symm:val,randSymm:false});
  }

  randomSymm() {
    return Math.floor(Math.random()*8);
  }

  changePlayer() {
    var player = this.state.first;
    this.setState({node:tree,first:!player,player:!player,symm:0});
  }

  playAgain() {
    var player = this.state.first;
    this.setState({node:tree,player:player});
  }

  squareClick(p) {
    console.log('CLICKED',p)
    var node = this.state.node.children.filter(c=>c.boards[this.state.symm][p])[0];
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
    this.setState({node:node,player:true});
    function pick(a,b) {
      return stats(b) > stats(a) ? b : a;
      function stats(n) {
        return (n.stats.wins-n.stats.losses)/n.stats.total;
      }
    }
  }

  render() {
  	!this.state.player && !this.state.node.res && setTimeout(()=>this.compMove(),1000);
    return (
      <div className="Play">
      	<div><button onClick={this.props.click} >watch comp train</button></div>
        <Display stats={this.state.node.stats} letter={this.state.node.letter} />
        <div><button onClick={()=>this.changePlayer()} >{this.state.first ? 'let the comp go first' : 'you go first'}</button><button onClick={()=>this.playAgain()}>play again</button></div>
        <Symm click={(e)=>this.changeSymm(e)} random={this.state.randSymm} symm={this.state.symm} />
        <Board node={this.state.node} symm={this.state.symm} click={(p)=>this.squareClick(p)} comp={!this.state.player} />
      </div>
    );
  }
}

export default Play;
