const debug = require('debug')('videoDataMapper');
const dataBase = require('../config/db');
const ApiError = require('../errors/apiError');

module.exports = {

	async getAllVideoByRelevance(position) {

		const query =
			`select 
		rawtube_video.id as video_id,
		rawtube_user.id as user_id,
		rawtube_user.name as user_name,
		rawtube_user.url_thumbnail as user_url_thumbnail,
			(select count(*) from rawtube_user_has_like
				where video_id = rawtube_video.id) as likes,
			(select count(*) from rawtube_commentaries
				where video_id = rawtube_video.id) as number_of_comments
		from rawtube_video
		join rawtube_user on rawtube_user.id = rawtube_video.user_id
		where rawtube_video.is_encoded = true
		order by rawtube_video.created_at desc
		offset $1 - 1
		limit 1;`

		const values = [position];

		const data = (await dataBase.query(query, values)).rows[0];

		debug(`> getAllVideoByRelevance`);
		if (!data) {
			return false
		}

		return data;

	},

	async getAllVideoByUserById(position, userId) {

		const query =
			`select 
		rawtube_video.id as video_id,
		rawtube_user.id as user_id,
		rawtube_user.name as user_name,
		rawtube_user.url_thumbnail as user_url_thumbnail,
			(select count(*) from rawtube_user_has_like
				where video_id = rawtube_video.id) as likes,
			(select count(*) from rawtube_commentaries
				where video_id = rawtube_video.id) as number_of_comments
		from rawtube_video
		join rawtube_user on rawtube_user.id = rawtube_video.user_id
		where rawtube_user.id = $1                     -- 1 is param user id
		order by rawtube_video.created_at desc
		offset $2 - 1                                  -- 5 is param position
		limit 1;`

		const values = [userId, position];

		const data = (await dataBase.query(query, values)).rows[0];

		debug(`> getAllVideoByUserById`);
		if (!data) {
			return false
		}

		return data;

	},



	async getAllVideoByUserId(userId) {

		const query = `
		select 
		id,
		url_thumbnail,
		"views",
		is_encoded,
		ROW_NUMBER() OVER(ORDER BY created_at desc) AS POSITION
		from rawtube_video 
		where user_id = $1                                     -- user id
		order by rawtube_video.created_at desc;`

		const values = [userId]
		const data = (await dataBase.query(query, values)).rows;

		debug(`> getAllVideoByUserId()`);
		if (!data) {
			throw new ApiError('No data found for > getAllVideoByUserId()', 400);
		}

		return data;

	},

	async addVideo(obj) {

		const query = `SELECT id, is_encoded, url_thumbnail, duration, user_id, created_at FROM add_video($1);`;
		const value = [obj];

		const data = (await dataBase.query(query, value)).rows[0];
		debug(`> addVideo()`);
		if (!data) {
			throw new ApiError('No data found for > addVideo()', 400);
		}

		return data;
	},



	async deleteVideoById(videoId) {
		const query = `
		delete from rawtube_video 
		where id = $1
		returning *
		`

		const values = [videoId];
		const data = (await dataBase.query(query,values)).rows[0];

		debug(`> deleteVideoById()`);
		if (!data) {
			throw new ApiError('No data found for > deleteVideoById()', 400);
		}

		return data;
	},

	async videoIsEncoded(video_id) {


		const query = `UPDATE rawtube_video 
		SET is_encoded  = true
		WHERE url_file = $1`;
		const value = [video_id + '.webm'];

		const data = (await dataBase.query(query, value)).rows[0];

		debug(`> videoIsEncoded`);
		if (!data) {
			throw new ApiError('No data found for > videoIsEncoded()', 400);
		}

		return data;
	},

	async incrementViews(videoId) {
		const query = `
		update rawtube_video 
		set views = (select "views" from rawtube_video where id = $1) + 1
		where id = $1
		returning *
		`

		const values = [videoId];
		const data = (await dataBase.query(query,values)).rows[0];

		debug(`> incrementViews()`);
		if (!data) {
			throw new ApiError('No data found for > incrementViews()', 400);
		}

		return data;
	},

	async videoIsLiked(userId,videoId) {
		debug(userId,videoId)
		const query = `
		select *
		from rawtube_user_has_like
		where user_id = $1 and video_id = $2
		`

		const values = [userId,videoId];
		const data = (await dataBase.query(query,values)).rows[0];

		debug(`> videoIsLiked()`);
		if (!data) {
			return false
		}

		return true;
	},

	async getUrlFileByVideoId(videoId) {

		const query = `select url_file from rawtube_video where id = $1`

		const values = [videoId];
		const data = (await dataBase.query(query,values)).rows[0];

		debug(`> getUrlFileByVideoId()`);
		if (!data) {
			throw new ApiError('No data found for > incrementViews()', 400);
		}

		return data;
	},

}