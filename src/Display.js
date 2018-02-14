import React from 'react';
import './Display.css';

function Display(props) {
	var stats = props.node.stats;
	var x = props.node.letter === 'X' ? (stats.wins-stats.losses)/stats.total : (stats.losses-stats.wins)/stats.total;
	var o = props.node.letter === 'O' ? (stats.wins-stats.losses)/stats.total : (stats.losses-stats.wins)/stats.total;
	return (
		<div className='Display'>
			<div><div className='letter info' >X:</div><div className='ratio info' >{x}</div></div>
			<div><div className='letter info' >O:</div><div className='ratio info' >{o}</div></div>
		</div>
	)
}

export default Display;
