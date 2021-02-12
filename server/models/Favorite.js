const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const FavoriteSchema = mongoose.Schema({
    userFrom: {
		//ObjectId 만 가지고있으면 ref로 User 모델을 참조할수있다
		type: Schema.Types.ObjectId,
		ref: 'User',
	},
	movieId: {
		type: String
	},
	movieTitle: {
		type: String
	},
	moviePost: {
		type: String
	},
	movieRunTime: {
		type: String
	},
	castId: {
		type: String
	},
	castName: {
		type: String
	},
	castPost: {
		type: String
	},
	castPlaceOfBirth: {
		type: String
	}
}, { timestamps: true })

const Favorite = mongoose.model('Favorite', FavoriteSchema);

module.exports = { Favorite }