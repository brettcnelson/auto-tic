import React from 'react';

function Radio(props) {
	return (
		<div>
			<label>{props.val > -1 ? props.val+1 : 'random'}</label>
			<input type='radio' value={props.val} checked={props.checked} onChange={props.onChange} />
		</div>
	)
}

export default Radio;
