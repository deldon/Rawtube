-- Revert Rawtube:alter_duration_to_int from pg

BEGIN;

ALTER TABLE rawtube_video
ALTER COLUMN duration TYPE TEXT
USING duration::text;-- XXX Add DDLs here.

COMMIT;
