import React, { useEffect, useState } from 'react'
import { FaCode } from "react-icons/fa";
import { API_URL, API_KEY, IMAGE_BASE_URL } from '../../Config'
import MainImage from './Sections/MainImage'
import GridCards from '../commons/GridCards'
import { Row } from 'antd'
import replacePoster from '../commons/toReplaceImage/GreenImage.jpeg'


function LandingPage() {
	
	//가져온 영화정보들을 하나하나 Movies State에 담아주기 위해 생성
	const [Movies, setMovies] = useState([])
	const [MainMovieImage, setMainMovieImage] = useState(null)
	//LoadMore버튼이 눌려질때마다 다음페이지를 불러와야하기때문에 CurrentPage State를 만들어줌
	const [CurrentPage, setCurrentPage] = useState(0)
	
	//useEffect => APP이 로드되자마자 실행되는부분
	useEffect(() => {
		const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
		fetchMovies(endpoint)
	
	}, [])
	
	//코드중복을 막기위해 fetchMovies라는 함수를 만들어 활용
	const fetchMovies = (endpoint) => {
		//fetch를 이용해 endpoint에 담겨진곳에서 결과를 가져옴
		fetch(endpoint)
		//결과값을 바로 이용할순 없고, json 메소드를 이용해서 읽어올수있음
		.then(response => response.json())
		//json 메소드를 이용하여 결과값을 가져온다.
		.then(response => {
			//가져온 영화정보들을 생성한 moviesate에 담아줌
			//response.results => console.log로 확인
			console.log(response)
			//배열안에 배열을 넣으면 오류발생 하나의 배열인덱스에 하나의 값을 넣어주어야함.
			//+ ...Movies -> loadMoreItems버튼이 작동될때 그냥 현재에 덮어쓰는것이 아니라
			//아래로 추가되도록 만들어줌.
			setMovies([...Movies, ...response.results])
			//모든 영화들의 첫번째 영화를 랜딩페이지의 메인 영화 이미지로 사용
			setMainMovieImage(response.results[0])
			//moive정보에 page정보가 존재한다. 따라서 setCurrentPage에 page정보를 삽입.
			setCurrentPage(response.page)
		})
	}
	
	//LoadMore 버튼이 클릭되었을때 아래의 함수 실행
	const loadMoreItems = () => {
		const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${CurrentPage + 1}`;
		fetchMovies(endpoint)
	}
	
	
	
    return (
        <div style={{ width: '100%', margin: '0'}}>
			
			{/* Main image */}
			{/* MainMovieImage에 backdrop_path를 가져오기전에 페이지를 렌더링해버리기 때문에 오류발생함.*/}
			{/* 따라서 아래의 구문을 통해 backdrop_path를 가져오면 렌더링하도록 함.*/}
			{MainMovieImage &&
				
				<MainImage
					//아래의 정보들을 Mainimage.js에 props를 이용해 뿌려줌.
					//=> Mainimage.js 에서 css 코딩을 하는것
					
					//MainMovieImage에 response.result[0]이 들어있음
					//=> 따라서 영화의 포스터 정보들을 가져옴 (backdrop_path)
					landingPage
					image={`${IMAGE_BASE_URL}w1280${MainMovieImage.backdrop_path}`}
					title={MainMovieImage.title}
					text={MainMovieImage.overview}
				/>
			}
			<div style={{ width: '85%', margin: '1rem auto'}}>
				
				<h2>Movies by latest</h2>
				<hr />
				
				{/* Movie Grid Cards */}
				
				<Row gutter={[16, 16]}>
				{/*useState에 담겨진 영화정보들을 가져옴.*/}
				{/*movie, index -> 하나의 영화정보, */}
				{Movies && Movies.map((movie, index) => (
						//키값을 넣어줘야 에러가 나지않는다.
						//Fragments는 DOM에 별도의 노드를 추가하지 않고 여러 자식을 그룹화할 수 있다.
						<React.Fragment key={index}>
							{/*아래의 정보들을 props를 이용하여 GridCards에 뿌려줌*/}
							<GridCards
								//GridCards.js에서 MovieDetail파트랑 구분하기 위함.
								landingPage
								// command1 : command 2
								//무비정보에 포스터 존재 -> command1 없으면 -> command2

								image={movie.poster_path ?
								`${IMAGE_BASE_URL}w500${movie.poster_path}`: replacePoster }
								movieId={movie.id}
								movieName={movie.original_title}
							/>
						</React.Fragment>
					))}
				</Row>
			</div>
			
			<div style={{ display: 'flex', justifyContent: 'center' }}>
				<button onClick={loadMoreItems}>Load More</button>
			</div>
		</div>
			
    )
}

export default LandingPage
