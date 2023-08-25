require('dotenv').config();
const Pool = require('pg').Pool
const userlogin_db = require('./connection')
// console.log(userlogin_db());
const db_name = userlogin_db();
const pool = new Pool({
  user: 'postgres',
  host: '127.0.0.1',
  database: db_name, //tempo_iot
  password: process.env.PASSWORD,
  port: 5432,
})
// console.log(process.env.PASSWORD);
module.exports=pool