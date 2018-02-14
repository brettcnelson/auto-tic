import React from 'react';
import './Square.css';

function Square(props) {
	return (
		<div className='Square'>{props.val}</div>
	)
}

export default Square;
