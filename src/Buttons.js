import React from 'react';
import './Buttons.css';

function Buttons(props) {
	function buttons() {
		if (props.play) {
			return <div><button>watch comp train</button>{switchFirst()}</div>
		}
		return <button>play against the computer</button>
		function switchFirst() {
			if (props.first) {
				return <button>let the comp go first</button>
			}
			return <button>let the human go first</button>
		}
	}

	return (
		<div className='Buttons'>{buttons()}</div>
	)
}

export default Buttons;