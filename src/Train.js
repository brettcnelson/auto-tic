import React, { Component } from 'react';
import data from './data';
import Display from './Display';
import Board from './Board';

class Train extends Component {
  constructor(props) {
    super(props);
    this.state = {
      paused: false,
      game:0,
      move:0,
      symm:0,
      randSymm:false,
      delay: 1000
    };
  }

  togglePause() {
    var paused = this.state.paused;
    this.setState({paused:!paused});
  }

  changeSpeed() {
    var oldSpeed = this.state.delay;
    var speed = prompt('ms b/w moves');
    this.setState({delay:speed,paused:true});
    setTimeout(()=>this.setState({paused:false}),oldSpeed);
  }

  changeSymm() {
    var symm = prompt('0-7');
    symm === '-1' ? this.setState({paused:true,symm:this.randomSymm(),randSymm:true}) : this.setState({paused:true,symm:symm});
  }

  randomSymm() {
    return Math.floor(Math.random()*8);
  }

  render() {
    var currGame = data.games[this.state.game];
    if (!this.state.paused) {
      if (currGame.moves[this.state.move+1]) {
        var move = this.state.move;
        setTimeout(()=>!this.state.paused && this.setState({move:move+1}),this.state.delay);
      }
      else if (data.games[this.state.game+1]) {
        var game = this.state.game;
        var symm = this.state.randSymm ? this.randomSymm() : this.state.symm;
        setTimeout(()=>!this.state.paused && this.setState({game:game+1,move:0,symm:symm}),this.state.delay);
      }
    }
    var node = currGame.moves[this.state.move];
    return (
      <div className="Train">
      	<div><button onClick={()=>this.props.click()} >play against the computer</button><button onClick={()=>this.togglePause()}>{this.state.paused ? 'resume' : 'pause'}</button><button onClick={()=>this.changeSymm()}>change symm</button><button onClick={()=>this.changeSpeed()}>change speed</button></div>
        <div>Game {this.state.game+1} of {data.games.length} - LeafID: {currGame.leafID} - Res: {currGame.res} - Moves: {currGame.moves.length-1} - Symm: {this.state.symm}</div>
      	<Display node={node} />
        <Board node={node} symm={this.state.symm} />
      </div>
    );
  }
}

export default Train;
