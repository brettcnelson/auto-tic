import React from 'react';
import './Board.css';
import Square from './Square';

function Board(props) {
	var symms = [[1,2,3,4,5,6,7,8,9],[7,4,1,8,5,2,9,6,3],[9,8,7,6,5,4,3,2,1],[3,6,9,2,5,8,1,4,7],[3,2,1,6,5,4,9,8,7],[9,6,3,8,5,2,7,4,1],[7,8,9,4,5,6,1,2,3],[1,4,7,2,5,8,3,6,9]];
	var currSymms = findSymms();

	function findSymms() {
		var board = props.node.board;
		return symms.filter(s=>s.every((v,i)=>board[v]===board[i+1]));
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

	function playingBoard() {
		return renderBoard(makeSquare);
	}

	function computerBoard() {
		return renderBoard(makeCompBoard);
	}

	function makeCompBoard(s,i) {
		return <Square key={i} s={s} r={symmTransform(s)} val={symmVal(s)} /> 
	}

	function trainingBoard() {
		return renderBoard(makeTrainBoard);
	}

	function makeSquare(s,i) {
		var val = symmVal(s);
		var r = symmTransform(s);
		return !val ? <Square key={i} r={r} s={s} click={()=>squareClick(r)} /> : <Square key={i} r={r} s={s} val={val} />;
	}

	function makeTrainBoard(s,i) {
		var pos = symmTransform(s);
		return props.node.board[pos] || props.node.children.some(c=>c.pos===pos) ?
			<Square key={i} s={s} val={symmVal(s)} /> :
			<Square key={i} s={s} val={symmVal(s)} color={'gray'} />;
	}

	function makeTieBoard(s,i) {
		return <Square key={i} s={s} val={symmVal(s)} color={'yellow'} />;
	}

	function makeWinBoard(s,i) {
		var val = symmVal(s);
		return props.node.res.some(win=>win.some(w=>w===symmTransform(s))) ?
			<Square key={i} s={s} val={val} color={'red'} /> :
			<Square key={i} s={s} val={val} color={'gray'} />;
	}

	function renderBoard(cb) {
		var squares = [[1,2,3],[4,5,6],[7,8,9]];
		return squares.map((r,i)=><div key={i} >{r.map(cb)}</div>)
	}

	function symmVal(s,symm) {
		return props.node.board[symmTransform(s,symm)];
	}

	function symmTransform(s,symm) {
		return symms[symm !== undefined ? symm : props.symm][s-1];
	}

	function squareClick(p) {
		var node;
		var children = props.node.children;
		var tempSymm;
		var j = 0;
		while (!node) {
			tempSymm = symms.indexOf(currSymms[j++]);
			for (var i = 0 ; i < children.length ; i++) {
				if (children[i].pos === symmTransform(p,tempSymm)) {
					node = children[i]
				}
			}
		}
		props.click(node,tempSymm)
		// function isSameBoard(b1,b2) {
		// 	for (var key in b1) {
		// 		if (b1[key] !== b2[key]) {
		// 			return false;
		// 		}
		// 	}
		// 	return true;
		// }
	}

	return (
		<div className='Board'>
			<div>symms: {currSymms.length}</div>
			<div>{makeBoard()}</div>
		</div>
	)
}

export default Board;
