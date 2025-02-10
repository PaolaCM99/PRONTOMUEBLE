const pool = require('./connection')

async function queryDatabase(sql, params = []) {
    try {
        const result = await pool.query(sql, params);
        return  result.rows ;
    } catch (error) {
        return error;
    }
}

async function getAll(table) {
    const sentence = `SELECT * FROM ${table}`;
    return await queryDatabase(sentence);
}

async function getById(table, id, uniqueField) {
    const sentence = `SELECT * FROM ${table} WHERE ${uniqueField}::INTEGER = ${id};`
    return await queryDatabase(sentence);
}

async function setData(table, data, uniqueField) {
    const columns = Object.keys(data).join(', ');
    const values = Object.values(data);
    const placeholders = values.map((_, index) => `$${index + 1}`).join(', ');
    let sentence = '';

    const setClause = Object.keys(data)
            .filter(key => key !== uniqueField)  
            .map((key, index) => `${key} = $${index + 2}`)
            .join(', ');

    if(!data[uniqueField]){
        sentence =  `
        INSERT INTO ${table} (${columns}) 
        VALUES (${placeholders}) 
        RETURNING *;
        `;

    } else {
        sentence = `
        UPDATE ${table}
        SET ${setClause}
        WHERE ${uniqueField} = $1
        RETURNING *;
    `;
    }

    return queryDatabase(sentence, values);    
}

async function deleteData(table, data, uniqueField) {
    const sentence = `DELETE FROM ${table} WHERE ${uniqueField}::INTEGER = ${data[uniqueField]}`
    return queryDatabase(sentence);
}

module.exports = {
    getAll, getById, setData, deleteData
}