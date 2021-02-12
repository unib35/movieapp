import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { Button } from 'antd';


//=========================
//========FAVORITE=========
//=========================


function Favorite(props) {
	
	let variables = {}
	
	if(props.movie) {
		
		const movieId = props.movieId
		const userFrom = props.userFrom
		const movieTitle = props.movieInfo.title
		const moviePost = props.movieInfo.backdrop_path
		const movieRunTime = props.movieInfo.runtime
		
		variables = {
			userFrom,
			movieId,
			movieTitle,
			moviePost,
			movieRunTime
		}
		
	} else if(props.cast) {
		
		const castId = props.castId
		const userFrom = props.userFrom
		const castName = props.castInfo.name
		const castPost = props.castInfo.profile_path
		const castDepartment = props.castInfo.known_for_department
		const placeOfBirth = props.castInfo.place_of_birth
		
		variables = {
			castId,
			userFrom,
			castName,
			castPost,
			castDepartment,
			placeOfBirth
		}
		
	}
	
	const [FavoriteNumber, setFavoriteNumber] = useState(0)
	const [Favorited, setFavorited] = useState(false)
	
	useEffect(() => {
		
		
		//server에 요청을 보낼때 variables에 정보를 담아 함께 보내야
		//올바른 정보를 받을 수 있음.
		Axios.post('/api/favorite/favoriteNumber', variables)
			.then(response => {
				if(response.data.success) {
					//사람들이 favorite리스트에 추가한 수를 setFavoriteNumber state에 담아줌
					setFavoriteNumber(response.data.favoriteNumber)
				} else {
					alert('숫자정보를 가져오는데 실패하였습니다.')
				}
		})
		
		Axios.post('/api/favorite/favorited', variables)
			.then(response => {
				if(response.data.success) {
					//리스트에 추가했는지 안했는지 판별값(true/false)을 setFavorited에 넣어줌
					setFavorited(response.data.favorited)
				} else {
					alert('정보를 가져오는데 실패하였습니다.')
				}
		})
		
	}, [])
	
	const onClickFavorite = () => {
		if(Favorited) {
			Axios.post('/api/favorite/removeFromFavorite', variables)
			.then(response => { 
				if(response.data.success) {
					
					setFavoriteNumber(FavoriteNumber - 1)
					setFavorited(!Favorited)
				} else {
					alert('Favorite 리스트에서 삭제하는것을 실패하였습니다.')
				}
			})
		} else {
			Axios.post('/api/favorite/addToFavorite', variables)
			.then(response => {
				if(response.data.success) {
					console.log(response.data)
					setFavoriteNumber(FavoriteNumber + 1)
					setFavorited(!Favorited)
				} else {
					alert('Favorite 리스트에 추가하는것을 실패하였습니다.')
				}
			})
			
		}
	}
	
	return(
		<div>
			{/*Favorited 값이 true 이면 1번 아니면 2번*/}
			<Button type="primary" onClick={onClickFavorite}>{Favorited ? "Not Favorite" : "Add to Favorite"} {FavoriteNumber}</Button>
		</div>
	)
}

export default Favorite;