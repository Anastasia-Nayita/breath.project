-- DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS checkup;

--  CREATE TABLE users (
--       id SERIAL PRIMARY KEY,
--       first VARCHAR NOT NULL, 
--       last VARCHAR NOT NULL,
--       email VARCHAR NOT NULL UNIQUE,
--       password VARCHAR NOT NULL,
--       image_url VARCHAR,
--       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
--   );

CREATE TABLE checkup (
     id SERIAL PRIMARY KEY,
     userId INT REFERENCES users(id) NOT NULL,
     physically VARCHAR ,
     mentally VARCHAR ,
     emotionally text ARRAY [5] ,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

 );
