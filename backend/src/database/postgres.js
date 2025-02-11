const pool = require('./connection');

async function queryDatabase(sql, params = []) {
  try {
    const result = await pool.query(sql, params);
    return result.rows;
  } catch (error) {
    throw error;
  }
}

async function getAll(table) {
  const sentence = `SELECT * FROM ${table}`;
  return await queryDatabase(sentence);
}

async function getById(table, id, uniqueField) {
  const sentence = `SELECT * FROM ${table} WHERE ${uniqueField}::INTEGER = $1;`;
  return await queryDatabase(sentence, [id]);
}

async function setData(table, data, uniqueField) {
  // Inserta un registro nuevo.
  const columns = Object.keys(data).join(', ');
  const values = Object.values(data);
  const placeholders = values.map((_, index) => `$${index + 1}`).join(', ');
  const sentence = `INSERT INTO ${table} (${columns}) VALUES (${placeholders}) RETURNING *;`;
  return queryDatabase(sentence, values);
}

async function updateData(table, data, uniqueField) {

  const uniqueValue = data[uniqueField];
  const keys = Object.keys(data).filter(key => key !== uniqueField);
  if (keys.length === 0) {
    throw new Error("No hay campos para actualizar");
  }
  const setClause = keys.map((key, index) => `${key} = $${index + 2}`).join(', ');
  const updateValues = [uniqueValue, ...keys.map(key => data[key])];
  const sentence = `UPDATE ${table} SET ${setClause} WHERE ${uniqueField} = $1 RETURNING *;`;
  return queryDatabase(sentence, updateValues);
}

async function deleteData(table, data, uniqueField) {
  const sentence = `DELETE FROM ${table} WHERE ${uniqueField}::INTEGER = $1 RETURNING *;`;
  return queryDatabase(sentence, [data[uniqueField]]);
}

module.exports = {
  getAll,
  getById,
  setData,
  updateData,
  deleteData
};
