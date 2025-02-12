const db = require('../../database/postgres');

const table = 'VENTA';
const uniqueField = 'valor';

function getSeller(body) {
    if (!body.mes) {
        throw new Error("El campo 'mes' es obligatorio.");
    }
    return db.getSeller(table, body);
}

function getBestClients() {
    return db.getBestClients(table);
}

function getMostSoldFurniture() {
    return db.getMostSoldFurniture(table);
}

function getNewClients(body) {
    if (!body.mes) {
        throw new Error("El campo 'mes' es obligatorio.");
    }
    return db.getNewClients(body);
}

module.exports = {
    getSeller,
    getBestClients,
    getMostSoldFurniture,
    getNewClients
};
