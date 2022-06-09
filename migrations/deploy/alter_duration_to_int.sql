-- Deploy Rawtube:alter_duration_to_int to pg

BEGIN;

ALTER TABLE rawtube_video
ALTER COLUMN duration TYPE INT
USING duration::integer; -- XXX Add DDLs here.

COMMIT;
