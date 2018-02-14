import React, { Component } from 'react';
import './App.css';
import data from './data'

class App extends Component {
  render() {
    return (
      <div className="App">
        {data.games.map(g=>g.moves.map((m,j)=><div key={j} >{JSON.stringify(m.boards[0],null,2)}</div>))}
      </div>
    );
  }
}

export default App;

// (({ a, c }) => ({ a, c }))(object);