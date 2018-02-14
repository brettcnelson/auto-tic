import React from 'react';
import './Board.css';
import Square from './Square'

function Board(props) {
	function makeSquare(s,i) {
		return <Square key={i} s={s} val={props.node.boards[props.symm][s]} />
	}

	return (
		<div className='Board'>
			{[[1,2,3],[4,5,6],[7,8,9]].map((r,i)=><div key={i} >{r.map(makeSquare)}</div>)}
		</div>
	)
}

export default Board;
