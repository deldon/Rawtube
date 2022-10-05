const debug = require('debug')('likeDataMapper-');
const dataBase = require('../config/db');
const ApiError = require('../errors/apiError');

module.exports = {

	async addLike(userId,videoId) {
		const query = `
		INSERT INTO rawtube_user_has_like  (user_id, video_id)
        VALUES 
        ($1,$2)
        RETURNING *`

		const values = [userId,videoId]
		const data = (await dataBase.query(query, values)).rows[0];

		debug(`> addLike()`);
		if (!data) {
			return false
		}

		return true;

	},

    async deleteLike(userId,videoId) {
		const query = `
        DELETE FROM rawtube_user_has_like
        WHERE user_id = $1 and video_id = $2
        RETURNING *`

		const values = [userId,videoId]
		const data = (await dataBase.query(query, values)).rows[0];

		debug(`> addLike()`);
		if (!data) {
			return false
		}

		return true;

	},

    async countLike(videoId) {
		const query = `
        select count(*)
        from rawtube_user_has_like
        where video_id = $1`

		const values = [videoId]
		const data = (await dataBase.query(query, values)).rows[0];

		debug(`> countLike()`);
		if (!data) {
			throw new ApiError('No data found for > countLike()', 400);
		}

		return data;

	},

}