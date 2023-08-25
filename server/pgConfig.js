const pool = require('pg').Pool;
const User_db_connection = new pool({
    user: 'postgres',
    host: '127.0.0.1',
    database: 'tempo_iot_roof',
    password: '123',
    port: 5432,
  })
module.exports = User_db_connection;