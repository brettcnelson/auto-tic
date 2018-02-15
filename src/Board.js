import React from 'react';
import './Board.css';
import Square from './Square';

function Board(props) {
	function makeBoard() {
		if (props.node.res) {
			return endBoard();
		}
		if (props.click) {
			return playingBoard();
		}
		return trainingBoard();
	}

	function endBoard() {
		if (Array.isArray(props.node.res)) {
			return renderBoard(makeWinBoard);
		}
		return renderBoard(makeTieBoard);
	}

	function playingBoard() {
		return renderBoard(makeSquare);
	}

	function trainingBoard() {
		return renderBoard(makeTrainBoard);
	}

	function makeSquare(s,i) {
		// TODO: add non clicks for occupied vals
		return <Square key={i} s={s} val={symmVal(s)} click={()=>squareClick(s)} />;
	}

	function makeTrainBoard(s,i) {
		return <Square key={i} s={s} val={symmVal(s)} />;
	}

	function makeTieBoard(s,i) {
		return <Square key={i} s={s} val={symmVal(s)} color={'yellow'} />;
	}

	function makeWinBoard(s,i) {
		var val = symmVal(s);
		return props.node.res.some(w=>w===symmTransform(s)) ?
			<Square key={i} s={s} val={val} color={'red'} /> :
			<Square key={i} s={s} val={val} color={'gray'} />;
	}

	function renderBoard(cb) {
		var squares = [[1,2,3],[4,5,6],[7,8,9]];
		return squares.map((r,i)=><div key={i} >{r.map(cb)}</div>)
	}

	function symmVal(s) {
		return props.node.board[symmTransform(s)];
	}

	function symmTransform(s) {
		var symms = [[1,2,3,4,5,6,7,8,9],[7,4,1,8,5,2,9,6,3],[9,8,7,6,5,4,3,2,1],[3,6,9,2,5,8,1,4,7],[3,2,1,6,5,4,9,8,7],[9,6,3,8,5,2,7,4,1],[7,8,9,4,5,6,1,2,3],[1,4,7,2,5,8,3,6,9]];
		return symms[props.symm][s-1];
	}

	function squareClick(p) {
		props.squareClick && props.squareClick(p);
	}

	return (
		<div className='Board'>{makeBoard()}</div>
	)
}

export default Board;
