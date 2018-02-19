import React from 'react';
import './Symm.css';


function Symm(props) {
	return (
	  <div className="Symm">
	  <form >
	    <div>Symmetry:</div>
	    <div className="radio">
				<label>1</label>
				<input type='radio' value={0} checked={props.symm === 0} onChange={props.click} />
			</div>
			<div className="radio">
				<label>2</label>
				<input type='radio' value={1} checked={props.symm === 1} onChange={props.click} />
			</div>
			<div className="radio">
				<label>3</label>
				<input type='radio' value={2} checked={props.symm === 2} onChange={props.click} />
			</div>
			<div className="radio">
				<label>4</label>
				<input type='radio' value={3} checked={props.symm === 3} onChange={props.click} />
			</div>
			<div className="radio">
				<label>5</label>
				<input type='radio' value={4} checked={props.symm === 4} onChange={props.click} />
			</div>
			<div className="radio">
				<label>6</label>
				<input type='radio' value={5} checked={props.symm === 5} onChange={props.click} />
			</div>
			<div className="radio">
				<label>7</label>
				<input type='radio' value={6} checked={props.symm === 6} onChange={props.click} />
			</div>
			<div className="radio">
				<label>8</label>
				<input type='radio' value={7} checked={props.symm === 7} onChange={props.click} />
			</div>
			<div className="radio">
				<label>random</label>
				<input type='radio' value={-1} checked={props.random} onClick={props.click} />
			</div>
	  </form>
	  </div>
	)
}

export default Symm;
