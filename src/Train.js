import React, { Component } from 'react';
import { data } from './data';
import Display from './Display';
import Board from './Board';
import Symm from './Symm';
import './Play.css';

class Train extends Component {
  constructor(props) {
    super(props);
    this.state = {
      games:true,
      paused:false,
      game:0,
      move:0,
      symm:0,
      randSymm:false,
      delay: 500
    };
  }

  games() {
    return this.state.games ? data.games : data.all;
  }

  toggleGames() {
    var games = this.state.games;
    this.setState({games:!games,paused:true,game:0,move:0});
    setTimeout(()=>this.setState({paused:false}),this.state.delay);
  }

  togglePause() {
    var paused = this.state.paused;
    this.setState({paused:!paused});
  }

  changeSpeed() {
    var oldSpeed = this.state.delay;
    var speed = prompt(`${oldSpeed} - ms b/w moves`);
    if (Number(speed)) {
      this.setState({delay:speed,paused:true});
      setTimeout(()=>this.setState({paused:false}),oldSpeed);
    }
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

  render() {
    var games = this.games();
    var currGame = games[this.state.game];
    var node = currGame.moves[this.state.move];
    if (!this.state.paused) {
      if (currGame.moves[this.state.move+1]) {
        var move = this.state.move;
        setTimeout(()=>!this.state.paused && this.setState({move:move+1}),this.state.delay);
      }
      else if (games[this.state.game+1]) {
        var game = this.state.game;
        var symm = this.state.randSymm ? this.randomSymm() : this.state.symm;
        setTimeout(()=>!this.state.paused && this.setState({game:game+1,move:0,symm:symm}),this.state.delay);
      }
    }
    return (
      <div className="Train">
      	<div className="buttons"><button onClick={()=>this.props.click()} >play against the computer</button></div>
        <div className="buttons">Game {this.state.game+1} of {games.length} - LeafID: {currGame.leafID} - Res: {currGame.res} - Moves: {currGame.moves.length-1}</div>
      	<Display stats={node.stats} letter={node.letter} />
        <div className="buttons"><button onClick={()=>this.toggleGames()} >{this.state.games ? 'build tree' : 'training games'}</button><button onClick={()=>this.togglePause()}>{this.state.paused ? 'resume' : 'pause'}</button><button onClick={()=>this.changeSpeed()}>change speed</button></div>
        <Symm click={(e)=>this.changeSymm(e)} random={this.state.randSymm} symm={this.state.symm} />
        <Board node={node} symm={this.state.symm} />
      </div>
    );
  }
}

export default Train;
