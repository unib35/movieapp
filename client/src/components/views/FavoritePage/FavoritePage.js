import React, { useEffect, useState } from 'react'
import './favorite.css';
import Axios from 'axios'
import { Button, Popover } from 'antd';
import { IMAGE_BASE_URL } from '../../Config'

function FavoritePage() {
	
	
	const [Favorites, setFavorites] = useState([])
	
	useEffect(() => {
		fetchFavorited()
	}, [])
	
	const fetchFavorited = () => {
		Axios.post('/api/favorite/getFavoritedMovie', 
			{ userFrom: localStorage.getItem('userId')})
			.then(response => {
				if(response.data.success) {
					//response.data 에 favorites를 state에 담아줌
					console.log(response.data)
					setFavorites(response.data.favorites)
				} else {
					alert('favorite 리스트를 가져오는데 실패하였습니다. ')
				}
		})
	}
	
	const onClickDelete = (movieId, userFrom) => {
		const variables = {
			movieId,
			userFrom
		}
		
		Axios.post('/api/favorite/removeFromFavorite', variables)
		.then(response => {
			if(response.data.success) {
				//FavoritePage 에서 remove 버튼을 눌렀을때
				//클라이언트에서 지워줘야 하기때문에 
				//새로운 결과값을 들고온 정보를 기반으로 새로운 화면을 리프레시 한다.
				fetchFavorited()
			} else {
				alert('리스트에서 지우는데 실패하였습니다.')
			}
		})
	}

	const renderCards = Favorites.map((favorite, index) => {
						
			const content = (
				<div>
					{favorite.moviePost ?
					<img src={`${IMAGE_BASE_URL}w500${favorite.moviePost}`} /> : "no image"}
				</div>
			)
		
			return <tr key = {index}>
				
					<Popover content={content} title={`${favorite.movieTitle}`}>
						<td>{favorite.movieTitle}</td>
					</Popover>
				
					<td>{favorite.movieRunTime} mins</td>
					<td>
						<Button onClick={() => onClickDelete(favorite.movieId, favorite.userFrom)}background-color='red' type="dashed" danger>Remove
						</Button>
					</td>
				</tr>
						
						})
	
	
	return(
	
		<div style={{ width: '85%', margin: '1rem auto'}}>
			<h2>Favorite Movies</h2>
			<hr />
			
			<table>
				<thead>
					<tr>
						<th>Movie Title</th>
						<th>Movie RunTime</th>
						<th>Remove the favorites</th>
					</tr>
				</thead>
				<tbody>
				
					{renderCards}
					
				</tbody>
			</table>
		</div>
	)
}


export default FavoritePage