const pool = require('./connection')

const getLg = async () => {
    try {
       const consult = await pool.query("SELECT * FROM proveedor")
        console.log('res', consult.rows)
    } catch (error) {
       console.log(error) 
    }
}

getLg();