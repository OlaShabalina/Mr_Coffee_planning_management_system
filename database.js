const pgp = require('pg-promise')()
const database = 'test_posts'
const connection = 'postgres://postgres:India2014!@localhost:5432/' + database;
const db = pgp(connection);
module.connection = db;