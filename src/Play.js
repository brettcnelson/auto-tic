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
  	var symm = this.state.symm;
  	var move = this.state.node.children.filter(c=>data.symms[symm].indexOf(c.pos)===data.symms[0].indexOf(p));
  	while (!move) {
  		console.log('symm search',move)
  		symm++;
  		move = this.state.node.children.filter(c=>data.symms[symm].indexOf(c.pos)===data.symms[0].indexOf(p));
  	}
  	this.setState({node:move[0],player:false,symm:symm});
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
