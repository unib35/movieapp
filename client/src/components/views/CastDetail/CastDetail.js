import React, { useEffect, useState } from 'react';
import { API_URL, API_KEY, IMAGE_BASE_URL } from '../../Config'
import MainImage from '../LandingPage/Sections/MainImage'
import CastInfo from './Sections/CastInfo'
import Favorite from '../commons/Favorite'



function CastDetail(props) {
	
	let castId = props.match.params.castId
	
	const [Cast, setCast] = useState([])
	
	useEffect(() => {
		let endpointCast = `${API_URL}person/${castId}?api_key=${API_KEY}&language=en-US`;
		
		fetchCasts(endpointCast);
	}, [])
	
	const fetchCasts = (endpointCast) => {
		fetch(endpointCast)
		.then(response => response.json())
		.then(response => {
			setCast(response)
			console.log(response)
		})
	}
	
	return(
		<div style={{ width: '100%', margin: '0'}}>

			<div style={{ width: '85%', margin: '1rem auto'}}>
				<h2>{Cast.name}'s Detail Information</h2>
				<hr />
				{localStorage.getItem('userId') &&
					<div style={{ display: 'flex', justifyContent: 'flex-end' }}>
						<Favorite cast
							castId={castId}
							castInfo={Cast}
							userFrom= {localStorage.getItem('userId')}
						/>
					</div>
				}
				{/*	Cast Info */}
				<CastInfo 
					cast={Cast}
				/>
			</div>
		</div>
	) 

}

export default CastDetail;