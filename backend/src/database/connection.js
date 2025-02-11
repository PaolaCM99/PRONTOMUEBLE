const pg  = require('pg')

const pool = new pg.Pool({
    host: "localhost",
    port: 5432,
    database: "avanzadas",
    user: "postgres",
    password: "12345678"
})

module.exports = pool;