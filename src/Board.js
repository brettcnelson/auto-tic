import React from 'react';
import { symms } from './data';
import './Board.css';
import Square from './Square';

function Board(props) {
	var board = props.node.boards[props.symm].board;

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
		var val = board[s];
		return props.node.res.some(win=>win.some(w=>s===symms[props.symm-1][w-1])) ?
			<Square key={i} val={val} color={'red'} /> :
			<Square key={i} val={val} color={'gray'} />;
	}

	function makeTieBoard(s,i) {
		return <Square key={i} val={board[s]} color={'yellow'} />;
	}

	function computerBoard() {
		return renderBoard(makeCompBoard);
	}

	function makeCompBoard(s,i) {
		return <Square key={i} val={board[s]} /> 
	}

	function playingBoard() {
		return renderBoard(makeSquare);
	}

	function makeSquare(s,i) {
		var val = board[s];
		return !val ? <Square key={i} click={()=>squareClick(s)} /> : <Square key={i} val={val} />;
	}

	function trainingBoard() {
		return renderBoard(makeTrainBoard);
	}

	function makeTrainBoard(s,i) {
		return board[s] || props.node.children.some(c=>c.boards[props.symm].pos===s) ?
			<Square key={i} val={board[s]} /> :
			<Square key={i} color={'gray'} />;
	}

	function renderBoard(cb) {
		var squares = [[1,2,3],[4,5,6],[7,8,9]];
		return squares.map((r,i)=><div key={i} >{r.map(cb)}</div>)
	}

	function squareClick(p) {
		console.log(p)
	}

	return (
		<div className='Board'>{makeBoard()}</div>
	)
}

export default Board;
