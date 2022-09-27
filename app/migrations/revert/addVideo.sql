-- Revert rawtube:addVideo from pg

BEGIN;

-- XXX Add DDLs here.
DROP FUNCTION IF EXISTS add_video;
COMMIT;