-- Revert rawtube:userFunction from pg

BEGIN;

-- XXX Add DDLs here.
DROP FUNCTION IF EXISTS add_user;

COMMIT;