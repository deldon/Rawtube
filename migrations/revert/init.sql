-- Revert Rawtube:init from pg

BEGIN;

DROP TABLE IF EXISTS rawtube_user_has_fav;
DROP TABLE IF EXISTS rawtube_commentaries;
DROP TABLE IF EXISTS rawtube_video;
DROP TABLE IF EXISTS rawtube_user;

COMMIT;
