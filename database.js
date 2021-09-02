const pgp = require('pg-promise')();

const connection = 'postgres://postgres:12345678@localhost:5432/schedule_app';

const db = pgp(connection);

module.exports = db;