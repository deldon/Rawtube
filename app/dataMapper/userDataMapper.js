const debug = require('debug')('userDataMapper-');
const dataBase = require('../config/db');
const ApiError = require('../errors/apiError');

module.exports = {

	async getUserInfoById(userId) { // new

		const query = `
		select
		rawtube_user.id,
		rawtube_user.name,
		rawtube_user.url_thumbnail,
			(select count(*) from rawtube_video
			where user_id = rawtube_user.id) as total_videos,
			(select count(*)
			from rawtube_user_has_like
		where user_id = rawtube_user.id) as total_likes
		from rawtube_user
		where id = $1;`

		const values = [userId]
		const data = (await dataBase.query(query, values)).rows[0];

		debug(`> getUserInfoById()`);
		if (!data) {
			throw new ApiError('No data found for > getUserInfoById()', 400);
		}

		return data;

	},

	async getMyUserById(userId) { // new

		const query = `
		select
		rawtube_user.id,
		rawtube_user.name,
		rawtube_user.url_thumbnail,
		rawtube_user.email
		from rawtube_user
		where id = $1;`

		const values = [userId]
		const data = (await dataBase.query(query, values)).rows[0];

		debug(`> getUserInfoById()`);
		if (!data) {
			throw new ApiError('No data found for > getUserInfoById()', 400);
		}

		return data;

	},

	async addUser(form) {
		debug(form)

		const query = `SELECT * FROM add_user($1);`;
		const value = [form];

		const data = (await dataBase.query(query, value)).rows[0];

		debug(`> addUser()`);
		if (!data) {
			throw new ApiError('No data found for > addUser()', 400);
		}

		return data;
	},

	async updateUser(form, user_id) {

		const query = `SELECT * FROM update_user($1,$2);`;
		const value = [form, user_id];
		
		const data = (await dataBase.query(query, value)).rows[0];

		debug(`> updateUser()`);
		if (!data) {
			throw new ApiError('No data found for > updateUser()', 400);
		}

		return data;
	},

	async updateUserThumbnail(thumbnailName, user_id) {
		debug(user_id)

		// const query = `SELECT * FROM update_user_thumbnail($1,$2);`;
		const query = `UPDATE rawtube_user
						SET 
							url_thumbnail = $1,
							updated_at = NOW()
							WHERE id = $2
							RETURNING *`;
		const value = [thumbnailName, user_id];
		debug(value)
		const data = (await dataBase.query(query, value)).rows[0];
		
		debug(`> updateThumbnail()`);
		if (!data) {
			throw new ApiError('No data found for > updateThumbnail()', 400);
		}

		return data;
	},

	async deleteUser(user_id) {

		const query = `
        DELETE FROM rawtube_user 
        WHERE id = $1 
        RETURNING id`;

		const value = [user_id];
		const data = (await dataBase.query(query, value)).rows[0];
		debug(`> deleteUser()`);
		if (!data) {
			throw new ApiError('No data found for > deleteUser()', 400);
		}

		return data;
	},

	async getUserByEmail(email) {

		const query = `SELECT * FROM "rawtube_user" WHERE email = $1`;

		const value = [email];
		const data = (await dataBase.query(query, value)).rows[0];

		debug(`> getUserByEmail()`);
		if (!data) {
			return false
		}

		return data;
	},

	async userIsExist(userId) { // new

		const query = `
			select id
			from rawtube_user 
			where id = $1`

		const values = [userId]

		const data = (await dataBase.query(query, values)).rows[0]

		if (!data) {
			return false
		} else {
			return true
		}

	},


// PASSWORD

	async updatePassword(new_password, user_id) {

		const query = `
        UPDATE rawtube_user
        SET 
        password = $1,
        updated_at = NOW()
        WHERE id = $2
        RETURNING id
      ;`;
		debug(new_password)
		const value = [new_password, user_id];

		const data = (await dataBase.query(query, value)).rows[0];
		debug(`> updatePassword()`);
		if (!data) {
			throw new ApiError('No data found for > updatePassword()', 400);
		}

		return data;
	},

	async getPasswordById(user_id) {

		const query = `SELECT password FROM rawtube_user WHERE id = $1`;

		const value = [user_id];

		const data = (await dataBase.query(query, value)).rows[0];
		debug(`> getPasswordById()`);
		if (!data) {
			throw new ApiError('No data found for > getPasswordById()', 404);
		}

		return data;
	}

}