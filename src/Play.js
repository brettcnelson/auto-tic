import React, { Component } from 'react';
import './Play.css';
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
      this.setState({symm:this.randomSymm(),randSymm:true}) : 
      this.setState({symm:val,randSymm:false});
  }

  randomSymm() {
    return Math.floor(Math.random()*8);
  }

  changePlayer() {
    var player = this.state.first;
    var symm = this.state.randSymm ? this.randomSymm() : this.state.symm;
    this.setState({node:tree,first:!player,player:!player,symm:symm});
  }

  playAgain() {
    var player = this.state.first;
    var symm = this.state.randSymm ? this.randomSymm() : 0;
    this.setState({node:tree,player:player,symm:symm});
  }

  squareClick(p) {
    var parent = this.state.node;
    var moveBoard = Object.assign({},parent.boards[this.state.symm]);
    moveBoard[p] = parent.letter === 'X' ? 'O' : 'X';
    var node;
    var symm;
    for (var i = 0 ; i < parent.children.length ; i++) {
      for (var j = 0 ; j < 8 ; j++) {
        if (this.isCompatibleBoard(moveBoard,parent.children[i].boards[j])) {
          node = parent.children[i];
          symm = j;
        }
      }
    }
    // this.state.randSymm && (symm = this.randomSymm());
    this.setState({node:node,player:false,symm:symm});
  }

  compMove() {
    var node = this.state.node.children.reduce(pick);
    var symm;
    if (this.state.randSymm && !node.res) {
      symm = this.randomSymm();
    }
    else {
      var parentBoard = this.state.node.boards[this.state.symm];
      symm = [this.state.symm];
      for (var i = 0 ; i < 8 ; i++) {
        if (i !== this.state.symm) {
          if (this.isCompatibleBoard(parentBoard,node.boards[i])) {
            symm.push(i);
          }
        }
      }
      symm = symm[Math.floor(Math.random()*symm.length)];
    }
    this.setState({node:node,player:true,symm:symm});
    function pick(a,b) {
      return stats(b) > stats(a) ? b : a;
      function stats(n) {
        return (n.stats.wins-n.stats.losses)/n.stats.total;
      }
    }
  }

  isCompatibleBoard(p,n) {
      for (var key in p) {
        if (p[key] !== n[key]) {
          return false;
        }
      }
      return true;
    }

  render() {
  	!this.state.player && !this.state.node.res && setTimeout(()=>this.compMove(),1000);
    return (
      <div className="Play">
      	<div className="buttons"><button onClick={this.props.click} >watch comp train</button></div>
        <Display stats={this.state.node.stats} letter={this.state.node.letter} />
        <div className="buttons"><button onClick={()=>this.changePlayer()} >{this.state.first ? 'let the comp go first' : 'you go first'}</button><button onClick={()=>this.playAgain()}>play again</button></div>
        <Symm click={(e)=>this.changeSymm(e)} symm={this.state.symm} random={this.state.randSymm} />
        <Board node={this.state.node} symm={this.state.symm} click={(p)=>this.squareClick(p)} comp={!this.state.player} />
      </div>
    );
  }
}

export default Play;
