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
  const sentence = `SELECT 
                    e.documento AS documento_vendedor,
                    e.nombre AS nombre_vendedor,
                    e.apellido AS apellido_vendedor,
                    DATE_TRUNC('month',v.fecha) AS mes,
                    SUM(v.valor) AS total_vendido FROM ${table} v
                    JOIN EMPLEADO e ON v.documento_empl_fk=e.documento
                    WHERE DATE_TRUNC('month',v.fecha)='${data.mes}'
                    GROUP BY e.documento,e.nombre,e.apellido,mes ORDER BY total_vendido DESC LIMIT 1;`
  return await queryDatabase(sentence);
}

async function getBestClients() {
  const sentence = `SELECT  
                    c.documento,  
                    c.nombre,  
                    c.apellido,  
                    SUM(v.valor) AS total_compras  
                    FROM VENTA v  
                    JOIN CLIENTE c ON v.documento_cli_fk=c.documento  
                    GROUP BY c.documento,c.nombre,c.apellido  
                    ORDER BY total_compras DESC  
                    LIMIT 5;`;
  return await queryDatabase(sentence);
}

async function getMostSoldFurniture() {
  const sentence = `SELECT  
                      m.idMueble,  
                      m.tipo,  
                      m.color,  
                      SUM(v.cantidad) AS total_vendido  
                  FROM VENTA v  
                  JOIN MUEBLE m ON v.idMueble_fk = m.idMueble  
                  GROUP BY m.idMueble, m.tipo, m.color  
                  ORDER BY total_vendido DESC;`;
  return await queryDatabase(sentence);
}

async function getNewClients(data) {
  const sentence = `SELECT  
                        c.documento,  
                        c.nombre,  
                        c.apellido,  
                        c.f_registro AS fecha_registro
                    FROM CLIENTE c
                    WHERE DATE_TRUNC('month',c.f_registro)='${data.mes}';`;
  return await queryDatabase(sentence);
}

module.exports = {
  getAll,
  getById,
  setData,
  updateData,
  deleteData,
  authUser,
  getSeller,
  getBestClients,
  getMostSoldFurniture,
  getNewClients
};
