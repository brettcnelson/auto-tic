import React from 'react';
import './Board.css';
import Square from './Square';

function Board(props) {
	var symms = [[1,2,3,4,5,6,7,8,9],[7,4,1,8,5,2,9,6,3],[9,8,7,6,5,4,3,2,1],[3,6,9,2,5,8,1,4,7],[3,2,1,6,5,4,9,8,7],[9,6,3,8,5,2,7,4,1],[7,8,9,4,5,6,1,2,3],[1,4,7,2,5,8,3,6,9]];
	var currSymms = findSymms();

	function findSymms() {
		var board = props.node.board;
		return symms.filter(s=>s.every((v,i)=>board[v]===board[i+1]));
		// symmTransform(v)
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
		return !val ? <Square key={i} r={r} s={s} click={()=>squareClick(s)} /> : <Square key={i} r={r} s={s} val={val} />;
	}

	function makeTrainBoard(s,i) {
		var pos = symmTransform(s);
		return props.node.board[pos] || props.node.children.some(c=>c.pos===pos) ?
			<Square key={i} s={s} r={pos} val={symmVal(s)} /> :
			<Square key={i} s={s} r={pos} val={symmVal(s)} color={'gray'} />;
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
					// node = children[i].board[symmTransform(p,tempSymm)] ? children[i] : undefined;
					node = children[i];
				}
			}
		}
		var board1 = Object.assign({},node.board);
		var board2 = Object.assign({},props.node.board);
		board2[p] = props.node.letter === 'X' ? 'O' : 'X';
		tempSymm = symms.indexOf(symms.filter(symm=>symm.every((s,i)=>board1[i+1]===board2[s]))[0]);
		props.click(node,tempSymm);
	}

	return (
		<div className='Board'>
			<div>{makeBoard()}</div>
			<div>symms: {currSymms.length} - {JSON.stringify(currSymms.map(s=>symms.indexOf(s)))}<div>{JSON.stringify(currSymms)}</div></div>
		</div>
	)
}

export default Board;
