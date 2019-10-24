const mysql = require('knex')({
  "client": "pg",
  "connection": {
    "host": "localhost",
    "port": 5432,
    "user": "postgres",
    "password": "1234",
    "database": "memory-game",
    "charset"   : 'utf8mb4'
  }
});
module.exports = mysql;