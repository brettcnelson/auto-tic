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
      randSymm: true,
      symm: this.randomSymm()
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
    var node = this.state.node.children.filter(c=>c.boards[this.state.symm][p])[0];
    this.setState({node:node,player:false});
  }

  compMove() {
    var node = this.state.node.children.reduce(pick);
    var symm = this.state.randSymm ? this.randomSymm() : this.state.symm;
    this.setState({node:node,player:true,symm:symm});
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
