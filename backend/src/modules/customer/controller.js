const db = require('../../database/postgres');

const table = 'cliente';
const uniqueField = 'documento';

function getAll() {
    return db.getAll(table);
}

function getById(id) {
    return db.getById(table, id, uniqueField);
}

function setCustomer(body) {
    if (!body.documento) {
        throw new Error("El campo 'documento' es obligatorio.");
    }
    return db.setData(table, body, uniqueField);
}

function updateCustomer(body) {
    if (!body.documento) {
        throw new Error("El campo 'documento' es obligatorio para actualizar.");
    }
    return db.updateData(table, body, uniqueField);
}

function remove(body) {
    if (!body.documento) {
        throw new Error("El campo 'documento' es obligatorio para eliminar.");
    }
    return db.deleteData(table, body, uniqueField);
}

module.exports = {
    getAll,
    getById,
    setCustomer,
    updateCustomer,  // ✅ Se agregó la función de actualización
    remove
};
