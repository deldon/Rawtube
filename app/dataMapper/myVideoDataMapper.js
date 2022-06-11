const debug = require('debug')('MyVideoDataMapper');
const dataBase = require('../config/db');
const ApiError = require('../errors/apiError');

module.exports = {
	async addVideo(form) {

		const query = `SELECT * FROM add_video($1);`;
		const value = [form];

		const data = (await dataBase.query(query, value)).rows[0];
		debug(`> addVideo()`);
		if (!data) {
			throw new ApiError('No data found for > addVideo()', 400);
		}

		return data;
	},

	async getAllMyVideo(user_id) {

		const query = `SELECT 
        rawtube_video.id,
        rawtube_video.url_thumbnail,
        rawtube_video.duration,
        rawtube_video.title,
        rawtube_video.public,
        rawtube_video.release_date,
        rawtube_video.views,
        (SELECT COUNT(*) 
            FROM rawtube_commentaries
            WHERE rawtube_commentaries.video_id = rawtube_video.id) AS commentaries
        FROM rawtube_video
        WHERE rawtube_video.user_id = $1`;

		const values = [user_id]

		const data = (await dataBase.query(query, values)).rows;
		debug(`> getAllMyVideo()`);
		if (!data) {
			throw new ApiError('No data found for > getAllMyVideo()', 400);
		}

		return data;
	},

	async getForUptadeMyVideo(video_id, user_id) {

		const query = `SELECT 
        rawtube_video.id,
        rawtube_video.title,
        rawtube_video.url_thumbnail,
        rawtube_video.description,
        rawtube_video.public
        FROM rawtube_video
        WHERE rawtube_video.id = $1
        AND rawtube_video.user_id = $2`;

		const values = [video_id, user_id]

		const data = (await dataBase.query(query, values)).rows[0];
		debug(`> getForUptadeMyVideo()`);
		if (!data) {
			throw new ApiError('No data found for > getForUptadeMyVideo()', 400);
		}

		return data;
	},

	async uptadeMyVideo(form, videoId) {

		let public = Boolean()
		if (form.public == 'true') {
			public = true;
		} else {
			public = false;
		}

		const query = `UPDATE rawtube_video
      	SET 
      	title = $1, 
      	description = $2, 
      	public = $3
      	WHERE rawtube_video.id = $4
      	RETURNING *`;

		const values = [form.title, form.description, public, videoId]
		const data = (await dataBase.query(query, values)).rows[0];

		debug(`> uptadeMyVideo()`);
		if (!data) {
			throw new ApiError('No data found for > uptadeMyVideo()', 400);
		}

		return data;
	},



	async deleteVideo(video_id, user_id) {

		const query = `
        DELETE FROM rawtube_video 
        WHERE id = $1 
        AND user_id = $2
        RETURNING *`;

		const value = [video_id, user_id];
		const data = (await dataBase.query(query, value)).rows[0];
		
		debug(`> deleteUser()`);
		if (!data) {
			throw new ApiError('No data found for > deleteVideo()', 400);
		}

		return data;
	}
}