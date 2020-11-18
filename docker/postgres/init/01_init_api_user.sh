#!/bin/bash
set -e

POSTGRES_API_USER=${POSTGRES_API_USER:-pgapiuser}
POSTGRES_API_PASS=${POSTGRES_API_PASS:-pgapiuserpass}


psql -v ON_ERROR_STOP=1 --username "postgres" --dbname "postgres" -v user="$POSTGRES_API_USER" -v pass="$POSTGRES_API_PASS" -v db="postgres" <<-EOSQL
    CREATE USER :user WITH ENCRYPTED PASSWORD :'pass';
    GRANT ALL PRIVILEGES ON DATABASE :db TO :user;
EOSQL