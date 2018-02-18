import React from 'react';
import './Board.css';
import { symms } from './data';
import Square from './Square';

function Board(props) {
	var board = props.node.board;
	// console.log(props.node)
	// console.log(props.node.children.map(c=>c.symms[props.symm-1]))

	function convert(s) {
		return symms[props.symm-1][s-1];
	}

	function makeBoard() {
		if (props.node.res) {
			return endBoard();
		}
		if (props.click) {
			return props.comp ? computerBoard() : playingBoard();
		}
		return trainingBoard();
	}

	function endBoard() {
		return Array.isArray(props.node.res) ? renderBoard(makeWinBoard) : renderBoard(makeTieBoard);
	}

	function makeWinBoard(s,i) {
		var square = convert(s);
		var val = board[square];
		return props.node.res.some(win=>win.some(w=>square===w)) ?
			<Square key={i} val={val} color={'red'} /> :
			<Square key={i} val={val} color={'gray'} />;
	}

	function makeTieBoard(s,i) {
		return <Square key={i} val={board[convert(s)]} color={'yellow'} />;
	}

	function computerBoard() {
		return renderBoard(makeCompBoard);
	}

	function makeCompBoard(s,i) {
		return <Square key={i} val={board[convert(s)]} /> 
	}

	function playingBoard() {
		return renderBoard(makeSquare);
	}

	function makeSquare(s,i) {
		var val = board[convert(s)];
		return !val ? <Square key={i} click={()=>squareClick(s)} /> : <Square key={i} val={val} />;
	}

	function trainingBoard() {
		return renderBoard(makeTrainBoard);
	}

	function makeTrainBoard(s,i) {
		var square = convert(s);
		return board[square] || props.node.children.some(c=>c.board[square]) ?
			<Square key={i} val={board[square]} /> :
			<Square key={i} color={'gray'} />;
	}

	function renderBoard(cb) {
		var squares = [[1,2,3],[4,5,6],[7,8,9]];
		return squares.map((r,i)=><div key={i} >{r.map(cb)}</div>)
	}

	function squareClick(p) {
		props.click(convert(p));
	}

	return (
		<div className='Board'>{makeBoard()}</div>
	)
}

export default Board;
