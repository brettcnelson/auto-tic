import React from 'react';
import Radio from './Radio';

function Symm(props) {
	return (
	  <form style={{float:'right',padding:'1%'}}>
	    <div>Symmetry:</div>
	    {[0,1,2,3,4,5,6,7,-1].map((n,i)=><Radio key={i} val={n} checked={n > -1 ? props.symm===n : props.random} onChange={props.click} />)}
	  </form>
	)
}

export default Symm;
