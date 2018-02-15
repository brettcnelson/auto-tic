import React from 'react';
import './Board.css';
import Square from './Square';

function Board(props) {
	var symms = [[1,2,3,4,5,6,7,8,9],[7,4,1,8,5,2,9,6,3],[9,8,7,6,5,4,3,2,1],[3,6,9,2,5,8,1,4,7],[3,2,1,6,5,4,9,8,7],[9,6,3,8,5,2,7,4,1],[7,8,9,4,5,6,1,2,3],[1,4,7,2,5,8,3,6,9]];
	var squares = [[1,2,3],[4,5,6],[7,8,9]];

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
		return <Square key={i} s={s} val={props.node.board[s]} click={()=>squareClick(s)} />;
	}

	function makeTrainBoard(s,i) {
		return <Square key={i} s={s} val={props.node.board[s]} />;
	}

	function makeTieBoard(s,i) {
		return <Square key={i} s={s} val={props.node.board[s]} color={'yellow'} />;
	}

	function makeWinBoard(s,i) {
		var val = props.node.board[s];
		return props.node.res.some(w=>w===s) ?
			<Square key={i} s={s} val={val} color={'red'} /> :
			<Square key={i} s={s} val={val} color={'gray'} />;
	}

	function renderBoard(cb) {
		return squares.map((r,i)=><div key={i} >{r.map(cb)}</div>)
	}

	function squareClick(p) {
		props.squareClick && props.squareClick(p);
	}

	return (
		<div className='Board'>{makeBoard()}</div>
	)
}

export default Board;
