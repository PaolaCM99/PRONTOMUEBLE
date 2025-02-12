const db = require('../../database/postgres');

const table = 'mueble'; // ✅ Ahora usa el nombre correcto de la tabla en la BD
const uniqueField = 'idmueble'; // ✅ Se usa el nombre correcto del campo ID en la tabla

function getAll() {
    return db.getAll(table);
}

function getById(id) {
    if (!id) {
        throw new Error("El campo 'idmueble' es obligatorio para obtener un mueble.");
    }
    return db.getById(table, id, uniqueField);
}

function setMueble(body) {
    if (!body.color || !body.precio || !body.material || !body.tipo || !body.descripcion ||
        !body.ancho || !body.altura || !body.profundidad || !body.stock || !body.codigoproveedor_fk) {
        throw new Error("Todos los campos son obligatorios.");
    }
    return db.setData(table, body, uniqueField);
}

function updateMueble(body) {
    if (!body.idmueble) {
        throw new Error("El campo 'idmueble' es obligatorio para actualizar un mueble.");
    }
    return db.updateData(table, body, uniqueField);
}

function remove(body) {
    if (!body.idmueble) {
        throw new Error("El campo 'idmueble' es obligatorio para eliminar un mueble.");
    }
    return db.deleteData(table, body, uniqueField);
}

module.exports = {
    getAll,
    getById,
    setMueble,
    updateMueble,
    remove
};
