-- Revert Rawtube:create_video_fuction from pg

BEGIN;

DROP FUNCTION IF EXISTS add_video;

COMMIT;
