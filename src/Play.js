import React, { Component } from 'react';
import data from './data';
import Board from './Board';
import Display from './Display';

class Play extends Component {
  constructor(props) {
    super(props);
    this.state = {
      node: data.tree,
      player: false
    };
  }

  compMove() {
    var move = this.state.node.children.reduce(pick);
    this.setState({player:true,node:move});
    function pick(a,b) {
      return stats(b) > stats(a) ? b : a;
      function stats(n) {
        return (n.stats.wins-n.stats.losses)/n.total;
      }
    }
  }

  render() {
    return (
      <div className="Play">
      	<div><button onClick={this.props.click} >play against the computer</button></div>
      	<Display node={this.props.node} />
      	<Board node={this.props.node} />
      </div>
    );
  }
}

export default Play;
