-- Deploy Rawtube:create_video_fuction to pg

BEGIN;

CREATE OR REPLACE FUNCTION add_video(d json) RETURNS rawtube_video AS $$

    INSERT INTO rawtube_video
    (title, description, public, url_file, url_thumbnail, duration, user_id)
    VALUES(
        (d->>'title')::text,
        (d->>'description')::text,
		(d->>'public')::boolean,
		(d->>'url_file')::text,
        (d->>'url_thumbnail')::text,
        (d->>'duration')::integer,
        (d->>'user_id')::integer
		
    ) RETURNING *;

$$ LANGUAGE sql;

COMMIT;
