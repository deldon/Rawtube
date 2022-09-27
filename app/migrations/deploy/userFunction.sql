-- Deploy rawtube:userFunction to pg

BEGIN;

-- XXX Add DDLs here.

CREATE OR REPLACE FUNCTION add_user(d json) RETURNS rawtube_user AS $$

    INSERT INTO rawtube_user
    (name, email, password, url_thumbnail)
    VALUES(
        (d->>'name')::text,
        (d->>'email')::text,
		(d->>'password')::text,
		(d->>'url_thumbnail')::text
		
    ) RETURNING *;

$$ LANGUAGE sql;

-- XXX Add DDLs here.

COMMIT;