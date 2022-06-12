const debug = require('debug')('favVideoDataMapper');
const dataBase = require('../config/db');
const ApiError = require('../errors/apiError');

module.exports = {

    async getAllFavVideoByUser(user_id) {

		const query = `SELECT 
        rawtube_video.id,
        rawtube_video.url_thumbnail,
        rawtube_video.duration,
        rawtube_video.title
        FROM rawtube_user_has_fav
        JOIN rawtube_video ON rawtube_video.id = rawtube_user_has_fav.video_id
        WHERE rawtube_user_has_fav.user_id = $1`;
		const value = [user_id];

		const data = (await dataBase.query(query, value)).rows;
		debug(`> getAllFavVideoByUser()`);
		if (!data) {
			throw new ApiError('No data found for > getAllFavVideoByUser()', 400);
		}

		return data;
	},

	async addFavVideo(user_id,video_id) {

		const query = `INSERT INTO rawtube_user_has_fav (user_id,video_id) VALUES ($1,$2) RETURNING *;`;
		const value = [user_id,video_id];

		const data = (await dataBase.query(query, value)).rows[0];
		debug(`> addFavVideo()`);
		if (!data) {
			throw new ApiError('No data found for > addFavVideo()', 400);
		}

		return data;
	},

    async deleteFavVideo(user_id,video_id) {

		const query = `DELETE FROM rawtube_user_has_fav
        WHERE video_id = $2
        AND user_id = $1
        RETURNING *;`;

		const value = [user_id,video_id];

		const data = (await dataBase.query(query, value)).rows[0];
		debug(`> deleteFavVideo()`);
		if (!data) {
			throw new ApiError('No data found for > addFavVideo()', 400);
		}

		return data;
	},

    async isExisteFavVideo(user_id,video_id) {

		const query = `SELECT * 
        FROM rawtube_user_has_fav
        where user_id = $1
        AND video_id = $2;`;

		const value = [user_id,video_id];

		const data = (await dataBase.query(query, value)).rows[0];
		debug(`> isExisteFavVideo()`);
		if (!data) {
			return true
		}

		return false;
	},

}