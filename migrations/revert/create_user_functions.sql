-- Revert Rawtube:create_user_functions from pg

BEGIN;

DROP FUNCTION IF EXISTS add_user;

COMMIT;
