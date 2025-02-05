const pg  = require('pg')

const pool = new pg.Pool({
    host: "localhost",
    port: 5432,
    database: "prontomueble",
    user: "postgres",
    password: "1234"
})

module.exports = pool;