import React, { useState, useEffect } from 'react';
import { API_URL, API_KEY, IMAGE_BASE_URL } from '../../Config'
import MainImage from '../LandingPage/Sections/MainImage'
import MovieInfo from './Sections/MovieInfo'
import replacePoster from '../commons/toReplaceImage/GreenImage.jpeg'
import GridCards from '../commons/GridCards'
import { Row, List } from 'antd';
import Favorite from '../commons/Favorite'
import LikeDislikes from './Sections/LikeDislikes'

function MovieDetail(props) {
	
	//Router를 이용하여 component 간에 props 뿌려주는 방법이다.
	//page routing을 하면서 data를 내려주는것 (router는 Client/APP.js에 존재)
	
	let movieId = props.match.params.movieId
	//params를 이용해 가져온 자세한 영화정보들을 담아주기 위해 만들어줌.
	const [Movie, setMovie] = useState([])
	const [Casts, setCasts] = useState([])
	const [ActorToggle, setActorToggle] = useState(false)
	
	
	useEffect(() => {
		
		let endpointCrew = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`
		
		let endpointInfo = `${API_URL}movie/${movieId}?api_key=${API_KEY}`
		
		fetch(endpointInfo)
			.then(response => response.json())
			.then(response => {
				//fetch로 가져온 정보를 setMovie state에 담아줌
				console.log(response.data)
				setMovie(response)
		})
		
		fetch(endpointCrew)
			.then(response => response.json())
			.then(response => {
				console.log('endpointCrew', response)
				//fetch를 이용해 가져온 정보 endpointCrew에서 출연진정보만 가져오기위해
				//response.cast만 useState에 넣어준다.
				setCasts(response.cast)
		})
		
	}, [])
	
	const toggleActorView = () => {
		//현재 ActorToggle값이 false이면 true로 true이면 false로 바꾸어준다.
		setActorToggle(!ActorToggle)
	}
	
	
	return(
		<div>
			{/* Header */}
			{Movie.backdrop_path &&
				<MainImage 
					moviedetail
					image={Movie.backdrop_path ? `${IMAGE_BASE_URL}w1280${Movie.backdrop_path}` : replacePoster }
					title={Movie.title}
					text={Movie.overview}	
				/>
			}
			{/* Body */}
			<div style={{ width: '85%', margin: '1rem auto'}}>
				{ localStorage.getItem('userId') &&
					<div style={{ display: 'flex', justifyContent: 'flex-end'}}>
						<Favorite movie
							movieInfo= {Movie}
							movieId= {movieId}
							//로그인할때 userId
							userFrom= {localStorage.getItem('userId')}
						/>
					</div>
				}
				
				{/* Movie Info */}
				<MovieInfo 
					//MovieInfo에 props를 이용해 뿌려줌.
					movie={Movie}
				/>
				
				<br />
				{/* Actors Grid */}
				
				<div style={{ display: 'flex', justifyContent: 'center', margin: '2rem' }}>	
				{/********LIKE****DISLIKE****FUNCTION*********/}
				<List.Item actions={[ <LikeDislikes />]}></List.Item>
				<br />
					<button onClick={toggleActorView}>Toggle Actor View</button>
				</div>
				{/*출연진 사진들을 ActorToggle이 True 일때만 실행하라.*/}
				{ActorToggle &&
					<Row gutter={[16, 16]}>

				{Casts && Casts.map((cast, index) => (
						
						<React.Fragment key={index}>
							{/*아래의 정보들을 props를 이용하여 GridCards에 뿌려줌*/}
							<GridCards
								image={cast.profile_path ?
								`${IMAGE_BASE_URL}w500${cast.profile_path}`: replacePoster }
								movieId={movieId}
								castId={cast.id}
								name={cast.name}
								popularity={cast.popularity}
								placeOfBirth={cast.place_of_birth}
								characterName={cast.original_title}
								department={cast.known_for_department}
							/>
						</React.Fragment>
					))}
				</Row>
				}
				
				
				
				
				
				
				
			</div>
		</div>
	)
}

export default MovieDetail