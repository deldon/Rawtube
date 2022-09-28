-- Revert rawtube:updateUserFunction from pg

BEGIN;

DROP FUNCTION IF EXISTS update_user;

COMMIT;
