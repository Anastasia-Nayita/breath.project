DROP TABLE IF EXISTS users;


CREATE TABLE users (
     id SERIAL PRIMARY KEY,
     first VARCHAR NOT NULL, 
     last VARCHAR NOT NULL,
     email VARCHAR NOT NULL UNIQUE,
     password VARCHAR NOT NULL,
     image_url VARCHAR,
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
 );

CREATE TABLE checkup (
     id SERIAL PRIMARY KEY,
     physically VARCHAR NOT NULL,
     mentally VARCHAR NOT NULL,
     emotionally VARCHAR NOT NULL,
 );
