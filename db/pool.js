const { Pool } = require("pg")

const pool = new Pool ({
    user: 'abdirahman',
    host: 'localhost',
    port: 5432,
    database: 'inv'
})