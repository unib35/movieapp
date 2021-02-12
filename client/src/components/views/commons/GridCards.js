import React from 'react';
import { Col, Popover } from 'antd';


function GridCards(props) {
	
	console.log(props.placeOfBirth)

	const actorGridPopoverContent = (
	<div>
		<p>popularity : {props.popularity}</p>
		<p>{props.placeOfBirth}</p>
		<p>{props.department}</p>
		
	</div>
)
	
	
	if (props.landingPage) {
		return (
			<Col xl= {4} lg= {6} md= {8} sm= {12} xs={24}>
			<div style={{ position: 'relative'}}>
				{/*LandingPage에서 props로 넘겨준 정보들을 받아 화면에 출력*/}
				<a href= {`/movie/${props.movieId}`}>
					<img style={{width:'100%', height:'400px'}} src={props.image} alt= {props.movieName}/>
				</a>
			</div>
		</Col>
		)
	} else {
		return (
			<Col xl= {4} lg= {6} md= {8} sm= {12} xs={24}>
			<div style={{ position: 'relative'}}>
				{/*LandingPage에서 props로 넘겨준 정보들을 받아 화면에 출력*/}
				<a href= {`/cast/${props.castId}`}>
					<Popover title={props.name} content={actorGridPopoverContent}>
						<img style={{width:'100%', height:'320px'}} src={props.image} alt= {props.characterName}/>
					</Popover>
				</a>
			</div>
		</Col>
		
		
		)
	}
}

export default GridCards