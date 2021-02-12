import React from 'react';

function CastProfile(props) {
	
	
	return(
		<div>
			<div style={{ position: 'relative'}}>
				<img style={{width:'200px', height:'300px'}} src={props.image} alt= {props.name}/>
			</div>
		</div>
	)
}

export default CastProfile;