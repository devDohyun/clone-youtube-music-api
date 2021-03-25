const mysql = require('mysql2/promise')

const { DB_HOST, DB_USER, DB_PASSWD, DB_DATABASE, DB_CONNECTION_LIMIT } = process.env


const pool = mysql.createPool({
    connectionLimit: DB_CONNECTION_LIMIT,
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWD,
    database: DB_DATABASE,
    waitForConnections: false,
    dateStrings: 'date',
    charset: 'utf8mb4'
})


module.exports = pool