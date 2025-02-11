const pool = require('./connection')

async function queryDatabase(sql, params = []) {
    try {
        const result = await pool.query(sql, params);
        return result.rows;
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

async function deleteData(table, data, uniqueField) {
    const sentence = `DELETE FROM ${table} WHERE ${uniqueField}::INTEGER = ${data[uniqueField]};`
    console.log(sentence, queryDatabase(sentence));
    return queryDatabase(sentence);
}

async function setData(table, data, uniqueField) {
    const columns = Object.keys(data).join(', ');
    const values = Object.values(data);
    const placeholders = values.map((_, index) => `$${index + 1}`).join(', ');
    let sentence = '';
    let checkExistenceQuery = `
        SELECT 1 FROM ${table} WHERE ${uniqueField} = $1 LIMIT 1;
    `;
    const existingData = await queryDatabase(checkExistenceQuery, [data[uniqueField]]);

    if (existingData && existingData.length > 0) {
        const setClause = Object.keys(data)
            .filter(key => key !== uniqueField)
            .map((key, index) => `${key} = $${index + 2}`)
            .join(', ');

        sentence = `
            UPDATE ${table}
            SET ${setClause}
            WHERE ${uniqueField} = $1
            RETURNING *;
        `;
    } else {
        sentence = `
            INSERT INTO ${table} (${columns}) 
            VALUES (${placeholders}) 
            RETURNING *;
        `;
    }

    return queryDatabase(sentence, values);
}

module.exports = {
    getAll, getById, setData, deleteData
}