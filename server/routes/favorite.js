const express = require('express');
const router = express.Router();
const { Favorite } = require('../models/Favorite')

//express에서 제공하는 Router /api/favorite 까지는 index에 기재
router.post('/favoriteNumber', (req, res) => {
	
	let variables = {}
	
	if(req.body.movieId) {
		variables = {
			"movieId" : req.body.movieId
		}
	} else if(req.body.castID) {
		variables = {
			"castId" : req.body.castId
		}
	}
	
	//┌ req.body.movieId 
	//└ index.js에 body-parser을 이용하여 front에서 보내준 movieId를 받을수있음
	
	//mongoDB에서 favorite숫자를 가져오기
	//프론트에서 보내준 movieId 와 favoriteSchema에 있는 movieId 와 같은정보를 찾는다.
	Favorite.find(variables)
		.exec((err, info) => {
			if(err) return res.status(400).send(err)
		
			//프론트에 다시 숫자 정보를 보내주기
			//현재 info에 사람들이 좋아요를 얼마나 눌렀는지 Ex) [1,2,3] 과 같이 들어있다.
			//따라서 front에 숫자정보를 보내줄때 info의 길이를 보내주면 된다.
			//favoriteNumber에 info.length를 담아 클라이언트에 보내줌
			res.status(200).json({ success: true, favoriteNumber: info.length })
	})
	
})

router.post('/favorited', (req, res) => {
	
	let variables = {}
	
	if(req.body.movieId) {
		variables = {
			"movieId" : req.body.movieId,
			"userFrom": req.body.userFrom 
		}
	} else if(req.body.castID) {
		variables = {
			"castId" : req.body.castId,
			"userFrom": req.body.userFrom 
		}
	}
	
	//내가 이 영화를 Favorite 리스트에 넣었는지 정보를 DB에서 가져오기
	
	Favorite.find(variables)
		.exec((err, info) => {
			if(err) return res.status(400).send(err)
			//[]과 같이 빈값이 있다면 Favorite 리스트에 영화 추가를 하지않은것.
			//이것으로 Favorite 리스트에 영화를 추가했는지 안했는지 확인할 수 있음.
		
			let result = false;
			//리스트에 추가되어있다면 info.length가 1이상이 될것임.
			//그러므로 0이 아니면 결과값을 true로 줌
			if(info.length !== 0) {
				result = true
			}
			//favorited에 result를 담아 클라이언트에 'success:true' 와함께 값을 보내줌
			res.status(200).json({ success: true, favorited: result })
			
	})
	
})

router.post('/removeFromFavorite', (req, res) => {
	
	let variables = {}
	
	if(req.body.movieId) {
		variables = {
			"movieId" : req.body.movieId,
			"userFrom": req.body.userFrom 
		}
	} else if(req.body.castID) {
		variables = {
			"castId" : req.body.castId,
			"userFrom": req.body.userFrom 
		}
	}
	//movieId 와 userFrom에 맞는 정보들을 지워준다.
	Favorite.findOneAndDelete(variables)
		.exec((err, doc) => {
			if(err) return res.status(400).send(err)
			res.status(200).json({ success: true , doc })
	})
})

router.post('/addToFavorite', (req, res) => {
	const favorite = new Favorite(req.body)
	//req.body에 있는 정보들을 favorite doc에 저장됨.
	favorite.save((err, doc) => {
		if(err) return res.status(400).send(err)
		return res.status(200).json({ success: true })
	})
})

router.post('/getFavoritedMovie', (req, res) => {
	Favorite.find({ 'userFrom': req.body.userFrom })
		.exec((err, favorites) => {
			if(err) return res.status(400).send(err)
			return res.status(200).json({ success: true, favorites })
	})
})

router.post('/removeFromFavorite', (req, res) => {
	
	let variables = {}
	
	if(req.body.movieId) {
		variables = {
			"movieId" : req.body.movieId,
			"userFrom": req.body.userFrom 
		}
	} else if(req.body.castID) {
		variables = {
			"castId" : req.body.castId,
			"userFrom": req.body.userFrom 
		}
	}
	
    Favorite.findOneAndDelete(variables)
        .exec((err, result) => {
            if (err) return res.status(400).send(err)
            return res.status(200).json({ success: true })
        })

})


module.exports = router;
