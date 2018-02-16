import React, { Component } from 'react';
import data from './data';
import Board from './Board';
import Display from './Display';

class Play extends Component {
  constructor(props) {
    super(props);
    this.state = {
      node: data.tree,
      first: false,
      player: false,
      symm: 0
    };
  }

  changePlayer() {
    var player = this.state.first;
    this.setState({node:data.tree,first:!player,player:!player,symm:0});
  }

  playAgain() {
    var player = this.state.first;
    this.setState({node:data.tree,symm:0,player:player});
  }

  squareClick(n,s) {
    this.setState({node:n,player:false,symm:s});
  }

  compMove() {
    var move = this.state.node.children.reduce(pick);
    this.setState({node:move,player:true});
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
      	<div>Symm: {this.state.symm}</div>
        <Display stats={this.state.node.stats} letter={this.state.letter} />
      	<Board node={this.state.node} symm={this.state.symm} click={(n,s)=>this.squareClick(n,s)} comp={!this.state.player} />
      </div>
    );
  }
}

export default Play;
