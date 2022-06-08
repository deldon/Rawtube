-- Deploy Rawtube:create_user_functions to pg

BEGIN;
CREATE OR REPLACE FUNCTION add_user(d json) RETURNS rawtube_user AS $$

    INSERT INTO rawtube_user
    (name, email, password, description, avatar)
    VALUES(
        (d->>'name')::text,
        (d->>'email')::text,
		(d->>'password')::text,
		(d->>'description')::text,
        (d->>'avatar')::text
		
    ) RETURNING *;

$$ LANGUAGE sql;
-- XXX Add DDLs here.

COMMIT;
