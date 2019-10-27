const mysql = require('knex')({
  "client": "pg",
  "connection": {
    "host": "b2btoners.eu",
    "port": 5432,
    "user": "root",
    "password": "12345",
    "database": "memory-game",
    "charset"   : 'utf8mb4'
  }
});
module.exports = mysql;