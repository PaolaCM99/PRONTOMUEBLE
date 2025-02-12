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

async function authUser(table, authData, uniqueField) {
  const sentence = `SELECT EXISTS (SELECT 1 FROM ${table} u JOIN EMPLEADO e ON u.codigousuario = e.${uniqueField} WHERE e.correo = '${authData.correo}' AND u.contraseña = '${authData.contrasena}') AS contraseña_valida;`;
  return await queryDatabase(sentence);
}

async function getSeller(table, data) {
  console.log("obteniendo vendedor en db", data, table);
  sentence = `SELECT e.documento AS documento_vendedor, e.nombre AS nombre_vendedor, e.apellido AS apellido_vendedor, DATE_TRUNC('month',v.fecha) AS mes, SUM(v.valor) AS total_vendido FROM ${table} v JOIN EMPLEADO e ON v.documento_empl_fk=e.documento WHERE DATE_TRUNC('month',v.fecha)='${data.mes}' GROUP BY e.documento,e.nombre,e.apellido,mes ORDER BY total_vendido DESC LIMIT 1;`
  return await queryDatabase(sentence);
}

module.exports = {
  getAll,
  getById,
  setData,
  updateData,
  deleteData,
  authUser,
  getSeller
};
