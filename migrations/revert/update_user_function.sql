-- Revert Rawtube:update_user_function from pg

BEGIN;

DROP FUNCTION IF EXISTS update_user;-- XXX Add DDLs here.

COMMIT;
