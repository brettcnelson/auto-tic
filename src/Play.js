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
    this.setState({node:tree,symm:1,player:player});
  }

  squareClick(p) {
    var symm = this.state.symm;
    var children = this.state.node.children;
    var node = findChild(children,symm,p);
    if (!node) {
      symm = 0;
      while(!node) {
        symm++;
        node = findChild(children,symm,p);
      }
      var ghostBoard = Object.assign({},this.state.node.boards[this.state.symm].board);
      ghostBoard[p] = this.state.node.letter === 'X' ? 'O' : 'X';
      for (var key in node.boards) {
        if (this.isSameBoard(ghostBoard,node.boards[key].board)) {
          symm = key;
          break;
        }
      }
    }
    this.setState({node:node,player:false,symm:symm});
    
    function findChild(children,symm,p) {
      for (var i = 0 ; i < children.length ; i++) {
        if (children[i].boards[symm].pos === p) {
          return children[i];
        }
      }
    }
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
    var move = this.state.node.children.reduce(pick);
    var symms = [];
    var tempBoard = Object.assign({},move.boards[this.state.symm].board);
    for (var key in move.boards) {
      if (this.isSameBoard(tempBoard,move.boards[key].board)) {
        symms.push(Number(key));
      }
    }
    console.log(symms)
    this.setState({node:move,player:true,symm:symms[Math.floor(Math.random()*symms.length)]});
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
