const db = require('../../database/postgres');

const table = 'venta'
const uniqueField = 'codigoventa'

function getAll(){
     return db.getAll(table)
}

function getById(id){
    return db.getById(table, id, uniqueField)
}

function setProvider(body){
    return db.setData(table, body, uniqueField);
}

function remove(body){
    return db.deleteData(table, body, uniqueField)
}


module.exports = {
    getAll, getById, remove, setProvider
}