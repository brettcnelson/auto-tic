import React from 'react';
import './Board.css';
import Square from './Square';

function Board(props) {
	var squares = [[1,2,3],[4,5,6],[7,8,9]];

	function makeBoard() {
		if (!props.node.res) {return renderBoard(makeSquare)}
		if (!Array.isArray(props.node.res)) {return renderBoard(makeTieBoard)}
		return renderBoard(makeWinBoard);
	}

	function makeSquare(s,i) {
		return <Square key={i} s={s} val={props.node.boards[props.symm][s]} click={()=>squareClick(s)} />
	}

	function makeTieBoard(s,i) {
		return <Square key={i} s={s} val={props.node.boards[props.symm][s]} color={'yellow'} />
	}

	function makeWinBoard(s,i) {
		var symms = [[1,2,3,4,5,6,7,8,9],[7,4,1,8,5,2,9,6,3],[9,8,7,6,5,4,3,2,1],[3,6,9,2,5,8,1,4,7],[3,2,1,6,5,4,9,8,7],[9,6,3,8,5,2,7,4,1],[7,8,9,4,5,6,1,2,3],[1,4,7,2,5,8,3,6,9]];
		var transform = props.node.boards[props.symm];
		return props.node.res.some(w=>symms[props.symm].indexOf(s)===symms[0].indexOf(w)) ?
			<Square key={i} s={s} val={transform[s]} color={'green'} /> :
			<Square key={i} s={s} val={transform[s]} color={'red'} />;
	}

	function renderBoard(cb) {
		return squares.map((r,i)=><div key={i} >{r.map(cb)}</div>)
	}

	function squareClick(p) {
		props.squareClick && props.squareClick(p);
	}

	return (
		<div className='Board'>
			{makeBoard()}
		</div>
	)
}

export default Board;
