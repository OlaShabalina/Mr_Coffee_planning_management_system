-- Creating table for storying users
DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE IF NOT EXISTS users (
    user_id SERIAL PRIMARY KEY,
    firstname VARCHAR(150),
    lastname VARCHAR(150),
    email VARCHAR(100) UNIQUE,
    password VARCHAR(250)
);

-- Creating table for storying schedules
DROP TABLE IF EXISTS schedules CASCADE;

CREATE TABLE IF NOT EXISTS schedules (
    schedule_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(user_id) NOT NULL,
    day SMALLINT CHECK (day BETWEEN 1 AND 7) NOT NULL,
    start_at TIME NOT NULL,
    end_at TIME NOT NULL
);
