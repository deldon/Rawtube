-- Deploy rawtube:addVideo to pg

BEGIN;

CREATE OR REPLACE FUNCTION add_video(d json) RETURNS rawtube_video AS $$

    INSERT INTO rawtube_video
    (url_file, is_encoded, url_thumbnail, duration, user_id)
    VALUES(
		(d->>'url_file')::text,
        (d->>'is_encoded')::boolean,
        (d->>'url_thumbnail')::text,
        (d->>'duration')::integer,
        (d->>'user_id')::integer
		
    ) RETURNING *;

$$ LANGUAGE sql;

COMMIT;
