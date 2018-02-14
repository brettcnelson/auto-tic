import React from 'react';
import './Square.css';

function Square(props) {
	return (
		<div className='Square' style={props.color && {background:props.color}} onClick={props.click} >{props.val}</div>
	)
}

export default Square;
