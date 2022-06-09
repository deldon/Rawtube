-- Deploy Rawtube:update_user_function to pg

BEGIN;
CREATE OR REPLACE FUNCTION update_user(d json,user_id int) RETURNS rawtube_user AS $$

	UPDATE rawtube_user
	SET
		name = (d->>'name')::text,
        email = (d->>'email')::text,
		description = (d->>'description')::text,
        avatar = (d->>'avatar')::text,
		updated_at = NOW()
		WHERE id = user_id
		
	RETURNING *;
	
$$ LANGUAGE sql;
-- XXX Add DDLs here.

COMMIT;
