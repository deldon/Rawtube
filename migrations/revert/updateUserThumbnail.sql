-- Revert rawtube:updateUserThumbnail from pg

BEGIN;

DROP FUNCTION IF EXISTS update_user_thumbnail;

COMMIT;
