const mysql = require('mysql2/promise')
const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
})

const first = async p => (await p)[0]

const exec = (query, params) => first(pool.query(query, params))

module.exports = {
  query: exec,
  queryOne: (query, params) => first(exec(query, params))

}