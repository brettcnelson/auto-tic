import React from 'react';
import './Display.css';

function Display(props) {
	var stats = props.stats;
	var x = props.letter === 'X' ? (stats.wins-stats.losses)/stats.total : (stats.losses-stats.wins)/stats.total;
	return (
		<div className='Display'>
			<div>{props.stats.total}</div>
			<div><div className='letter info' >X:</div><div className='ratio info' >{' ' + x}</div></div>
			<div><div className='letter info' >O:</div><div className='ratio info' >{''+ -x}</div></div>
		</div>
	)
}

export default Display;
