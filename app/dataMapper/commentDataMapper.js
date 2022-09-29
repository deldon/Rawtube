const debug = require('debug')('commentDataMapper-');
const dataBase = require('../config/db');
const ApiError = require('../errors/apiError');

module.exports = {

    async getAllCommentByVideoId(videoId) {
        const query = `
        select 
        rawtube_user.id as user_id,
        rawtube_user.name as user_name,
        rawtube_user.url_thumbnail as user_thumbnail,
        rawtube_commentaries.id as comment_id,
        rawtube_commentaries.comment as comment_text,
        rawtube_commentaries.created_at as comment_created_at
        from
        rawtube_commentaries 
        join rawtube_user on rawtube_commentaries.user_id = rawtube_user.id
        where video_id = $1
        order by rawtube_commentaries.created_at desc`

        const values = [videoId]
        const data = (await dataBase.query(query, values)).rows;

        debug(`> getAllCommentByVideoId()`);
        if (!data) {
            throw new ApiError('No data found for > getAllCommentByVideoId()', 400);
        }

        return data;

    },

    async getCommentById(commentId) {
        const query = `
        select 
        rawtube_user.id as user_id,
        rawtube_user.name as user_name,
        rawtube_user.url_thumbnail as user_thumbnail,
        rawtube_commentaries.id as comment_id,
        rawtube_commentaries.comment as comment_text,
        rawtube_commentaries.created_at as comment_created_at
        from
        rawtube_commentaries 
        join rawtube_user on rawtube_commentaries.user_id = rawtube_user.id
        where rawtube_commentaries.id = $1
        `

        const values = [commentId]
        const data = (await dataBase.query(query, values)).rows[0];

        debug(`> getCommentById()`);
        if (!data) {
            throw new ApiError('No data found for > getAllCommentByVideoId()', 400);
        }

        return data;

    },

    async postCommentByVideoId(userId, videoId, comment) {
        const query = `
        INSERT INTO rawtube_commentaries (user_id, video_id,"comment")
        VALUES 
        ($1,$2,$3)
        returning *`

        const values = [userId, videoId, comment]
        const data = (await dataBase.query(query, values)).rows[0];

        debug(`> postCommentByVideoId`);
        if (!data) {
            throw new ApiError('No data found for > postCommentByVideoId()', 400);
        }

        return data;

    },


}