import React from 'react';
import './Square.css';

function Square(props) {
	return (
		<div className='Square' style={props.color && {background:props.color}} onClick={props.click} ><div className='tempm'>s: {props.s} r: {props.r}</div><div className='temps'>{props.val}</div></div>
	)
}

export default Square;
