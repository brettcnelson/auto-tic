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
    console.log(p);
    // var symm = this.state.symm;
    // var move = next(this.state.node);
    // while (!move.length) {
    //   symm++;
    //   move = next(this.state.node);
    // }
    // this.setState({node:move[0],player:false,symm:symm});
    // function next(n) {
    //   return n.children.filter(c=>c.pos===p);
    // }
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
      	<Board node={this.state.node} symm={this.state.symm} click={(p)=>this.squareClick(p)} />
      </div>
    );
  }
}

export default Play;
