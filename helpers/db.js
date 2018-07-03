const mysql = require('mysql2/promise')

const url = process.env.CLEARDB_DATABASE_URL || 'mysql://root@localhost/cv_edouard'
const pool = mysql.createPool(`${url}?waitForConnections=true&connectionLimit=10&queueLimit=0`)

const first = async p => (await p)[0]

const exec = (query, params) => first(pool.query(query, params))

module.exports = {
  query: exec,
  queryOne: (query, params) => first(exec(query, params))

}