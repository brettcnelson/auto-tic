import React from 'react';
import Game from './Game';

function Train(props) {
  return (
    <div className="Train">
    	<div><button onClick={props.click} >play against the computer</button></div>
    	<Game />
    </div>
  );
}

export default Train;
