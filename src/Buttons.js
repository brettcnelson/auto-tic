import React from 'react';
import './Buttons.css';

function Buttons(props) {
	function buttons() {
		if (props.play) {
			return <div><button onClick={props.switch} >watch comp train</button>{switchFirst()}</div>
		}
		return <button onClick={props.switch} >play against the computer</button>
		function switchFirst() {
			if (props.first) {
				return <button onClick={props.firstChange}>let the comp go first</button>
			}
			return <button onClick={props.firstChange}>let the human go first</button>
		}
	}

	return (
		<div className='Buttons'>{buttons()}</div>
	)
}

export default Buttons;
