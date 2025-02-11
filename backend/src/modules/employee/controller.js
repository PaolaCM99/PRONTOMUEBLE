const db = require('./../../database/postgres');

const table = 'empleado';
const uniqueField = 'documento';

function getAll() {
    return db.getAll(table);
}

function getById(id) {
    return db.getById(table, id, uniqueField);
}

function setEmployee(body) {
    if (!body.documento) {
        throw new Error("El campo 'documento' no puede ser nulo.");
    }
    return db.setData(table, body, uniqueField);
}


function updateEmployee(body) {
    if (!body.documento) {
        throw new Error("El campo 'documento' no puede estar vacío para actualizar.");
    }
    return db.updateData(table, body, uniqueField);
}


function remove(body) {
    return db.deleteData(table, body, uniqueField);
}

module.exports = {
    getAll,
    getById,
    setEmployee,
    updateEmployee,
    remove
};
