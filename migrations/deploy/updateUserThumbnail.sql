-- Deploy rawtube:updateUserThumbnail to pg

BEGIN;

CREATE OR REPLACE FUNCTION update_user_thumbnail (d json,user_id int) RETURNS rawtube_user AS $$

	UPDATE rawtube_user
	SET
		url_thumbnail = (d->>'url_thumbnail')::text,
		updated_at = NOW()
		WHERE id = user_id
		
	RETURNING *;
	
$$ LANGUAGE sql;
-- XXX Add DDLs here.

COMMIT;-- XXX Add DDLs here.

